import Link from "next/link";
import { familiaDe } from "@/content/familias";
import type { Morfema } from "@/content/tipos";
import { tonoDe } from "@/lib/pinyin";

const tamaños = {
  sm: { hanzi: "text-2xl", py: "text-xs", m: "text-[11px]" },
  md: { hanzi: "text-4xl", py: "text-sm", m: "text-xs" },
  lg: { hanzi: "text-6xl", py: "text-base", m: "text-sm" },
};

/**
 * Un carácter en columna: pinyin (coloreado por tono), hanzi y su significado.
 * Si el carácter tiene familia propia, enlaza a ella.
 */
export function Caracter({
  c,
  tamaño = "md",
  sinSignificado = false,
  sinEnlace = false,
}: {
  c: Morfema;
  tamaño?: keyof typeof tamaños;
  sinSignificado?: boolean;
  sinEnlace?: boolean;
}) {
  const t = tamaños[tamaño];
  const familia = sinEnlace ? undefined : familiaDe(c.h);
  const hanzi = (
    <span className={`hanzi ${t.hanzi} leading-none t${tonoDe(c.p)}`}>{c.h}</span>
  );

  return (
    <span className="revela inline-flex flex-col items-center gap-1 px-0.5">
      <span className={`py ${t.py} t${tonoDe(c.p)} font-medium`}>{c.p}</span>
      {familia ? (
        <Link
          href={`/chino/caracteres/${familia.slug}`}
          className="inline-block rounded leading-none underline decoration-dotted decoration-2 underline-offset-8 hover:bg-accent-soft"
          title={`Ver la familia de ${c.h}`}
        >
          {hanzi}
        </Link>
      ) : (
        hanzi
      )}
      {!sinSignificado && (
        <span className={`es ${t.m} max-w-24 text-center leading-tight text-muted`}>{c.m}</span>
      )}
    </span>
  );
}
