"""
Ubica en las páginas de los libros HSK dónde va cada pista de audio.

Los libros marcan cada pista con un ícono de parlante y su número («🔈 1-3» =
lección 1, pista 3), igual que el nombre del mp3. El script combina dos fuentes:

1. Las etiquetas «1-3» de la capa de texto, cuando el PDF la tiene (HSK 2 y 3).
2. Los íconos de parlante, buscados por coincidencia de imagen sobre el color del ícono.

Las pistas sin etiqueta se completan con los íconos libres que quedan entre dos
pistas conocidas, solo si la cantidad cuadra. Lo que no cuadra se reporta para
colocarlo a mano desde el visor.

Uso:  python scripts/detectar-pistas.py
Lee:  HSK/<libro>.pdf y HSK/audio/hsk<n>/*.mp3 (material local, fuera de git)
Crea: src/content/biblioteca/pistas/hsk<n>.json
"""

import json
import os
import re
import sys

import cv2
import fitz  # PyMuPDF
import numpy as np

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HSK = os.path.join(RAIZ, "HSK")
SALIDA = os.path.join(RAIZ, "src", "content", "biblioteca", "pistas")
DPI = 150
ESCALA = DPI / 72

# Para HSK 1 (escaneo sin texto), la plantilla sale de un ícono conocido: página 17, «1-3».
# Para los demás, del ícono junto a la primera etiqueta que se lea en el texto.
LIBROS = {
    1: {"pdf": "hsk-course-1.pdf", "ancla": (16, fitz.Rect(240, 160, 268, 176))},
    2: {"pdf": "hsk-course-2.pdf"},
    3: {"pdf": "hsk-course-3.pdf"},
}


def clave(pista):
    leccion, n = pista.split("-")
    return int(leccion), int(n)


def mascara(pagina):
    """Píxeles de color cálido y saturado (el ícono es rojo o naranja)."""
    pix = pagina.get_pixmap(dpi=DPI)
    img = np.frombuffer(pix.samples, np.uint8).reshape(pix.h, pix.w, pix.n)[:, :, :3]
    hsv = cv2.cvtColor(img, cv2.COLOR_RGB2HSV)
    calido = (hsv[:, :, 0] < 25) | (hsv[:, :, 0] > 160)
    m = (calido & (hsv[:, :, 1] > 70) & (hsv[:, :, 2] > 110)).astype(np.uint8) * 255
    return cv2.dilate(m, np.ones((2, 2), np.uint8))


def recortar(m):
    ys, xs = np.nonzero(m)
    return m[ys.min() : ys.max() + 1, xs.min() : xs.max() + 1]


def etiquetas(doc, pistas):
    """pista → [(página, x, y)] con la posición del ícono, a la izquierda de la etiqueta."""
    vistas = {}
    for i in range(doc.page_count):
        for x0, y0, x1, y1, palabra, *_ in doc[i].get_text("words"):
            t = palabra.strip("()（）,.;:")
            if re.fullmatch(r"\d{1,2}-\d{1,2}", t) and t in pistas:
                vistas.setdefault(t, []).append((i, x0 - 8, (y0 + y1) / 2, (x0, y0, x1, y1)))
    return vistas


def plantilla(doc, libro, vistas):
    if "ancla" in libro:
        pagina, rect = libro["ancla"]
    else:
        pista = min(vistas, key=clave)
        pagina, _, _, (x0, y0, x1, y1) = vistas[pista][0]
        rect = fitz.Rect(x0 - 16, y0 - 2, x0 - 1, y1 + 2)
    m = mascara(doc[pagina])
    zona = m[int(rect.y0 * ESCALA) : int(rect.y1 * ESCALA), int(rect.x0 * ESCALA) : int(rect.x1 * ESCALA)]
    return recortar(zona)


def iconos(doc, pl, umbral=0.6):
    """[(página, x, y)] en puntos, centro de cada ícono encontrado."""
    encontrados = []
    alto, ancho = pl.shape
    for i in range(doc.page_count):
        r = cv2.matchTemplate(mascara(doc[i]), pl, cv2.TM_CCOEFF_NORMED)
        ys, xs = np.where(r >= umbral)
        elegidos = []
        for sc, x, y in sorted(zip(r[ys, xs], xs, ys), reverse=True):
            if all(abs(x - a) > 15 or abs(y - b) > 15 for a, b in elegidos):
                elegidos.append((x, y))
        for x, y in elegidos:
            encontrados.append((i, (x + ancho / 2) / ESCALA, (y + alto / 2) / ESCALA))
    return encontrados


