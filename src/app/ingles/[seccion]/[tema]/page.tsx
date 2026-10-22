import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Bloques } from "@/components/ingles/bloques";
import { Leyenda, Marcado } from "@/components/ingles/marcado";
import { escritos, seccionPorSlug, temaPorRuta } from "@/content/ingles";

export function generateStaticParams() {
  return escritos.map(({ seccion, tema }) => ({ seccion: seccion.slug, tema: tema.slug }));
}

export async function generateMetadata(props: PageProps<"/ingles/[seccion]/[tema]">): Promise<Metadata> {
  const { seccion, tema } = await props.params;
  const t = temaPorRuta(seccion, tema);
  return t ? { title: `${t.titulo} (inglés)`, description: t.resumen.replace(/\{\w+:([^}]+)\}|\*\*/g, "$1") } : {};
}

export default function Pagina({ params }: PageProps<"/ingles/[seccion]/[tema]">) {
  return (
    <Suspense>
      <TemaIngles params={params} />
    </Suspense>
  );
}

async function TemaIngles({ params }: Pick<PageProps<"/ingles/[seccion]/[tema]">, "params">) {
  const { seccion: slugSeccion, tema: slugTema } = await params;
  const seccion = seccionPorSlug(slugSeccion);
  const tema = temaPorRuta(slugSeccion, slugTema);
  if (!seccion || !tema) notFound();

  const i = escritos.findIndex((e) => e.tema === tema);
  const anterior = escritos[i - 1];
  const siguiente = escritos[i + 1];
  // La leyenda de colores solo hace falta donde hay verbos marcados.
  const conColores = JSON.stringify(tema.bloques).match(/\{(be|have|will|do|modal|neg):/);

  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <nav className="flex flex-wrap gap-2 text-sm text-muted">
          <Link href="/ingles" className="hover:text-accent">
            Inglés
          </Link>
          <span>/</span>
          <Link href={`/ingles/${seccion.slug}`} className="hover:text-accent">
            {seccion.titulo}
          </Link>
        </nav>
        <h1 className="text-3xl font-bold">{tema.titulo}</h1>
        <p className="max-w-3xl text-lg">
          <Marcado>{tema.resumen}</Marcado>
        </p>
        {conColores && <Leyenda />}
      </header>

      <Bloques bloques={tema.bloques} />

      {tema.relacionados && (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Relacionados</h2>
          <div className="flex flex-wrap gap-3">
            {tema.relacionados.map((ruta) => {
              const [s, t] = ruta.split("/");
              const rel = temaPorRuta(s, t);
              return (
                rel && (
                  <Link
                    key={ruta}
                    href={`/ingles/${ruta}`}
                    className="rounded-lg border border-line px-4 py-2 text-sm hover:border-accent hover:text-accent"
                  >
                    {rel.titulo}
                  </Link>
                )
              );
            })}
          </div>
        </section>
      )}

      <nav className="flex flex-wrap justify-between gap-3 border-t border-line pt-6 text-sm">
        {anterior ? (
          <Link href={`/ingles/${anterior.seccion.slug}/${anterior.tema.slug}`} className="hover:text-accent">
            ← {anterior.tema.titulo}
          </Link>
        ) : (
          <span />
        )}
        {siguiente && (
          <Link href={`/ingles/${siguiente.seccion.slug}/${siguiente.tema.slug}`} className="hover:text-accent">
            {siguiente.tema.titulo} →
          </Link>
        )}
      </nav>
    </article>
  );
}
