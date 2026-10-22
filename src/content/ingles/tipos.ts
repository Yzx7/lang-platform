/**
 * Gramática de inglés, armada desde los apuntes de 2020 (estilo Sherton English).
 *
 * Los textos usan un marcado corto para colorear las piezas, siempre con el mismo color:
 *   **play**      palabra principal (negrita)
 *   {be:am}       verbo to be            {have:has}  have como auxiliar
 *   {will:will}   will / futuro          {do:does}   do como auxiliar
 *   {modal:can}   verbo modal            {neg:n't}   negación
 *   {fin:ing}     terminación (-ing, -ed, -s, -ly…)
 * En tablas, «inglés // español» separa la traducción (como en los apuntes) y «\n» parte líneas.
 *
 * Para las fórmulas de las preguntas, las piezas sin texto se dibujan como círculos de color:
 *   {suj} sujeto · {v} verbo · {v:ing} verbo con terminación · {be} {have} {will} {modal}
 */

export type Ejemplo = { tipo?: "+" | "-" | "?"; en: string; es: string; nota?: string };
export type EntradaVocab = { en: string; pron?: string; es: string };

/**
 * Celda de una tabla constructora: las piezas para armar la forma, no la oración entera.
 * `filas` > 1 hace que la celda ocupe varias filas (la misma pieza sirve para varios sujetos);
 * en las filas que cubre, esa columna va como null.
 */
export type CeldaConstructor = {
  piezas: string[];
  /** Verbos de ejemplo que se combinan con las piezas (play, jump, live…). */
  lista?: string[];
  /** Un ejemplo armado, en chiquito: «am playing». */
  ejemplo?: string;
  filas?: number;
};

export type Bloque =
  | { tipo: "texto"; titulo?: string; parrafos: string[] }
  | { tipo: "vocab"; titulo?: string; items: EntradaVocab[] }
  | { tipo: "tabla"; titulo?: string; columnas: string[]; filas: string[][]; pie?: string }
  | { tipo: "ejemplos"; titulo?: string; items: Ejemplo[] }
  | {
      tipo: "constructor";
      titulo?: string;
      /** Cabeceras: nombre del tiempo y su equivalente en español (en azul). */
      columnas: { titulo: string; es: string }[];
      filas: { sujetos: string[]; celdas: (CeldaConstructor | null)[] }[];
      /** Fila final: la fórmula de la pregunta y algunos ejemplos, por columna. */
      preguntas?: { formula: string; ejemplos: string[] }[];
      pie?: string[];
    }
  | { tipo: "nota"; titulo: string; items: string[] };

export type Tema = {
  slug: string;
  titulo: string;
  resumen: string;
  bloques: Bloque[];
  /** Rutas "seccion/tema" de otros temas ya escritos. */
  relacionados?: string[];
};

export type TemaPendiente = { slug: string; titulo: string; pendiente: true };

export type Seccion = {
  slug: string;
  titulo: string;
  ingles: string;
  resumen: string;
  temas: (Tema | TemaPendiente)[];
};

export function pendiente(slug: string, titulo: string): TemaPendiente {
  return { slug, titulo, pendiente: true };
}
