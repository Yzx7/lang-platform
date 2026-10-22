import type { Palabra } from "@/content/tipos";
import { Caracter } from "./caracter";
import { Texto } from "./texto";

/** Tarjeta de vocabulario: cada carácter con su significado, y luego la palabra completa. */
export function PalabraDesglosada({ p, raiz }: { p: Palabra; raiz?: string }) {
  return (
    <div className="revela flex flex-col gap-3 rounded-xl border border-line bg-surface p-4">
      <div className="flex items-start gap-1">
        {p.chars.map((c, i) => (
          <span key={i} className="flex items-start gap-1">
            {i > 0 && <span className="mt-9 text-muted">+</span>}
            <Caracter c={c} sinEnlace={c.h === raiz} />
          </span>
        ))}
      </div>
      <div className="es space-y-1 border-t border-line pt-3">
        <p className="font-semibold">= <Texto>{p.es}</Texto></p>
        {p.lit && <p className="text-sm text-muted">Literal: «<Texto>{p.lit}</Texto>»</p>}
        {p.nota && <p className="text-sm text-muted">
            <Texto>{p.nota}</Texto>
          </p>}
      </div>
    </div>
  );
}

export function GrillaPalabras({ palabras, raiz }: { palabras: Palabra[]; raiz?: string }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {palabras.map((p) => (
        <PalabraDesglosada key={p.chars.map((c) => c.h).join("")} p={p} raiz={raiz} />
      ))}
    </div>
  );
}
