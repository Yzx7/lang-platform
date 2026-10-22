const TONOS: Record<string, 1 | 2 | 3 | 4> = {
  ā: 1, ē: 1, ī: 1, ō: 1, ū: 1, ǖ: 1,
  á: 2, é: 2, í: 2, ó: 2, ú: 2, ǘ: 2,
  ǎ: 3, ě: 3, ǐ: 3, ǒ: 3, ǔ: 3, ǚ: 3,
  à: 4, è: 4, ì: 4, ò: 4, ù: 4, ǜ: 4,
};

/** Tono de una sílaba en pinyin con tildes; 0 si es tono neutro. */
export function tonoDe(silaba: string): 0 | 1 | 2 | 3 | 4 {
  for (const c of silaba.normalize("NFC").toLowerCase()) {
    const tono = TONOS[c];
    if (tono) return tono;
  }
  return 0;
}