def orden(p):
    pagina, x, y = p
    return pagina, round(y / 6), x


def detectar(n, libro):
    doc = fitz.open(os.path.join(HSK, libro["pdf"]))
    pistas = sorted((f[:-4] for f in os.listdir(os.path.join(HSK, "audio", f"hsk{n}")) if f.endswith(".mp3")), key=clave)
    vistas = etiquetas(doc, set(pistas))
    pl = plantilla(doc, libro, vistas)
    libres = iconos(doc, pl)

    # 1. Etiquetas del texto. Una etiqueta suelta fuera de lugar (un «8-1» en el
    #    índice) no debe arrastrar al resto: se queda la cadena más larga de etiquetas
    #    que avanza a la vez en número de pista y en orden de lectura.
    indice = {p: k for k, p in enumerate(pistas)}
    candidatas = sorted(
        ((indice[pista], (p, x, y)) for pista, lugares in vistas.items() for p, x, y, _ in lugares),
        key=lambda c: orden(c[1]),
    )
    largo, previo = [1] * len(candidatas), [-1] * len(candidatas)
    for b in range(len(candidatas)):
        for a in range(b):
            if candidatas[a][0] < candidatas[b][0] and largo[a] + 1 > largo[b]:
                largo[b], previo[b] = largo[a] + 1, a
    asignadas = {}
    k = max(range(len(candidatas)), key=largo.__getitem__, default=-1)
    while k >= 0:
        asignadas[pistas[candidatas[k][0]]] = (*candidatas[k][1], "texto")
        k = previo[k]

    # Un ícono a menos de 20 puntos de una etiqueta ya asignada no está libre.
    def libre(icono):
        return not any(
            a[0] == icono[0] and abs(a[1] - icono[1]) < 20 and abs(a[2] - icono[2]) < 20 for a in asignadas.values()
        )

    libres = sorted(filter(libre, libres), key=orden)

    # 2. Huecos: tramos de pistas sin etiqueta entre dos pistas conocidas.
    i = 0
    while i < len(pistas):
        if pistas[i] in asignadas:
            i += 1
            continue
        j = i
        while j < len(pistas) and pistas[j] not in asignadas:
            j += 1
        antes = asignadas[pistas[i - 1]][:3] if i > 0 else (-1, 0, 0)
        despues = asignadas[pistas[j]][:3] if j < len(pistas) else (10**6, 0, 0)
        en_tramo = [c for c in libres if orden(antes) < orden(c) < orden(despues)]
        if len(en_tramo) == j - i:
            for pista, c in zip(pistas[i:j], en_tramo):
                asignadas[pista] = (*c, "icono")
        i = j

    # Las pistas sin ubicar también van, con pagina None, para colocarlas desde el visor.
    resultado = []
    for pista in pistas:
        if pista in asignadas:
            pagina, x, y, fuente = asignadas[pista]
            rect = doc[pagina].rect
            resultado.append(
                {"pista": pista, "pagina": pagina + 1, "x": round(x / rect.width, 4), "y": round(y / rect.height, 4), "fuente": fuente}
            )
        else:
            resultado.append({"pista": pista, "pagina": None, "x": None, "y": None, "fuente": None})
    faltan = [p for p in pistas if p not in asignadas]
    return resultado, faltan, len(pistas)


def main():
    os.makedirs(SALIDA, exist_ok=True)
    niveles = [int(a) for a in sys.argv[1:]] or list(LIBROS)
    for n in niveles:
        resultado, faltan, total = detectar(n, LIBROS[n])
        with open(os.path.join(SALIDA, f"hsk{n}.json"), "w", encoding="utf-8") as f:
            json.dump(resultado, f, ensure_ascii=False, indent=1)
        fuentes = {k: sum(r["fuente"] == k for r in resultado) for k in ("texto", "icono")}
        print(f"HSK {n}: {total - len(faltan)}/{total} ubicadas ({fuentes['texto']} por texto, {fuentes['icono']} por ícono)")
        if faltan:
            print(f"  sin ubicar ({len(faltan)}): {' '.join(faltan)}")


if __name__ == "__main__":
    main()
