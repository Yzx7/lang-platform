import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { Eco, ListaHanzi, TarjetaHanzi } from "@/components/hanzi";
import { Texto } from "@/components/texto";
import { palabrasCon } from "@/content/diccionario";
import { familiaDe } from "@/content/familias";
import {
  contienen,
  ecoDelSonido,
  estructuras,
  hanziDe,
  parecidosA,
  significado,
  tipos,
  todos,
  usanDeSignificado,
  usanDeSonido,
  type Hanzi,
} from "@/content/hanzi";
import { tonoDe } from "@/lib/pinyin";

export function generateStaticParams() {
  return todos.map((e) => ({ c: e.h }));
}

// Según cómo llegue la URL, el carácter puede venir codificado (%E6%99%B4).
const leer = (c: string) => hanziDe(decodeURIComponent(c));

export async function generateMetadata(props: PageProps<"/chino/caracteres/hanzi/[c]">): Promise<Metadata> {
  const e = leer((await props.params).c);
  return e ? { title: `${e.h} (${e.py.join(", ")})`, description: `De qué está hecho ${e.h} y qué caracteres se le parecen.` } : {};
}

export default function Pagina({ params }: PageProps<"/chino/caracteres/hanzi/[c]">) {
  return (
    <Suspense>
      <PaginaHanzi params={params} />
    </Suspense>
  );
}

