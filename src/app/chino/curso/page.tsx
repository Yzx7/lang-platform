import type { Metadata } from "next";
import Link from "next/link";
import { semanas } from "@/content/curso";

export const metadata: Metadata = { title: "Curso HSK 1" };

const colorTipo: Record<string, string> = {
  gramática: "var(--r-verbo)",
  caracteres: "var(--r-lugar)",
  palabras: "var(--r-tiempo)",
  pronunciación: "var(--r-sujeto)",
};

export default function Curso() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">Curso HSK 1, semana a semana</h1>
        <p className="max-w-2xl text-muted">
          Un tema por semana, alternando gramática y familias de caracteres. Las semanas atenuadas todavía no tienen
          contenido.
        </p>
      </header>

      <ol className="space-y-3">
        {semanas.map((s) => {
          const contenido = (
            <>
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line font-semibold">
                {s.n}
              </span>
              <span className="flex-1">
                <span className="block font-medium">{s.titulo}</span>
                <span
                  className="mt-1 inline-block rounded px-2 py-0.5 text-xs"
                  style={{ background: colorTipo[s.tipo] }}
                >
                  {s.tipo}
                </span>
              </span>
              <span className="text-sm text-muted">{s.href ? "→" : "Próximamente"}</span>
            </>
          );
          const clase = "flex items-center gap-4 rounded-xl border border-line bg-surface p-4";
          return (
            <li key={s.n}>
              {s.href ? (
                <Link href={s.href} className={`${clase} transition-colors hover:border-accent`}>
                  {contenido}
                </Link>
              ) : (
                <div className={`${clase} opacity-50`}>{contenido}</div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
