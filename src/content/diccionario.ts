import { excepcionesFoneticas, marcas, masEjemplos, tiposCompuesto } from "./compuestos";
import { familias } from "./familias";
import { glosario } from "./glosario";
import { escritos } from "./gramatica";
import { v } from "./gramatica/vocab";
import type { Palabra } from "./tipos";

/** Un trozo de texto: texto normal o una palabra china con sus lecturas posibles. */
export type Segmento = string | { hanzi: string; opciones: Palabra[] };

const LARGO_MAXIMO = 6;
const HAN = /(\p{Script=Han}+)/u;

const hanziDe = (p: Palabra) => p.chars.map((c) => c.h).join("");
const firma = (p: Palabra) => p.chars.map((c) => `${c.p}:${c.m}`).join("|");

// Todas las palabras del sitio: las de los ejemplos, las familias, los compuestos y el glosario.
const todas: Palabra[] = [
  ...glosario,
  ...Object.values(v),
  ...escritos.flatMap(({ punto }) => punto.ejemplos.flatMap((o) => o.tokens.filter((t) => typeof t !== "string"))),
  ...familias.flatMap((f) => f.palabras),
  ...tiposCompuesto.flatMap((t) => [...t.palabras, ...(t.subgrupos ?? []).flatMap((g) => g.palabras)]),
  ...masEjemplos.flatMap((g) => g.palabras),
  ...excepcionesFoneticas,
  ...marcas,
];

// hanzi de la palabra → sus lecturas distintas (会 «saber» y 会 «va a» son dos).
const palabras = new Map<string, Palabra[]>();
// carácter → sus lecturas distintas, sacadas de las palabras donde aparece.
const caracteres = new Map<string, Palabra[]>();

function agregar(mapa: Map<string, Palabra[]>, clave: string, p: Palabra) {
  const lista = mapa.get(clave) ?? [];
  if (!lista.some((q) => firma(q) === firma(p))) lista.push(p);
  mapa.set(clave, lista);
}

for (const p of todas) {
  agregar(palabras, hanziDe(p), p);
  for (const c of p.chars) agregar(caracteres, c.h, { chars: [c], es: c.m });
}

/** Los significados que tiene un carácter en las palabras del sitio (vacío si no aparece). */
export function significadosDe(hanzi: string): string[] {
  return [...new Set((caracteres.get(hanzi) ?? []).map((p) => p.chars[0].m))];
}

/** Las palabras del sitio de dos o más caracteres que contienen este carácter. */
export function palabrasCon(hanzi: string): Palabra[] {
  return [...palabras.values()].flat().filter((p) => p.chars.length > 1 && p.chars.some((c) => c.h === hanzi));
}

function buscar(texto: string, desde: number): { hanzi: string; opciones: Palabra[] } {
  for (let largo = Math.min(LARGO_MAXIMO, texto.length - desde); largo > 0; largo--) {
    const hanzi = texto.slice(desde, desde + largo);
    const opciones = palabras.get(hanzi);
    if (opciones) return { hanzi, opciones };
  }
  const hanzi = texto[desde];
  const opciones = caracteres.get(hanzi);
  // Como w(), un carácter sin glosa rompe el build: hay que agregarlo a glosario.ts.
  if (!opciones) throw new Error(`Carácter sin glosa: ${hanzi} (en «${texto}»). Agrégalo a src/content/glosario.ts.`);
  return { hanzi, opciones };
}

/** Parte un texto en trozos normales y palabras chinas con su pinyin y significado. */
export function glosar(texto: string): Segmento[] {
  return texto.split(HAN).flatMap((trozo, i): Segmento[] => {
    // split con un grupo de captura deja los tramos chinos en las posiciones impares.
    if (i % 2 === 0) return trozo ? [trozo] : [];
    const segmentos: Segmento[] = [];
    for (let desde = 0; desde < trozo.length; ) {
      const palabra = buscar(trozo, desde);
      segmentos.push(palabra);
      desde += palabra.hanzi.length;
    }
    return segmentos;
  });
}
