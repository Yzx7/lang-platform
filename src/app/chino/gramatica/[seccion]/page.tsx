import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Texto } from "@/components/texto";
import { esPendiente, seccionPorSlug, secciones } from "@/content/gramatica";

export function generateStaticParams() {
  return secciones.map((s) => ({ seccion: s.slug }));
}

export async function generateMetadata(props: PageProps<"/chino/gramatica/[seccion]">): Promise<Metadata> {
  const { seccion: slug } = await props.params;
  const seccion = seccionPorSlug(slug);
  return seccion ? { title: seccion.titulo, description: seccion.resumen } : {};
}

export default function Pagina({ params }: PageProps<"/chino/gramatica/[seccion]">) {
  return (
    <Suspense>
      <SeccionGramatica params={params} />
    </Suspense>
  );
}

async function SeccionGramatica({ params }: Pick<PageProps<"/chino/gramatica/[seccion]">, "params">) {
  const { seccion: slug } = await params;
  const seccion = seccionPorSlug(slug);
  if (!seccion) notFound();

  const i = secciones.indexOf(seccion);
  const anterior = secciones[i - 1];
  const siguiente = secciones[i + 1];

  return (
    <article className="space-y-10">
      <header className="space-y-3">
        <Link href="/chino/gramatica" className="text-sm text-muted hover:text-accent">
          ← Gramática
        </Link>
        <h1 className="text-3xl font-bold">
          {seccion.titulo}{" "}
          <span className="hanzi font-normal text-muted">
            <Texto>{seccion.hanzi}</Texto>
          </span>
        </h1>
        <p className="max-w-3xl text-lg">
          <Texto>{seccion.resumen}</Texto>
        </p>
        <div className="max-w-3xl space-y-3 text-muted">
          {seccion.intro.map((parrafo, j) => (
            <p key={j} className="leading-relaxed">
              <Texto>{parrafo}</Texto>
            </p>
          ))}
        </div>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Temas</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {seccion.temas.map((t) =>
            esPendiente(t) ? (
              <div key={t.slug} className="space-y-1 rounded-xl border border-dashed border-line p-5 opacity-60">
                <span className="text-xs font-medium text-muted">Próximamente</span>
                <h3 className="font-semibold">{t.titulo}</h3>
                <p className="hanzi text-muted">{t.hanzi}</p>
              </div>
            ) : (
              <Link
                key={t.slug}
                href={`/chino/gramatica/${seccion.slug}/${t.slug}`}
                className="space-y-2 rounded-xl border border-line bg-surface p-5 transition-colors hover:border-accent"
              >
                <span className="text-xs font-medium text-accent">{t.nivel}</span>
                <h3 className="text-lg font-semibold">{t.titulo}</h3>
                <p className="hanzi text-muted">{t.hanzi}</p>
                <p className="text-sm text-muted">{t.resumen}</p>
              </Link>
            ),
          )}
        </div>
      </section>

      <nav className="flex flex-wrap justify-between gap-3 border-t border-line pt-6 text-sm">
        {anterior ? (
          <Link href={`/chino/gramatica/${anterior.slug}`} className="hover:text-accent">
            ← {anterior.titulo}
          </Link>
        ) : (
          <span />
        )}
        {siguiente && (
          <Link href={`/chino/gramatica/${siguiente.slug}`} className="hover:text-accent">
            {siguiente.titulo} →
          </Link>
        )}
      </nav>
    </article>
  );
}
