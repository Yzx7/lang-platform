import type { PuntoGramatical } from "@/content/gramatica";
import { Texto } from "./texto";

/** La fórmula del patrón como bloques de colores, con un ejemplo en cada hueco. */
export function Formula({ formula }: { formula: NonNullable<PuntoGramatical["formula"]> }) {
  return (
    <div className="flex flex-wrap items-stretch gap-2">
      {formula.map((slot, i) => (
        <div key={i} className="flex items-center gap-2">
          {i > 0 && <span className="text-muted">+</span>}
          <div
            className="flex min-w-20 flex-col items-center gap-1 rounded-lg px-3 py-2"
            style={{ background: `var(--r-${slot.rol})` }}
          >
            <span className="text-xs font-semibold uppercase tracking-wide">
              <Texto>{slot.etiqueta}</Texto>
            </span>
            <span className="hanzi text-2xl">
              <Texto>{slot.ejemplo}</Texto>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
