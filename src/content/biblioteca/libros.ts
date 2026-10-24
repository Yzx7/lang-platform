import hsk1 from "./pistas/hsk1.json";
import hsk2 from "./pistas/hsk2.json";
import hsk3 from "./pistas/hsk3.json";

/**
 * Libros del HSK Standard Course (nueva edición, HSK 3.0). Los PDF y los audios
 * tienen derechos de autor: viven en /HSK, fuera de git, y solo se sirven en local.
 * Las posiciones de las pistas salen de scripts/detectar-pistas.py.
 */

/** Dónde va una pista en el libro. Sin página: falta colocarla a mano desde el visor. */
export type Pista = {
  pista: string;
  pagina: number | null;
  x: number | null;
  y: number | null;
  fuente: "texto" | "icono" | "manual" | null;
};

export type Libro = {
  slug: string;
  nivel: string;
  tipo: "Libro de texto" | "Cuaderno de ejercicios" | "Escritura" | "Vocabulario";
  archivo: string;
  /** Carpeta de los mp3 dentro de HSK/audio. */
  audio?: string;
  pistas?: Pista[];
};

export const libros: Libro[] = [
  { slug: "hsk1-texto", nivel: "HSK 1", tipo: "Libro de texto", archivo: "hsk-course-1.pdf", audio: "hsk1", pistas: hsk1 as Pista[] },
  { slug: "hsk1-cuaderno", nivel: "HSK 1", tipo: "Cuaderno de ejercicios", archivo: "hsk-course-1-workbook.pdf" },
  { slug: "hsk1-escritura", nivel: "HSK 1", tipo: "Escritura", archivo: "hsk-course-1-writing.pdf" },
  { slug: "hsk2-texto", nivel: "HSK 2", tipo: "Libro de texto", archivo: "hsk-course-2.pdf", audio: "hsk2", pistas: hsk2 as Pista[] },
  { slug: "hsk2-cuaderno", nivel: "HSK 2", tipo: "Cuaderno de ejercicios", archivo: "hsk-course-2-workbook.pdf" },
  { slug: "hsk2-escritura", nivel: "HSK 2", tipo: "Escritura", archivo: "hsk-course-2-writing.pdf" },
  { slug: "hsk3-texto", nivel: "HSK 3", tipo: "Libro de texto", archivo: "hsk-course-3.pdf", audio: "hsk3", pistas: hsk3 as Pista[] },
  { slug: "hsk3-cuaderno", nivel: "HSK 3", tipo: "Cuaderno de ejercicios", archivo: "hsk-course-3-workbook.pdf" },
  { slug: "hsk3-vocabulario", nivel: "HSK 3", tipo: "Vocabulario", archivo: "hsk-3.pdf" },
  { slug: "hsk4a-texto", nivel: "HSK 4", tipo: "Libro de texto", archivo: "hsk-course-4a.pdf" },
  { slug: "hsk4b-texto", nivel: "HSK 4", tipo: "Libro de texto", archivo: "hsk-course-4b.pdf" },
];

export function libroPorSlug(slug: string): Libro | undefined {
  return libros.find((l) => l.slug === slug);
}

export function tituloDe(libro: Libro): string {
  const parte = libro.slug.match(/^hsk4([ab])/)?.[1];
  return `${libro.nivel}${parte ? ` (${parte.toUpperCase()})` : ""} · ${libro.tipo}`;
}

/** URL local de un archivo de /HSK (ver app/chino/biblioteca/archivo). */
export function urlArchivo(ruta: string): string {
  return `/chino/biblioteca/archivo/${ruta}`;
}
