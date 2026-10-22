import { Suspense, type ReactNode } from "react";

/**
 * Contenido con el índice de su sección al costado. data-con-menu hace que el
 * layout raíz ensanche el <main> para que quepan las dos columnas.
 */
export function ConMenu({ menu, children }: { menu: ReactNode; children: ReactNode }) {
  return (
    <div data-con-menu className="lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10">
      {/* El menú lee la ruta actual; Suspense evita que eso frene el prerender del resto. */}
      <Suspense>{menu}</Suspense>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