async function PaginaHanzi({ params }: Pick<PageProps<"/chino/caracteres/hanzi/[c]">, "params">) {
  const e = leer((await params).c);
  if (!e) notFound();

  const py = e.py[0] ?? "";
  const { texto, ingles } = significado(e);
  const tipo = e.tipo ? tipos[e.tipo] : undefined;
  const partes = (e.partes ?? []).map(hanziDe).filter((p) => p !== undefined);
  const sem = e.sem ? hanziDe(e.sem) : undefined;
  const fon = e.fon ? hanziDe(e.fon) : undefined;
  const pyFon = fon?.py[0] ?? "";

  const sonidoHermanos = fon ? usanDeSonido(fon.h).filter((x) => x.h !== e.h) : [];
  const ideaHermanos = sem ? usanDeSignificado(sem.h).filter((x) => x.h !== e.h) : [];
  const daSonido = usanDeSonido(e.h);
  const daIdea = usanDeSignificado(e.h);
  const dentroDe = contienen(e.h).filter((x) => !daSonido.includes(x) && !daIdea.includes(x));
  const parecidos = parecidosA(e.h);
  const palabras = palabrasCon(e.h);
  const familia = familiaDe(e.h);

  // Etiqueta de cuánto se oye el componente de sonido en cada carácter de una lista.
  const ecoCon = (pyComponente: string) =>
    function eco(x: Hanzi) {
      return x.py[0] ? <Eco eco={ecoDelSonido(x.py[0], pyComponente)} /> : null;
    };

  return (
    <article className="space-y-10">
      <header className="space-y-4">
        <Link href="/chino/caracteres" className="text-sm text-muted hover:text-accent">
          ← Caracteres
        </Link>
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex flex-col items-center gap-1">
            <span className={`py text-lg font-medium t${tonoDe(py)}`}>{e.py.join(" · ")}</span>
            <span className={`hanzi text-8xl leading-none t${tonoDe(py)}`}>{e.h}</span>
          </div>
          <div className="max-w-2xl space-y-3">
            <h1 className={`text-3xl font-bold ${ingles ? "italic" : ""}`} lang={ingles ? "en" : undefined}>
              {texto}
            </h1>
            <div className="flex flex-wrap gap-2 text-xs">
              {e.nivel && (
                <span className="rounded bg-accent-soft px-2 py-0.5 font-medium text-accent">
                  HSK {e.nivel === 7 ? "7-9" : e.nivel}
                </span>
              )}
              {tipo && (
                <span className="rounded border border-line px-2 py-0.5 text-muted">
                  {tipo.nombre}: {tipo.idea}
                </span>
              )}
              <span className="rounded border border-line px-2 py-0.5 text-muted">Prototipo</span>
            </div>
            {ingles && (
              <p className="text-sm text-muted">Este carácter todavía no aparece en el sitio: el significado está en inglés.</p>
            )}
          </div>
        </div>
      </header>

      <Seccion titulo="De qué está hecho">
        {partes.length > 0 ? (
          <>
            <ListaHanzi
              lista={partes}
              nota={(p) =>
                p.h === e.sem ? <Rol>significado</Rol> : p.h === e.fon ? <Rol>sonido</Rol> : undefined
              }
            />
            {/* El símbolo ⿰ no lo traen las fuentes comunes: se describe con palabras. */}
            {estructuras[e.ids[0]] && <p className="text-sm text-muted">Estructura: {estructuras[e.ids[0]]}.</p>}
            {sem && fon && (
              <p className="max-w-3xl">
                <span className="hanzi">{sem.h}</span> ({significado(sem).texto}) da el significado y{" "}
                <span className="hanzi">{fon.h}</span> ({pyFon}) da el sonido. <Eco eco={ecoDelSonido(py, pyFon)} />
              </p>
            )}
          </>
        ) : (
          <p className="text-muted">No se descompone en partes más simples: es una pieza básica.</p>
        )}
        {e.pista && (
          <p className="max-w-3xl text-sm text-muted">
            Pista de su origen (en inglés, por traducir):{" "}
            <span lang="en" className="italic">
              {e.pista}
            </span>
          </p>
        )}
      </Seccion>

      {fon && (
        <Seccion
          titulo={<>Suenan parecido: llevan <span className="hanzi">{fon.h}</span></>}
          nota="El componente de sonido ayuda a adivinar cómo se lee un carácter nuevo. A veces el sonido cambió con los siglos y ya no se parece."
        >
          <ListaHanzi lista={[fon, ...sonidoHermanos]} nota={(x) => (x === fon ? <Rol>componente</Rol> : ecoCon(pyFon)(x))} />
        </Seccion>
      )}

      {sem && ideaHermanos.length > 0 && (
        <Seccion
          titulo={<>Misma idea: llevan <span className="hanzi">{sem.h}</span></>}
          nota={`El componente de significado agrupa caracteres por tema: ${sem.h} = ${significado(sem).texto}.`}
        >
          <ListaHanzi lista={ideaHermanos} />
        </Seccion>
      )}

      {daSonido.length > 0 && (
        <Seccion titulo={<>Les da el sonido a</>} nota={`Estos caracteres llevan ${e.h} para indicar cómo se pronuncian.`}>
          <ListaHanzi lista={daSonido} nota={ecoCon(py)} />
        </Seccion>
      )}

      {daIdea.length > 0 && (
        <Seccion titulo="Les da el significado a" nota={`Estos caracteres llevan ${e.h} para indicar de qué tema son.`}>
          <ListaHanzi lista={daIdea} />
        </Seccion>
      )}

      {dentroDe.length > 0 && (
        <Seccion titulo="También aparece dentro de">
          <ListaHanzi lista={dentroDe} />
        </Seccion>
      )}

      {parecidos.length > 0 && (
        <Seccion titulo="No confundir con">
          {parecidos.map((g) => (
            <div key={g.caracteres} className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {[...g.caracteres].map((c) => {
                  const x = hanziDe(c)!;
                  return c === e.h ? null : <TarjetaHanzi key={c} e={x} />;
                })}
              </div>
              <p className="max-w-3xl text-sm text-muted">💡 {g.pista}</p>
            </div>
          ))}
        </Seccion>
      )}

      {(palabras.length > 0 || familia) && (
        <Seccion titulo="Palabras del sitio que lo usan">
          {palabras.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {palabras.slice(0, 16).map((p) => {
                const hanzi = p.chars.map((c) => c.h).join("");
                return (
                  <li key={hanzi} className="rounded-lg border border-line bg-surface px-3 py-1.5">
                    <span className="hanzi text-lg">
                      <Texto>{hanzi}</Texto>
                    </span>{" "}
                    <span className="text-sm text-muted">{p.es}</span>
                  </li>
                );
              })}
            </ul>
          )}
          {familia && (
            <Link href={`/chino/caracteres/${familia.slug}`} className="inline-block text-sm text-accent hover:underline">
              Ver la familia completa de <span className="hanzi">{e.h}</span> →
            </Link>
          )}
        </Seccion>
      )}

      <p className="border-t border-line pt-6 text-xs text-muted">
        Descomposición y etimología:{" "}
        <a href="https://github.com/skishore/makemeahanzi" className="underline hover:text-accent">
          Make Me a Hanzi
        </a>{" "}
        (LGPL). Niveles: HSK 3.0.
      </p>
    </article>
  );
}

function Seccion({ titulo, nota, children }: { titulo: ReactNode; nota?: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold">{titulo}</h2>
      {nota && <p className="max-w-3xl text-sm text-muted">{nota}</p>}
      {children}
    </section>
  );
}

function Rol({ children }: { children: ReactNode }) {
  return <span className="rounded bg-accent-soft px-1.5 text-[10px] font-medium text-accent">{children}</span>;
}
