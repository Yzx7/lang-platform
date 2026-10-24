# Idiomas con lógica (prototipo)

Plataforma para aprender idiomas en español. Cada curso tiene su ruta: `/chino` e `/ingles`.

El curso de chino mandarín se apoya en dos ideas centrales:

1. **Vocabulario carácter por carácter.** Cada palabra se desarma en sus caracteres
   (电 electricidad + 脑 cerebro = computadora) y los caracteres se agrupan en familias.
2. **Gramática explícita.** Cada patrón tiene fórmula, tabla, ejemplos desglosados y
   errores típicos de hispanohablantes.

## Desarrollo

```bash
pnpm install
pnpm dev
```

## Estructura

- `src/content/`: todo el contenido como datos TypeScript.
  - `crear.ts`: helpers `w()` (palabra) y `s()` (oración). `w()` falla al compilar si
    no coinciden los caracteres, las sílabas del pinyin y los significados.
  - `familias.ts`, `compuestos.ts`, `curso.ts`.
  - `diccionario.ts` + `glosario.ts`: juntan todas las palabras del sitio para que
    `<Texto>` muestre el pinyin y el significado de cualquier chino dentro de un texto.
    Un carácter sin glosa rompe el build: se agrega a `glosario.ts`.
  - `gramatica/`: la gramática, organizada como una gramática de consulta (al estilo de
    Sherton English) en 15 secciones por clase de palabra o estructura. Cada sección
    vive en `secciones/<slug>.ts`, con sus temas escritos y los pendientes (`pendiente()`).
    `vocab.ts` tiene las palabras que se repiten. `index.ts` arma el mapa y falla al
    compilar si un tema enlaza a otro que no existe o que todavía no está escrito.
    Rutas: `/chino/gramatica/<seccion>/<tema>`.
- `src/components/`: `Caracter`, `PalabraDesglosada`, `OracionVista`, `Formula` y
  `ControlesEstudio` (ocultar pinyin o significados para ponerse a prueba).
- `docs/estudio-videos.md`: notas de estudio de las que salió el contenido inicial.

## Inglés

`/ingles` es la gramática de inglés armada desde los apuntes de 2020 (estilo Sherton English):
`src/content/ingles/` con secciones y temas hechos de bloques (texto, vocabulario, tablas,
ejemplos ＋/−/?, notas). Los textos usan un marcado corto para colorear siempre igual cada
pieza (`{be:am}`, `{have:has}`, `{will:will}`, `{do:does}`, `{modal:can}`, `{neg:n't}`,
`{fin:ing}`, `**negrita**`), y `inglés // español` separa la traducción en las tablas.

## Biblioteca HSK (solo local)

`/chino/biblioteca` muestra los libros del HSK Standard Course (nueva edición) con un botón ▶
sobre cada ícono de audio y una capa para escribir encima con tableta (se guarda en
IndexedDB, por página).

- Los PDF y audios tienen derechos de autor: van en `HSK/` (ignorada por git) y los sirve
  `app/chino/biblioteca/archivo/[...ruta]/route.ts`, con soporte de `Range` para cargar por partes.
  Los audios se extraen de los zip a `HSK/audio/hsk<n>/<lección>-<pista>.mp3`.
- `scripts/detectar-pistas.py` (PyMuPDF + OpenCV) ubica cada pista en su página, por la
  etiqueta del texto o por el ícono del parlante, y escribe `src/content/biblioteca/pistas/`.
  Las que no ubica se colocan con 📍 desde el visor; esas correcciones quedan en el navegador
  y se pueden copiar como JSON para pasarlas al archivo.

El contenido es un borrador: hay que verificarlo con Chinese Grammar Wiki, el
HSK Standard Course o un hablante nativo.
