import { adjetivos } from "./secciones/adjetivos";
import { adverbios } from "./secciones/adverbios";
import { complementos } from "./secciones/complementos";
import { condicionales } from "./secciones/condicionales";
import { conectores } from "./secciones/conectores";
import { estructura } from "./secciones/estructura";
import { numerosYClasificadores } from "./secciones/numeros-y-clasificadores";
import { particulas } from "./secciones/particulas";
import { pasivaYBa } from "./secciones/pasiva-y-ba";
import { preguntas } from "./secciones/preguntas";
import { preposiciones } from "./secciones/preposiciones";
import { pronombres } from "./secciones/pronombres";
import { sustantivos } from "./secciones/sustantivos";
import { tiempoYAspecto } from "./secciones/tiempo-y-aspecto";
import { verbosPrincipales } from "./secciones/verbos-principales";
import type { PuntoGramatical, Seccion, Tema, TemaPendiente } from "./tipos";

export type { PuntoGramatical, Rol, Seccion, Tema, TemaPendiente } from "./tipos";

/** El mapa de la gramática, en el orden en que se muestra. */
export const secciones: Seccion[] = [
  estructura,
  pronombres,
  sustantivos,
  numerosYClasificadores,
  adjetivos,
  adverbios,
  verbosPrincipales,
  tiempoYAspecto,
  complementos,
  preguntas,
  preposiciones,
  conectores,
  condicionales,
  pasivaYBa,
  particulas,
];

export function esPendiente(t: Tema): t is TemaPendiente {
  return "pendiente" in t;
}

export function seccionPorSlug(slug: string): Seccion | undefined {
  return secciones.find((s) => s.slug === slug);
}

export function puntoPorRuta(seccion: string, tema: string): PuntoGramatical | undefined {
  const t = seccionPorSlug(seccion)?.temas.find((t) => t.slug === tema);
  return t && !esPendiente(t) ? t : undefined;
}

/** Todos los temas ya escritos, con su sección. */
export const escritos = secciones.flatMap((seccion) =>
  seccion.temas.filter((t) => !esPendiente(t)).map((punto) => ({ seccion, punto: punto as PuntoGramatical })),
);

/** Resuelve una ruta "seccion/tema" de `relacionados`. */
export function relacionado(ruta: string) {
  const [seccion, tema] = ruta.split("/");
  const punto = puntoPorRuta(seccion, tema);
  return punto && { href: `/gramatica/${ruta}`, titulo: punto.titulo };
}

// Igual que w(), un enlace roto entre temas rompe el build en vez de llegar a la página.
for (const { seccion, punto } of escritos) {
  for (const ruta of punto.relacionados) {
    if (!relacionado(ruta)) throw new Error(`${seccion.slug}/${punto.slug}: relacionado inexistente "${ruta}"`);
  }
}
