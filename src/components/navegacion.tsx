"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ControlesEstudio } from "@/components/controles-estudio";

export type Curso = {
  href: string;
  nombre: string;
  /** Cómo se llama la pronunciación en este idioma, para el botón de ocultarla. */
  pronunciacion: string;
  enlaces: { href: string; texto: string }[];
};

/**
 * Menú del header: dentro de un curso muestra sus secciones y un enlace al
 * otro curso; en la portada, solo los cursos.
 */
export function Navegacion({ cursos }: { cursos: Curso[] }) {
  const ruta = usePathname();
  const dentro = (href: string) => ruta === href || ruta.startsWith(`${href}/`);
  const actual = cursos.find((c) => dentro(c.href));

  if (!actual) {
    return (
      <nav className="flex flex-wrap gap-4 text-sm">
        {cursos.map((c) => (
          <Link key={c.href} href={c.href} className="text-muted hover:text-accent">
            {c.nombre}
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <>
      <nav className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm">
        <Link href={actual.href} className={`font-medium ${ruta === actual.href ? "text-accent" : "hover:text-accent"}`}>
          {actual.nombre}
        </Link>
        {actual.enlaces.map((e) => (
          <Link key={e.href} href={e.href} className={dentro(e.href) ? "text-accent" : "text-muted hover:text-accent"}>
            {e.texto}
          </Link>
        ))}
        {cursos
          .filter((c) => c !== actual)
          .map((c) => (
            <Link key={c.href} href={c.href} className="border-l border-line pl-4 text-muted hover:text-accent">
              {c.nombre}
            </Link>
          ))}
      </nav>
      <div className="ml-auto">
        <ControlesEstudio pronunciacion={actual.pronunciacion} />
      </div>
    </>
  );
}
