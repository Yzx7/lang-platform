import type { Bloque, Ejemplo } from "@/content/ingles/tipos";
import { Marcado } from "./marcado";

/** «inglés // español»: el inglés con su marcado y la traducción en gris (se oculta en modo estudio). */
function Linea({ texto }: { texto: string }) {
  const [en, es] = texto.split(" // ");
  return (
    <span className="revela block">
      <Marcado>{en}</Marcado>
      {es && (
        <span className="es block text-sm text-muted">
          <Marcado>{es}</Marcado>
        </span>
      )}
    </span>
  );
}

function Celda({ texto }: { texto: string }) {
  return (
    <span className="flex flex-col gap-1.5">
      {texto.split("\n").map((l, i) => (
        <Linea key={i} texto={l} />
      ))}
    </span>
  );
}

const SIGNO: Record<NonNullable<Ejemplo["tipo"]>, { texto: string; clase: string; titulo: string }> = {
  "+": { texto: "＋", clase: "text-[var(--m-verbo)]", titulo: "Afirmativa" },
  "-": { texto: "−", clase: "text-[var(--m-neg)]", titulo: "Negativa" },
  "?": { texto: "?", clase: "text-[var(--m-modal)]", titulo: "Pregunta" },
};

export function Bloques({ bloques }: { bloques: Bloque[] }) {
  return bloques.map((b, i) => (
    <section key={i} className="space-y-3">
      {"titulo" in b && b.titulo && b.tipo !== "nota" && <h2 className="text-xl font-semibold">{b.titulo}</h2>}
      <BloqueVista b={b} />
    </section>
  ));
}

function BloqueVista({ b }: { b: Bloque }) {
  switch (b.tipo) {
    case "texto":
      return (
        <div className="max-w-3xl space-y-3">
          {b.parrafos.map((p, i) => (
            <p key={i} className="leading-relaxed">
              <Marcado>{p}</Marcado>
            </p>
          ))}
        </div>
      );

    // El formato de los apuntes: palabra (pronunciación) // traducción.
    case "vocab":
      return (
        <ul className="grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
          {b.items.map((v) => (
            <li key={v.en} className="revela">
              <strong>
                <Marcado>{v.en}</Marcado>
              </strong>
              {v.pron && <span className="py text-[var(--m-will)]"> ({v.pron})</span>}
              <span className="es text-muted">{" // "}{v.es}</span>
            </li>
          ))}
        </ul>
      );

    case "tabla":
      return (
        <div className="space-y-2">
          <div className="overflow-x-auto rounded-xl border border-line">
            <table className="w-full border-collapse bg-surface text-left">
              <thead>
                <tr className="border-b border-line">
                  {b.columnas.map((c, i) => (
                    <th key={i} className="px-4 py-2 align-bottom text-sm">
                      {c.split("\n").map((l, j) => (
                        <span key={j} className={j === 0 ? "block font-semibold" : "block font-normal text-[var(--m-modal)]"}>
                          {l}
                        </span>
                      ))}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.filas.map((fila, i) => (
                  <tr key={i} className="border-b border-line align-top last:border-0">
                    {fila.map((celda, j) => (
                      <td key={j} className={`px-4 py-3 ${j === 0 ? "whitespace-nowrap font-semibold" : ""}`}>
                        <Celda texto={celda} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {b.pie && (
            <p className="text-sm text-muted">
              <Marcado>{b.pie}</Marcado>
            </p>
          )}
        </div>
      );

    case "ejemplos":
      return (
        <div className="space-y-2">
          {b.items.map((e, i) => (
            <div key={i} className="revela flex gap-3 rounded-xl border border-line bg-surface px-4 py-3">
              {e.tipo && (
                <span className={`w-5 shrink-0 text-lg font-bold ${SIGNO[e.tipo].clase}`} title={SIGNO[e.tipo].titulo}>
                  {SIGNO[e.tipo].texto}
                </span>
              )}
              <div>
                <p className="text-lg">
                  <Marcado>{e.en}</Marcado>
                </p>
                <p className="es text-muted">
                  <Marcado>{e.es}</Marcado>
                </p>
                {e.nota && <p className="mt-1 text-sm text-muted">💡 {e.nota}</p>}
              </div>
            </div>
          ))}
        </div>
      );

    // La tabla de los apuntes: piezas para armar cada forma, con celdas que abarcan varios sujetos.
    case "constructor":
      return (
        <div className="space-y-2">
          <div className="overflow-x-auto rounded-xl border border-line">
            <table className="w-full border-collapse bg-surface text-center">
              <thead>
                <tr className="border-b border-line">
                  <th className="w-32 px-4 py-3">
                    <Marcado>{"{suj}"}</Marcado>
                  </th>
                  {b.columnas.map((c) => (
                    <th key={c.titulo} className="border-l border-line px-4 py-3 align-bottom">
                      <span className="block font-semibold">{c.titulo}</span>
                      <span className="block text-sm font-normal text-[var(--m-modal)]">({c.es})</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.filas.map((f, i) => (
                  <tr key={i} className="border-b border-line">
                    <td className="px-4 py-3 text-left align-middle">
                      <ul className="list-inside list-disc text-[var(--m-suj)] marker:text-[var(--m-suj)]">
                        {f.sujetos.map((s) => (
                          <li key={s} className="font-medium">
                            {s}
                          </li>
                        ))}
                      </ul>
                    </td>
                    {f.celdas.map(
                      (c, j) =>
                        c && (
                          <td key={j} rowSpan={c.filas} className="border-l border-line px-4 py-3 align-middle">
                            <div className="flex items-center justify-center gap-4">
                              <div className="space-y-0.5">
                                {c.piezas.map((p, k) => (
                                  <p key={k} className="font-semibold">
                                    <Marcado>{p}</Marcado>
                                  </p>
                                ))}
                                {c.ejemplo && (
                                  <p className="mt-1 inline-block rounded-full bg-line/60 px-2 text-xs text-muted">
                                    <Marcado>{c.ejemplo}</Marcado>
                                  </p>
                                )}
                              </div>
                              {c.lista && (
                                <ul className="list-inside list-disc text-left text-sm">
                                  {c.lista.map((v) => (
                                    <li key={v}>
                                      <Marcado>{v}</Marcado>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </td>
                        ),
                    )}
                  </tr>
                ))}
                {b.preguntas && (
                  <tr>
                    <td className="px-4 py-3 text-left align-middle text-sm text-muted">Preguntas</td>
                    {b.preguntas.map((p, j) => (
                      <td key={j} className="border-l border-line px-4 py-3 align-top">
                        <p className="text-lg">
                          <Marcado>{p.formula}</Marcado>
                        </p>
                        <ul className="mt-1 space-y-0.5 text-sm text-muted">
                          {p.ejemplos.map((e) => (
                            <li key={e}>
                              <Marcado>{e}</Marcado>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {b.pie?.map((p, i) => (
            <p key={i} className="text-sm text-muted">
              <Marcado>{p}</Marcado>
            </p>
          ))}
        </div>
      );

    case "nota":
      return (
        <div className="space-y-2 rounded-xl border border-accent/40 bg-accent-soft p-5">
          <h2 className="text-lg font-semibold">{b.titulo}</h2>
          <ul className="list-disc space-y-2 pl-5">
            {b.items.map((t, i) => (
              <li key={i}>
                <Marcado>{t}</Marcado>
              </li>
            ))}
          </ul>
        </div>
      );
  }
}
