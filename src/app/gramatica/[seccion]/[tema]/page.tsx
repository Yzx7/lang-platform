import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Formula } from "@/components/formula";
import { OracionVista } from "@/components/oracion";
import { Texto } from "@/components/texto";
import { escritos, puntoPorRuta, relacionado, seccionPorSlug } from "@/content/gramatica";

export function generateStaticParams() {
  return escritos.map(({ seccion, punto }) => ({ seccion: seccion.slug, tema: punto.slug }));
}

export async function generateMetadata(props: PageProps<"/gramatica/[seccion]/[tema]">): Promise<Metadata> {
  const { seccion, tema } = await props.params;
  const punto = puntoPorRuta(seccion, tema);
  return punto ? { title: punto.titulo, description: punto.resumen } : {};
}

export default function Pagina({ params }: PageProps<"/gramatica/[seccion]/[tema]">) {
  return (
    <Suspense>
      <PuntoGramatical params={params} />
    </Suspense>
  );
}

async function PuntoGramatical({ params }: Pick<PageProps<"/gramatica/[seccion]/[tema]">, "params">) {
  const { seccion: slugSeccion, tema } = await params;
  const seccion = seccionPorSlug(slugSeccion);
  const punto = puntoPorRuta(slugSeccion, tema);
  if (!seccion || !punto) notFound();

  const i = escritos.findIndex((e) => e.punto === punto);
  const anterior = escritos[i - 1];
  const siguiente = escritos[i + 1];

  return (
    <article className="space-y-10">
      <header className="space-y-3">
        <nav className="flex flex-wrap gap-2 text-sm text-muted">
          <Link href="/gramatica" className="hover:text-accent">
            Gramática
          </Link>
          <span>/</span>
          <Link href={`/gramatica/${seccion.slug}`} className="hover:text-accent">
            {seccion.titulo}
          </Link>
        </nav>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent">{punto.nivel}</span>
          <span className="rounded border border-line px-2 py-0.5 text-xs text-muted">Borrador</span>
        </div>
        <h1 className="text-3xl font-bold">
          <Texto>{punto.titulo}</Texto>
        </h1>
        <p className="hanzi text-xl text-muted">
          <Texto>{punto.hanzi}</Texto>
        </p>
        <p className="max-w-3xl text-lg">
          <Texto>{punto.resumen}</Texto>
        </p>
      </header>

      {punto.formula && (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Fórmula</h2>
          <Formula formula={punto.formula} />
        </section>
      )}

      <section className="max-w-3xl space-y-3">
        <h2 className="text-xl font-semibold">Cómo funciona</h2>
        {punto.explicacion.map((parrafo, j) => (
          <p key={j} className="leading-relaxed">
            <Texto>{parrafo}</Texto>
          </p>
        ))}
      </section>

      {punto.tabla && (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Tabla</h2>
          <div className="overflow-x-auto rounded-xl border border-line">
            <table className="w-full border-collapse bg-surface text-left">
              <thead>
                <tr className="border-b border-line">
                  {punto.tabla.columnas.map((c) => (
                    <th key={c} className="px-4 py-2 text-sm font-semibold">
                      <Texto>{c}</Texto>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {punto.tabla.filas.map((fila, j) => (
                  <tr key={j} className="border-b border-line last:border-0">
                    {fila.map((celda, k) => (
                      <td key={k} className="hanzi px-4 py-2 text-lg">
                        <Texto>{celda}</Texto>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Ejemplos</h2>
        <div className="space-y-3">
          {punto.ejemplos.map((o, j) => (
            <OracionVista key={j} o={o} />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Errores típicos de hispanohablantes</h2>
        <div className="space-y-3">
          {punto.errores.map((e, j) => (
            <div key={j} className="rounded-xl border border-line bg-surface p-4">
              <p className="hanzi text-xl">
                <span className="mr-2 text-[var(--t1)]">✗</span>
                <span className="line-through decoration-[var(--t1)]"><Texto>{e.mal}</Texto></span>
                <span className="mx-3 text-muted">→</span>
                <span className="mr-2 text-[var(--t2)]">✓</span>
                <Texto>{e.bien}</Texto>
              </p>
              <p className="mt-2 text-sm text-muted"><Texto>{e.porque}</Texto></p>
            </div>
          ))}
        </div>
      </section>

      {punto.matices && (
        <section className="space-y-3 rounded-xl border border-accent/40 bg-accent-soft p-5">
          <h2 className="text-lg font-semibold">⚠️ Para no aprenderlo como robot</h2>
          <ul className="list-disc space-y-2 pl-5">
            {punto.matices.map((m, j) => (
              <li key={j}>
                <Texto>{m}</Texto>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Relacionados</h2>
        <div className="flex flex-wrap gap-3">
          {punto.relacionados.map((ruta) => {
            const rel = relacionado(ruta);
            return (
              rel && (
                <Link
                  key={ruta}
                  href={rel.href}
                  className="rounded-lg border border-line px-4 py-2 text-sm hover:border-accent hover:text-accent"
                >
                  {rel.titulo}
                </Link>
              )
            );
          })}
        </div>
      </section>

      <nav className="flex flex-wrap justify-between gap-3 border-t border-line pt-6 text-sm">
        {anterior ? (
          <Link href={`/gramatica/${anterior.seccion.slug}/${anterior.punto.slug}`} className="hover:text-accent">
            ← {anterior.punto.titulo}
          </Link>
        ) : (
          <span />
        )}
        {siguiente && (
          <Link href={`/gramatica/${siguiente.seccion.slug}/${siguiente.punto.slug}`} className="hover:text-accent">
            {siguiente.punto.titulo} →
          </Link>
        )}
      </nav>
    </article>
  );
}
