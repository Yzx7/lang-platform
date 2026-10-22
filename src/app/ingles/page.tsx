import type { Metadata } from "next";
import Link from "next/link";
import { Leyenda, Marcado } from "@/components/ingles/marcado";
import { esPendiente, escritos, secciones } from "@/content/ingles";

export const metadata: Metadata = { title: "Inglés" };

// El resumen con el que arrancaban los apuntes de 2020.
const cuatroCosas = [
  {
    titulo: "Las formas del verbo",
    texto: "Cada verbo tiene 5 formas (do, did, done, doing, does) y se usan según el sujeto y el tiempo.",
    href: "/ingles/verbos/formas-del-verbo",
  },
  {
    titulo: "Cómo funciona to be",
    texto: "To be es «ser» o «estar» en cualquier tiempo, pero cambia según el sujeto: {be:am}, {be:are}, {be:is}, {be:was}, {be:were}.",
    href: "/ingles/verbos/to-be",
  },
  {
    titulo: "Qué auxiliar usa cada tiempo",
    texto: "{do:do} y {do:did} para el simple, {be:be} para el progresivo, {have:have} para el perfecto y {will:will} para el futuro.",
    href: "/ingles/verbos/auxiliares",
  },
  {
    titulo: "Los 12 tiempos",
    texto: "Tres momentos (presente, pasado, futuro) por cuatro aspectos (simple, progresivo, perfecto, perfecto progresivo).",
    href: "/ingles/tiempos/los-12-tiempos",
  },
];

export default function Ingles() {
  const total = secciones.reduce((n, s) => n + s.temas.length, 0);

  return (
    <div className="space-y-12">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">Inglés</h1>
        <p className="max-w-2xl text-muted">
          Gramática de inglés armada desde mis apuntes de 2020, cuando aprendía con Sherton English: tablas, ejemplos
          traducidos y siempre los mismos colores para cada pieza.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Lo que hay que entender: 4 cosas</h2>
        <p className="max-w-2xl text-muted">
          La base para aprender inglés son 4 cosas. Con ellas claras, el resto de la gramática se apoya encima.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {cuatroCosas.map((c, i) => (
            <Link
              key={c.href}
              href={c.href}
              className="space-y-1 rounded-xl border border-line bg-surface p-5 transition-colors hover:border-accent"
            >
              <span className="text-2xl font-bold text-accent">{i + 1}</span>
              <h3 className="text-lg font-semibold">{c.titulo}</h3>
              <p className="text-sm text-muted">
                <Marcado>{c.texto}</Marcado>
              </p>
            </Link>
          ))}
        </div>
        <Leyenda />
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-2xl font-semibold">Gramática</h2>
          <p className="text-sm text-muted">
            {escritos.length} de {total} temas escritos
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {secciones.map((s, i) => (
            <section key={s.slug} className="space-y-3 rounded-xl border border-line bg-surface p-5">
              <Link href={`/ingles/${s.slug}`} className="group block space-y-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-sm font-medium text-muted">{i + 1}</span>
                  <h3 className="text-xl font-semibold group-hover:text-accent">{s.titulo}</h3>
                  <span className="text-muted">{s.ingles}</span>
                </div>
                <p className="text-sm text-muted">{s.resumen}</p>
              </Link>
              <ul className="space-y-1 border-t border-line pt-3 text-sm">
                {s.temas.map((t) =>
                  esPendiente(t) ? (
                    <li key={t.slug} className="text-muted opacity-60">
                      ○ {t.titulo}
                    </li>
                  ) : (
                    <li key={t.slug}>
                      <Link href={`/ingles/${s.slug}/${t.slug}`} className="hover:text-accent hover:underline">
                        <span className="text-accent">●</span> {t.titulo}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
