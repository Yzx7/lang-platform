import Link from "next/link";
import { glosar } from "@/content/diccionario";
import { hanziDe } from "@/content/hanzi";
import type { Palabra } from "@/content/tipos";
import { Caracter } from "./caracter";
import { Emergente } from "./emergente";
import { rutaHanzi } from "./hanzi";

/**
 * Texto en español con chino intercalado. Cada palabra china muestra, al pasar
 * el cursor (o al tocarla en el celular), su pinyin y el significado de cada carácter.
 * No usarlo dentro de un enlace: la ventanita también tiene enlaces.
 */
export function Texto({ children }: { children: string }) {
  return glosar(children).map((seg, i) =>
    typeof seg === "string" ? (
      seg
    ) : (
      // Va inline (no inline-block) para que el tachado de los errores siga llegando a los caracteres.
      <Emergente
        key={i}
        className="cursor-help underline decoration-muted/40 decoration-dotted underline-offset-4"
        contenido={<Desglose opciones={seg.opciones} />}
      >
        {seg.hanzi}
      </Emergente>
    ),
  );
}

/** Contenido de la ventanita: cada lectura de la palabra, carácter por carácter. */
export function Desglose({ opciones }: { opciones: Palabra[] }) {
  return (
    <span className="glosa flex flex-col divide-y divide-line rounded-lg border border-line bg-surface px-2 shadow-lg">
      {opciones.map((p, i) => (
        <span key={i} className="flex flex-col items-center gap-1 py-2">
          <span className="flex">
            {p.chars.map((c, j) => (
              <Caracter key={j} c={c} tamaño="sm" />
            ))}
          </span>
          {p.chars.length > 1 && <span className="es text-xs text-muted">{p.es}</span>}
          <Piezas p={p} />
        </span>
      ))}
    </span>
  );
}

/** De qué está hecho cada carácter, en una línea: 晴 = 日 + 青. Enlaza a la página del carácter. */
function Piezas({ p }: { p: Palabra }) {
  const conPartes = p.chars.flatMap((c) => {
    const partes = hanziDe(c.h)?.partes;
    return partes ? [{ h: c.h, partes }] : [];
  });
  if (!conPartes.length) return null;
  return (
    <span className="flex flex-col items-center text-xs text-muted">
      {conPartes.map((e, i) => (
        <Link key={i} href={rutaHanzi(e.h)} className="hanzi hover:text-accent">
          {e.h} = {e.partes.join(" + ")}
        </Link>
      ))}
    </span>
  );
}
