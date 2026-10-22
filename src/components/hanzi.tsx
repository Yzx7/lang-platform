import Link from "next/link";
import type { ReactNode } from "react";
import { significado, type Hanzi } from "@/content/hanzi";
import { tonoDe } from "@/lib/pinyin";

export const rutaHanzi = (h: string) => `/caracteres/hanzi/${h}`;

/** Un carácter que enlaza a su página: pinyin, hanzi y significado. */
export function TarjetaHanzi({ e, nota }: { e: Hanzi; nota?: ReactNode }) {
  const py = e.py[0] ?? "";
  const { texto, ingles } = significado(e);
  return (
    <Link
      href={rutaHanzi(e.h)}
      className="revela flex w-24 flex-col items-center gap-1 rounded-lg border border-line bg-surface px-1 py-2 transition-colors hover:border-accent"
    >
      <span className={`py text-xs font-medium t${tonoDe(py)}`}>{py || " "}</span>
      <span className={`hanzi text-3xl leading-none t${tonoDe(py)}`}>{e.h}</span>
      <span
        lang={ingles ? "en" : undefined}
        className={`es line-clamp-2 text-center text-[11px] leading-tight text-muted ${ingles ? "italic" : ""}`}
      >
        {texto}
      </span>
      {nota}
    </Link>
  );
}

/** Varios caracteres en fila; si son muchos, muestra los primeros y cuenta el resto. */
export function ListaHanzi({
  lista,
  max = 16,
  nota,
}: {
  lista: Hanzi[];
  max?: number;
  nota?: (e: Hanzi) => ReactNode;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {lista.slice(0, max).map((e) => (
        <TarjetaHanzi key={e.h} e={e} nota={nota?.(e)} />
      ))}
      {lista.length > max && <span className="self-center px-2 text-sm text-muted">y {lista.length - max} más</span>}
    </div>
  );
}

const ecos = {
  igual: { texto: "suena igual", clase: "bg-[var(--r-lugar)]" },
  "otro tono": { texto: "otro tono", clase: "bg-[var(--r-lugar)]" },
  rima: { texto: "rima", clase: "bg-[var(--r-tiempo)]" },
  distinto: { texto: "ya no suena", clase: "bg-[var(--r-verbo)]" },
};

/** Etiqueta de qué tanto se oye el componente de sonido. */
export function Eco({ eco }: { eco: keyof typeof ecos }) {
  return <span className={`rounded px-1.5 text-[10px] font-medium ${ecos[eco].clase}`}>{ecos[eco].texto}</span>;
}
