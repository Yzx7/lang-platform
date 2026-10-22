export type Semana = {
  n: number;
  titulo: string;
  tipo: "gramática" | "caracteres" | "palabras" | "pronunciación";
  href?: string;
};

/** Primer tramo del curso (HSK 1). Las semanas sin href aún no tienen contenido. */
export const semanas: Semana[] = [
  { n: 1, titulo: "Pinyin y los cuatro tonos", tipo: "pronunciación" },
  { n: 2, titulo: "Cómo se arman las palabras: los 7 tipos de compuestos", tipo: "palabras", href: "/compuestos" },
  { n: 3, titulo: "El orden de la oración: S + T + L + V + O", tipo: "gramática", href: "/gramatica/estructura/orden-de-la-oracion" },
  { n: 4, titulo: "Familia 电 (electricidad)", tipo: "caracteres", href: "/caracteres/dian" },
  { n: 5, titulo: "La cadena de acciones (连动句)", tipo: "gramática", href: "/gramatica/estructura/cadena-de-verbos" },
  { n: 6, titulo: "Familias 车 (vehículo) y 机 (máquina)", tipo: "caracteres", href: "/caracteres/che" },
  { n: 7, titulo: "El verbo no cambia: 在, 了 y 会", tipo: "gramática", href: "/gramatica/tiempo-y-aspecto/el-verbo-no-cambia" },
  { n: 8, titulo: "Familia 心 (corazón): las emociones", tipo: "caracteres", href: "/caracteres/xin" },
  { n: 9, titulo: "Porque…, así que…; pero…", tipo: "gramática", href: "/gramatica/conectores/porque-asi-que-pero" },
  { n: 10, titulo: "是 y 的: ser y pertenecer", tipo: "gramática" },
  { n: 11, titulo: "Preguntas con 吗 y 什么", tipo: "gramática" },
  { n: 12, titulo: "Números y clasificadores (量词)", tipo: "gramática" },
];
