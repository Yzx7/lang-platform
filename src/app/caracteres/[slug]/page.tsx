import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Caracter } from "@/components/caracter";
import { GrillaPalabras } from "@/components/palabra";
import { Texto } from "@/components/texto";
import { familiaPorSlug, familias } from "@/content/familias";

export function generateStaticParams() {
  return familias.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata(props: PageProps<"/caracteres/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const familia = familiaPorSlug(slug);
  return familia ? { title: `Familia ${familia.raiz.h} (${familia.raiz.m})`, description: familia.resumen } : {};
}

export default function Pagina({ params }: PageProps<"/caracteres/[slug]">) {
  return (
    <Suspense>
      <FamiliaCaracter params={params} />
    </Suspense>
  );
}

async function FamiliaCaracter({ params }: Pick<PageProps<"/caracteres/[slug]">, "params">) {
  const { slug } = await params;
  const familia = familiaPorSlug(slug);
  if (!familia) notFound();

  return (
    <article className="space-y-10">
      <header className="space-y-4">
        <Link href="/caracteres" className="text-sm text-muted hover:text-accent">
          ← Caracteres
        </Link>
        <div className="flex flex-wrap items-center gap-6">
          <Caracter c={familia.raiz} tamaño="lg" sinEnlace />
          <div className="max-w-2xl space-y-2">
            <h1 className="text-3xl font-bold">
              Familia <span className="hanzi">{familia.raiz.h}</span>: {familia.raiz.m}
            </h1>
            <p className="text-lg">
              <Texto>{familia.resumen}</Texto>
            </p>
          </div>
        </div>
        <p className="max-w-3xl rounded-xl border border-line bg-surface p-4 text-sm text-muted">
          <strong className="text-ink">Origen:</strong> <Texto>{familia.origen}</Texto>
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Palabras de la familia</h2>
        <p className="text-sm text-muted">
          Los caracteres subrayados tienen su propia familia: haz clic para ir a ella.
        </p>
        <GrillaPalabras palabras={familia.palabras} raiz={familia.raiz.h} />
      </section>

      {familia.nota && (
        <section className="rounded-xl border border-accent/40 bg-accent-soft p-5">
          <h2 className="text-lg font-semibold">⚠️ Ojo</h2>
          <p className="mt-2">
            <Texto>{familia.nota}</Texto>
          </p>
        </section>
      )}
    </article>
  );
}
