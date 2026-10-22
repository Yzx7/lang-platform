import type { ReactNode } from "react";

const PIEZA = /\*\*(.+?)\*\*|\{(be|have|will|do|modal|neg|fin|v):([^}]+)\}|\{(suj|v|be|have|will|modal)\}/g;

/** Clases de cada pieza: el mismo color en todas las tablas y ejemplos (los de los apuntes). */
const CLASE: Record<string, string> = {
  be: "font-semibold text-[var(--m-be)]",
  have: "font-semibold text-[var(--m-have)]",
  will: "font-semibold text-[var(--m-will)]",
  do: "font-bold",
  modal: "font-semibold text-[var(--m-modal)]",
  neg: "font-semibold text-[var(--m-neg)]",
  fin: "rounded bg-[var(--m-fin-bg)] px-0.5 font-semibold text-[var(--m-fin)]",
  // Verbo con terminación dentro de una fórmula: la píldora verde de los apuntes.
  v: "inline-block rounded-full bg-[var(--m-verbo)] px-2 align-middle text-sm font-semibold leading-5 text-[var(--bg)]",
};

/** Círculos de las fórmulas: una pieza sin texto, solo su color. */
const CIRCULO: Record<string, string> = {
  suj: "bg-[var(--m-suj)]",
  v: "bg-[var(--m-verbo)]",
  be: "bg-[var(--m-be)]",
  have: "bg-[var(--m-have)]",
  will: "bg-[var(--m-will)]",
  modal: "bg-[var(--m-modal)]",
};

const NOMBRE: Record<string, string> = {
  suj: "sujeto",
  v: "verbo",
  be: "to be",
  have: "have",
  will: "will",
  modal: "modal",
};

/** Texto con el marcado de content/ingles/tipos.ts convertido en piezas de color. */
export function Marcado({ children }: { children: string }) {
  const partes: ReactNode[] = [];
  let ultimo = 0;
  for (const m of children.matchAll(PIEZA)) {
    if (m.index > ultimo) partes.push(children.slice(ultimo, m.index));
    if (m[1] !== undefined) partes.push(<strong key={m.index}>{m[1]}</strong>);
    else if (m[4] !== undefined)
      partes.push(
        <span
          key={m.index}
          title={NOMBRE[m[4]]}
          className={`mx-0.5 inline-block size-4 rounded-full align-middle ${CIRCULO[m[4]]}`}
        />,
      );
    else
      partes.push(
        <span key={m.index} className={CLASE[m[2]]}>
          {m[3]}
        </span>,
      );
    ultimo = m.index + m[0].length;
  }
  if (ultimo < children.length) partes.push(children.slice(ultimo));
  return partes;
}

/** Leyenda de colores, para mostrar arriba de las tablas de verbos. */
export function Leyenda() {
  const piezas: [string, string][] = [
    ["{suj}", "sujeto"],
    ["{be:be}", "to be"],
    ["{have:have}", "have"],
    ["{do:do}", "do"],
    ["{will:will}", "will"],
    ["{modal:can}", "modal"],
    ["{neg:not}", "negación"],
    ["play{fin:ing}", "terminación"],
  ];
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 rounded-lg border border-line bg-surface px-3 py-2 text-sm">
      {piezas.map(([m, texto]) => (
        <span key={texto} className="text-muted">
          <Marcado>{m}</Marcado> {texto}
        </span>
      ))}
    </div>
  );
}
