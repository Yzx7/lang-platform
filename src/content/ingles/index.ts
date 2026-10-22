import { adjetivos, adverbios, pronombres, sustantivos } from "./secciones/palabras";
import { tiempos, verbos } from "./secciones/verbos";
import { pendiente, type Seccion, type Tema, type TemaPendiente } from "./tipos";

export type { Bloque, Seccion, Tema } from "./tipos";

/** El mapa de la gramática de inglés, en el orden del menú de Sherton English. */
export const secciones: Seccion[] = [
  pronombres,
  sustantivos,
  adjetivos,
  adverbios,
  {
    slug: "preguntas",
    titulo: "Preguntas",
    ingles: "Questions",
    resumen: "Palabras para preguntar y preguntas con cada auxiliar.",
    temas: [pendiente("palabras", "Palabras para preguntar (what, where, who…)"), pendiente("con-auxiliares", "Preguntas con do, be, have y will")],
  },
  {
    slug: "preposiciones",
    titulo: "Preposiciones",
    ingles: "Prepositions",
    resumen: "In, on, at y las de lugar, tiempo y dirección.",
    temas: [pendiente("in-on-at", "In, on, at: lugar y tiempo")],
  },
  {
    slug: "conectores",
    titulo: "Conectores",
    ingles: "Connectors",
    resumen: "And, but, because, so, although…",
    temas: [pendiente("basicos", "Conectores básicos")],
  },
  verbos,
  tiempos,
  {
    slug: "voz-pasiva",
    titulo: "Voz pasiva",
    ingles: "Passive voice",
    resumen: "To be + participio: the book was written.",
    temas: [pendiente("formacion", "Cómo se forma la pasiva")],
  },
  {
    slug: "condicionales",
    titulo: "Condicionales",
    ingles: "Conditionals",
    resumen: "Los condicionales 0, 1, 2 y 3, y wish.",
    temas: [pendiente("tipos", "Los 4 tipos de condicional")],
  },
];

export function esPendiente(t: Tema | TemaPendiente): t is TemaPendiente {
  return "pendiente" in t;
}

export function seccionPorSlug(slug: string) {
  return secciones.find((s) => s.slug === slug);
}

export function temaPorRuta(seccion: string, tema: string): Tema | undefined {
  const t = seccionPorSlug(seccion)?.temas.find((t) => t.slug === tema);
  return t && !esPendiente(t) ? t : undefined;
}

export const escritos = secciones.flatMap((seccion) =>
  seccion.temas.filter((t) => !esPendiente(t)).map((tema) => ({ seccion, tema: tema as Tema })),
);

// Un enlace roto entre temas rompe el build, igual que en la gramática de chino.
for (const { seccion, tema } of escritos) {
  for (const ruta of tema.relacionados ?? []) {
    const [s, t] = ruta.split("/");
    if (!temaPorRuta(s, t)) throw new Error(`ingles/${seccion.slug}/${tema.slug}: relacionado inexistente "${ruta}"`);
  }
}
