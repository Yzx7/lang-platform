import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Marcado } from "@/components/ingles/marcado";
import { esPendiente, seccionPorSlug, secciones } from "@/content/ingles";

export function generateStaticParams() {
  return secciones.map((s) => ({ seccion: s.slug }));
}

export async function generateMetadata(props: PageProps<"/ingles/[seccion]">): Promise<Metadata> {
  const { seccion: slug } = await props.params;
  const seccion = seccionPorSlug(slug);
  return seccion ? { title: `${seccion.titulo} (inglés)`, description: seccion.resumen } : {};
}

export default function Pagina({ params }: PageProps<"/ingles/[seccion]">) {
  return (
    <Suspense>
      <SeccionIngles params={params} />
    </Suspense>
  );
}

async function SeccionIngles({ params }: Pick<PageProps<"/ingles/[seccion]">, "params">) {
  const { seccion: slug } = await params;
  const seccion = seccionPorSlug(slug);
  if (!seccion) notFound();

  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <Link href="/ingles" className="text-sm text-muted hover:text-accent">
          ← Inglés
        </Link>
        <h1 className="text-3xl font-bold">
          {seccion.titulo} <span className="font-normal text-muted">{seccion.ingles}</span>
        </h1>
        <p className="max-w-3xl text-lg">
          <Marcado>{seccion.resumen}</Marcado>
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        {seccion.temas.map((t) =>
          esPendiente(t) ? (
            <div key={t.slug} className="space-y-1 rounded-xl border border-dashed border-line p-5 opacity-60">
              <span className="text-xs font-medium text-muted">Próximamente</span>
              <h2 className="font-semibold">{t.titulo}</h2>
            </div>
          ) : (
            <Link
              key={t.slug}
              href={`/ingles/${seccion.slug}/${t.slug}`}
              className="space-y-2 rounded-xl border border-line bg-surface p-5 transition-colors hover:border-accent"
            >
              <h2 className="text-lg font-semibold">{t.titulo}</h2>
              <p className="text-sm text-muted">
                <Marcado>{t.resumen}</Marcado>
              </p>
            </Link>
          ),
        )}
      </div>
    </article>
  );
}
