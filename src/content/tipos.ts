/** Un carácter con su lectura y su significado dentro de la palabra. */
export type Morfema = {
  h: string;
  p: string;
  m: string;
};

export type Palabra = {
  chars: Morfema[];
  /** Traducción natural de la palabra completa. */
  es: string;
  /** Lectura literal, si aporta algo más que unir los significados. */
  lit?: string;
  nota?: string;
};

/** Una oración es una lista de palabras y signos de puntuación. */
export type Oracion = {
  tokens: (Palabra | string)[];
  es: string;
  lit?: string;
  nota?: string;
  /** Afirmativa, negativa o pregunta: se marca con ＋, − o ? junto a la oración. */
  tipo?: "+" | "-" | "?";
};
