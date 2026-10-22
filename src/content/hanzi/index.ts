import { significadosDe } from "../diccionario";
import datos from "./hanzi.json";
import { formasParecidas } from "./parecidos";

/**
 * Un carácter por dentro: de qué componentes está hecho y cuál aporta el
 * significado y cuál el sonido. Sale de Make Me a Hanzi con
 * scripts/descomponer-hanzi.py; no se edita a mano.
 */
export type Hanzi = {
  h: string;
  /** Lecturas en pinyin; la primera es la más común. */
  py: string[];
  /** Definición en inglés de Make Me a Hanzi, pendiente de traducir. */
  en?: string;
  /** Descripción de su estructura: ⿰日青 = 日 a la izquierda, 青 a la derecha. */
  ids: string;
  partes?: string[];
  rad: string;
  tipo?: string;
  /** Componente que aporta el significado. */
  sem?: string;
  /** Componente que aporta el sonido. */
  fon?: string;
  /** Pista de la etimología, en inglés. */
  pista?: string;
  /** Nivel del HSK 3.0 en que aparece (7 = niveles 7 a 9). */
  nivel?: number;
};

export const todos = datos as Hanzi[];
const porCaracter = new Map(todos.map((e) => [e.h, e]));

export function hanziDe(h: string): Hanzi | undefined {
  return porCaracter.get(h);
}

export const tipos: Record<string, { nombre: string; idea: string }> = {
  pictographic: { nombre: "Pictograma", idea: "un dibujo de lo que significa" },
  ideographic: { nombre: "Ideograma", idea: "junta ideas para formar una nueva" },
  pictophonetic: { nombre: "Fonético-semántico", idea: "una parte da el significado y otra el sonido" },
};

export const estructuras: Record<string, string> = {
  "⿰": "izquierda + derecha",
  "⿱": "arriba + abajo",
  "⿲": "izquierda + centro + derecha",
  "⿳": "arriba + centro + abajo",
  "⿴": "rodeado por completo",
  "⿵": "rodeado por arriba",
  "⿶": "rodeado por abajo",
  "⿷": "rodeado por la izquierda",
  "⿸": "rodeado por arriba a la izquierda",
  "⿹": "rodeado por arriba a la derecha",
  "⿺": "rodeado por abajo a la izquierda",
  "⿻": "superpuestos",
};

/** Lo usa el sitio primero, luego los de nivel HSK más bajo. */
function comparar(a: Hanzi, b: Hanzi) {
  const sitio = Number(significadosDe(b.h).length > 0) - Number(significadosDe(a.h).length > 0);
  return sitio || (a.nivel ?? 99) - (b.nivel ?? 99) || a.h.localeCompare(b.h);
}

function agrupar(claves: (e: Hanzi) => (string | undefined)[]) {
  const grupos = new Map<string, Hanzi[]>();
  for (const e of todos) {
    for (const k of claves(e)) if (k) grupos.set(k, [...(grupos.get(k) ?? []), e]);
  }
  for (const lista of grupos.values()) lista.sort(comparar);
  return grupos;
}

const porSonido = agrupar((e) => [e.fon]);
const porSignificado = agrupar((e) => [e.sem]);
const porParte = agrupar((e) => e.partes ?? []);

/** Caracteres que usan `h` para el sonido. */
export const usanDeSonido = (h: string) => porSonido.get(h) ?? [];
/** Caracteres que usan `h` para el significado. */
export const usanDeSignificado = (h: string) => porSignificado.get(h) ?? [];
/** Caracteres que llevan `h` dentro, cumpla el papel que cumpla. */
export const contienen = (h: string) => porParte.get(h) ?? [];

/** Grupos de caracteres que se confunden a la vista con `h`. */
export function parecidosA(h: string) {
  return formasParecidas.filter((g) => g.caracteres.includes(h));
}

/**
 * Las familias de sonido más útiles: componentes que dan el sonido a varios
 * caracteres comunes y que de verdad ayudan a adivinar la lectura (la mayoría
 * suena igual salvo el tono), con al menos un carácter que ya aparece en el sitio.
 */
export function familiasDeSonido(cuantas: number) {
  return [...porSonido.entries()]
    .flatMap(([h, lista]) => {
      const fon = porCaracter.get(h);
      return fon?.py[0] ? [{ fon, lista: lista.filter((e) => (e.nivel ?? 99) <= 6) }] : [];
    })
    .map((f) => {
      const ecos = f.lista.map((e) => ecoDelSonido(e.py[0] ?? "", f.fon.py[0]));
      return {
        ...f,
        fiables: ecos.filter((eco) => eco === "igual" || eco === "otro tono").length,
        enSitio: f.lista.filter((e) => significadosDe(e.h).length > 0).length,
      };
    })
    .filter((f) => f.fiables >= 3 && f.fiables * 2 >= f.lista.length && f.enSitio > 0)
    .sort((a, b) => b.fiables - a.fiables || b.enSitio - a.enSitio)
    .slice(0, cuantas);
}

const INICIAL = /^(zh|ch|sh|[bpmfdtnlgkhjqxrzcsyw])/;
const sinTono = (py: string) => py.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();

/**
 * Qué tanto se sigue oyendo el componente de sonido en el carácter, comparando
 * sus pinyin (a: el carácter, b: el componente). El chino
 * cambió en tres mil años: a veces suena igual, a veces solo rima y a veces ya no se parece.
 */
export function ecoDelSonido(a: string, b: string): "igual" | "otro tono" | "rima" | "distinto" {
  if (a === b) return "igual";
  if (sinTono(a) === sinTono(b)) return "otro tono";
  if (sinTono(a).replace(INICIAL, "") === sinTono(b).replace(INICIAL, "")) return "rima";
  return "distinto";
}

/** Significado en español si el sitio ya lo tiene; si no, la definición en inglés. */
export function significado(e: Hanzi): { texto: string; ingles: boolean } {
  const es = significadosDe(e.h);
  if (es.length) return { texto: es.slice(0, 3).join(" · "), ingles: false };
  return { texto: e.en?.split(";")[0] ?? "", ingles: true };
}

// Igual que w(): un carácter que no existe en los datos rompe el build.
for (const g of formasParecidas) {
  for (const c of g.caracteres) {
    if (!porCaracter.has(c)) throw new Error(`parecidos.ts: ${c} no está en hanzi.json`);
  }
}
