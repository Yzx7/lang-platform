import type { Oracion, Palabra } from "./tipos";

/**
 * Crea una palabra a partir de sus caracteres, el pinyin separado por
 * espacios (una sílaba por carácter) y el significado de cada carácter.
 * Falla al compilar si los tres no tienen la misma longitud.
 */
export function w(
  hanzi: string,
  pinyin: string,
  significados: string[],
  es?: string,
  extra?: { lit?: string; nota?: string },
): Palabra {
  const hs = [...hanzi];
  const ps = pinyin.split(" ");
  if (hs.length !== ps.length || hs.length !== significados.length) {
    throw new Error(`Palabra mal formada: ${hanzi} / ${pinyin}`);
  }
  return {
    chars: hs.map((h, i) => ({ h, p: ps[i], m: significados[i] })),
    es: es ?? significados.join(" "),
    ...extra,
  };
}

export function s(
  tokens: (Palabra | string)[],
  es: string,
  extra?: Pick<Oracion, "lit" | "nota" | "tipo">,
): Oracion {
  return { tokens, es, ...extra };
}
