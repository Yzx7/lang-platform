"""
Genera la descomposición de los caracteres: de qué componentes está hecho cada
uno y cuál de ellos aporta el significado y cuál el sonido.

Fuentes (se descargan aparte, no van al repositorio):

1. Make Me a Hanzi, dictionary.txt (LGPL-3.0):
   https://raw.githubusercontent.com/skishore/makemeahanzi/master/dictionary.txt
2. complete-hsk-vocabulary, complete.json (MIT), solo para saber qué caracteres
   son comunes y en qué nivel del HSK 3.0 aparecen:
   https://raw.githubusercontent.com/drkameleon/complete-hsk-vocabulary/main/complete.json

Entran los caracteres que usa el sitio, los del HSK 1-6 (para que las familias de
sonido y de significado tengan con qué compararse) y todos sus componentes, para
que cada componente también tenga su página.

Uso:  python scripts/descomponer-hanzi.py <dictionary.txt> <complete.json>
Crea: src/content/hanzi/hanzi.json
"""

import glob
import json
import os
import re
import sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONTENIDO = os.path.join(RAIZ, "src", "content")
SALIDA = os.path.join(CONTENIDO, "hanzi", "hanzi.json")

HAN = re.compile(r"[㐀-鿿\U00020000-\U0002ffff⺀-⿟]")
# Descriptores de estructura: ⿰ izquierda-derecha, ⿱ arriba-abajo, etc. ⿲ y ⿳ unen tres partes.
DESCRIPTORES = set(chr(c) for c in range(0x2FF0, 0x2FFC))
DESCONOCIDO = "？"
NIVEL_MAXIMO = 6


def hojas(ids: str) -> list[str]:
    """Componentes finales de una descomposición, en orden y sin repetir."""
    vistas = []
    for c in ids:
        if c not in DESCRIPTORES and c != DESCONOCIDO and c not in vistas:
            vistas.append(c)
    return vistas


def caracteres_del_sitio() -> set[str]:
    usados = set()
    for ruta in glob.glob(os.path.join(CONTENIDO, "**", "*.ts"), recursive=True):
        with open(ruta, encoding="utf-8") as f:
            usados |= set(c for c in HAN.findall(f.read()) if "㐀" <= c <= "鿿")
    return usados


def niveles_hsk(ruta: str) -> dict[str, int]:
    with open(ruta, encoding="utf-8") as f:
        palabras = json.load(f)
    nivel = {}
    for p in palabras:
        # «new-7» agrupa los niveles 7 a 9 del HSK 3.0.
        niveles = [int(n.split("-")[1]) for n in p["level"] if n.startswith("new-")]
        if not niveles:
            continue
        for c in p["simplified"]:
            if HAN.match(c):
                nivel[c] = min(nivel.get(c, 99), min(niveles))
    return nivel


def main():
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    with open(sys.argv[1], encoding="utf-8") as f:
        diccionario = {e["character"]: e for e in map(json.loads, f)}
    nivel = niveles_hsk(sys.argv[2])

    sitio = caracteres_del_sitio()
    faltan = sorted(c for c in sitio if c not in diccionario)
    if faltan:
        print("Sin descomposición:", " ".join(faltan))

    pendientes = [c for c in diccionario if c in sitio or nivel.get(c, 99) <= NIVEL_MAXIMO]
    incluidos = set()
    while pendientes:
        c = pendientes.pop()
        if c in incluidos or c not in diccionario:
            continue
        incluidos.add(c)
        e = diccionario[c]
        etimologia = e.get("etymology", {})
        pendientes += hojas(e["decomposition"])
        pendientes += [etimologia[k] for k in ("semantic", "phonetic") if k in etimologia]

    salida = []
    for c in sorted(incluidos):
        e = diccionario[c]
        etimologia = e.get("etymology", {})
        entrada = {
            "h": c,
            "py": e["pinyin"],
            "en": e.get("definition", ""),
            "ids": e["decomposition"],
            "partes": [p for p in hojas(e["decomposition"]) if p != c],
            "rad": e["radical"],
            "tipo": etimologia.get("type"),
            "sem": etimologia.get("semantic"),
            "fon": etimologia.get("phonetic"),
            "pista": etimologia.get("hint"),
            "nivel": nivel.get(c),
        }
        # Los campos opcionales vacíos se omiten; py queda siempre, aunque sea [] (componentes como ⺍).
        salida.append({k: v for k, v in entrada.items() if k == "py" or v not in (None, "", [])})

    os.makedirs(os.path.dirname(SALIDA), exist_ok=True)
    with open(SALIDA, "w", encoding="utf-8", newline="\n") as f:
        # Una entrada por línea: los cambios se leen bien en git.
        f.write("[\n" + ",\n".join(json.dumps(e, ensure_ascii=False) for e in salida) + "\n]\n")
    print(f"{len(salida)} caracteres ({len(sitio)} del sitio) → {os.path.relpath(SALIDA, RAIZ)}")


if __name__ == "__main__":
    main()
