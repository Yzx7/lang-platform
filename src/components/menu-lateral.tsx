"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type EnlaceMenu = { href: string; texto: string; hanzi?: string };
export type GrupoMenu = { titulo?: string; href?: string; enlaces: EnlaceMenu[] };

/**
 * Índice de las páginas de una parte del sitio. En pantallas anchas va como
 * columna fija a la izquierda; en el celular, como un desplegable arriba del contenido.
 */
export function MenuLateral({ titulo, href, grupos }: { titulo: string; href: string; grupos: GrupoMenu[] }) {
  const ruta = usePathname();

  const indice = (
    <nav className="space-y-4 text-sm">
      <Link href={href} className={`block font-semibold ${ruta === href ? "text-accent" : "hover:text-accent"}`}>
        {titulo}
      </Link>
      {grupos.map((g, i) => (
        <Grupo key={g.href ?? i} grupo={g} ruta={ruta} />
      ))}
    </nav>
  );

  return (
    <>
      {/* key: al cambiar de página el desplegable se cierra solo. */}
      <details key={ruta} className="mb-6 rounded-xl border border-line bg-surface lg:hidden">
        <summary className="cursor-pointer px-4 py-3 text-sm font-medium">Índice de {titulo.toLowerCase()}</summary>
        <div className="border-t border-line px-4 py-3">{indice}</div>
      </details>
      <aside className="hidden lg:block">
        <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pb-6 pr-2">{indice}</div>
      </aside>
    </>
  );
}

function Grupo({ grupo, ruta }: { grupo: GrupoMenu; ruta: string }) {
  const lista = (
    <ul className="space-y-0.5 border-l border-line">
      {grupo.enlaces.map((e) => (
        <li key={e.href}>
          <Opcion {...e} activo={ruta === e.href} />
        </li>
      ))}
    </ul>
  );
  if (!grupo.titulo) return lista;

  const dentro = !!grupo.href && (ruta === grupo.href || ruta.startsWith(`${grupo.href}/`));
  return (
    <details open={dentro} className="group">
      <summary className="flex cursor-pointer list-none items-baseline gap-2 py-1 [&::-webkit-details-marker]:hidden">
        <span className="text-muted transition-transform group-open:rotate-90">›</span>
        {grupo.href ? (
          <Link
            href={grupo.href}
            className={`font-medium ${ruta === grupo.href ? "text-accent" : "hover:text-accent"}`}
          >
            {grupo.titulo}
          </Link>
        ) : (
          <span className="font-medium">{grupo.titulo}</span>
        )}
      </summary>
      <div className="ml-1 mt-1">{lista}</div>
    </details>
  );
}

function Opcion({ href, texto, hanzi, activo }: EnlaceMenu & { activo: boolean }) {
  return (
    <Link
      href={href}
      aria-current={activo ? "page" : undefined}
      className={`-ml-px flex items-baseline gap-2 border-l py-1 pl-3 ${
        activo ? "border-accent font-medium text-accent" : "border-transparent text-muted hover:border-muted hover:text-ink"
      }`}
    >
      {hanzi && <span className="hanzi text-ink">{hanzi}</span>}
      {texto}
    </Link>
  );
}
