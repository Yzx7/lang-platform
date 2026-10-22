import type { Oracion } from "../tipos";

export type Rol =
  | "sujeto"
  | "tiempo"
  | "lugar"
  | "verbo"
  | "objeto"
  | "particula"
  | "conector"
  | "modificador"
  | "adverbio"
  | "complemento";

export type PuntoGramatical = {
  slug: string;
  titulo: string;
  hanzi: string;
  nivel: string;
  resumen: string;
  formula?: { rol: Rol; etiqueta: string; ejemplo: string }[];
  explicacion: string[];
  tabla?: { columnas: string[]; filas: string[][] };
  ejemplos: Oracion[];
  errores: { mal: string; bien: string; porque: string }[];
  matices?: string[];
  /** Rutas "seccion/tema" de otros puntos ya escritos. */
  relacionados: string[];
};

/** Tema que aparece en el mapa pero todavía no tiene contenido. */
export type TemaPendiente = { slug: string; titulo: string; hanzi: string; pendiente: true };

export type Tema = PuntoGramatical | TemaPendiente;

export type Seccion = {
  slug: string;
  titulo: string;
  hanzi: string;
  resumen: string;
  intro: string[];
  temas: Tema[];
};

export function pendiente(slug: string, titulo: string, hanzi: string): TemaPendiente {
  return { slug, titulo, hanzi, pendiente: true };
}
