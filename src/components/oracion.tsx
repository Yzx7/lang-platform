import type { Oracion } from "@/content/tipos";
import { Caracter } from "./caracter";
import { Emergente } from "./emergente";
import { Desglose, Texto } from "./texto";

// Los mismos signos y colores que los ejemplos de inglés.
const SIGNO = {
  "+": { texto: "＋", clase: "text-[var(--m-verbo)]", titulo: "Afirmativa" },
  "-": { texto: "−", clase: "text-[var(--m-neg)]", titulo: "Negativa" },
  "?": { texto: "?", clase: "text-[var(--m-modal)]", titulo: "Pregunta" },
};

/** Oración con cada palabra desglosada: pinyin arriba, hanzi y glosa de la palabra debajo. */
export function OracionVista({ o }: { o: Oracion }) {
  return (
    <div className="revela rounded-xl border border-line bg-surface p-4">
      <div className="flex flex-wrap items-end gap-x-3 gap-y-4">
        {o.tipo && (
          <span className={`w-5 self-center pb-6 text-xl font-bold ${SIGNO[o.tipo].clase}`} title={SIGNO[o.tipo].titulo}>
            {SIGNO[o.tipo].texto}
          </span>
        )}
        {o.tokens.map((t, i) =>
          typeof t === "string" ? (
            <span key={i} className="hanzi pb-6 text-2xl text-muted">
              {t}
            </span>
          ) : (
            // Al pasar el cursor, la misma ventanita de <Texto>: el significado de cada carácter.
            // Sin enlaces aquí: los de las familias están dentro de la ventanita.
            <Emergente
              key={i}
              className="flex cursor-help flex-col items-center gap-1 rounded-md px-0.5 hover:bg-accent-soft focus-visible:bg-accent-soft"
              contenido={<Desglose opciones={[t]} />}
            >
              <span className="flex">
                {t.chars.map((c, j) => (
                  <Caracter key={j} c={c} tamaño="sm" sinSignificado sinEnlace />
                ))}
              </span>
              <span className="es max-w-28 text-center text-[11px] leading-tight text-muted">{t.es}</span>
            </Emergente>
          ),
        )}
      </div>
      <div className="es mt-4 space-y-1 border-t border-line pt-3">
        {o.lit && <p className="text-sm text-muted">Literal: <Texto>{o.lit}</Texto></p>}
        <p className="font-medium">{o.es}</p>
        {o.nota && <p className="text-sm text-muted">💡 <Texto>{o.nota}</Texto></p>}
      </div>
    </div>
  );
}
