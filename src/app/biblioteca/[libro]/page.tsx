import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { VisorCliente } from "@/components/biblioteca/visor-cliente";
import { libroPorSlug, libros, tituloDe } from "@/content/biblioteca/libros";

export function generateStaticParams() {
  return libros.map((l) => ({ libro: l.slug }));
}

export async function generateMetadata(props: PageProps<"/biblioteca/[libro]">): Promise<Metadata> {
  const { libro: slug } = await props.params;
  const libro = libroPorSlug(slug);
  return libro ? { title: tituloDe(libro) } : {};
}

export default function Pagina({ params }: PageProps<"/biblioteca/[libro]">) {
  return (
    <Suspense>
      <LibroHsk params={params} />
    </Suspense>
  );
}

async function LibroHsk({ params }: Pick<PageProps<"/biblioteca/[libro]">, "params">) {
  const { libro: slug } = await params;
  const libro = libroPorSlug(slug);
  if (!libro) notFound();

  return (
    // data-ancho-completo hace que el layout suelte el ancho máximo: el visor usa toda la pantalla.
    <div data-ancho-completo className="space-y-4">
      <Link href="/biblioteca" className="text-sm text-muted hover:text-accent">
        ← Biblioteca
      </Link>
      <h1 className="text-2xl font-bold">{tituloDe(libro)}</h1>
      <VisorCliente libro={libro} />
    </div>
  );
}
