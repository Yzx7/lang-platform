import Link from "next/link";
import { familias } from "@/content/familias";
import { escritos as gramaticaChino } from "@/content/gramatica";
import { escritos as gramaticaIngles } from "@/content/ingles";

const cursos = [
  {
    href: "/chino",
    marca: <span className="hanzi">中</span>,
    titulo: "Chino mandarín",
    nivel: "HSK 1",
    texto:
      "Cada palabra se desarma carácter por carácter y cada regla viene con su fórmula, una tabla y oraciones de ejemplo.",
    datos: [`${gramaticaChino.length} temas de gramática`, `${familias.length} familias de caracteres`],
  },
  {
    href: "/ingles",
    marca: "En",
    titulo: "Inglés",
    nivel: "Gramática",
    texto:
      "Las formas del verbo, los auxiliares y los 12 tiempos, con tablas, ejemplos traducidos y un color fijo para cada pieza.",
    datos: [`${gramaticaIngles.length} temas de gramática`],
  },
];

export default function Inicio() {
  return (
    <div className="space-y-12">
      <section className="space-y-5">
        <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
          Idiomas entendiendo <span className="text-accent">por qué</span>, no memorizando.
        </h1>
        <p className="max-w-2xl text-lg text-muted">
          Explicado en español: cada regla con su fórmula, sus ejemplos y los errores que solemos cometer los
          hispanohablantes. Elige un curso para empezar.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {cursos.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group flex flex-col gap-4 rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-accent"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-lg bg-accent text-xl font-semibold text-white">
                {c.marca}
              </span>
              <div>
                <h2 className="text-2xl font-semibold group-hover:text-accent">{c.titulo}</h2>
                <p className="text-sm text-muted">{c.nivel}</p>
              </div>
            </div>
            <p className="text-muted">{c.texto}</p>
            <ul className="flex flex-wrap gap-2 text-sm">
              {c.datos.map((d) => (
                <li key={d} className="rounded-full bg-accent-soft px-3 py-1 text-accent">
                  {d}
                </li>
              ))}
            </ul>
            <span className="mt-auto text-sm font-medium text-accent">Entrar al curso →</span>
          </Link>
        ))}
      </section>
    </div>
  );
}
