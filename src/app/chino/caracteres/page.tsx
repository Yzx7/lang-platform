import type { Metadata } from "next";
import Link from "next/link";
import { Caracter } from "@/components/caracter";
import { Eco, ListaHanzi, rutaHanzi } from "@/components/hanzi";
import { familias } from "@/content/familias";
import { ecoDelSonido, familiasDeSonido, significado } from "@/content/hanzi";
import { tonoDe } from "@/lib/pinyin";

export const metadata: Metadata = { title: "Caracteres" };

export default function Caracteres() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">Familias de caracteres</h1>
        <p className="max-w-2xl text-muted">
          Aprende un carácter y desbloqueas todas las palabras que lo usan. Cada carácter funciona como una raíz: es
          lo más parecido que tiene el chino a los cognados.
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2">
        {familias.map((f) => (
          <Link
            key={f.slug}
            href={`/chino/caracteres/${f.slug}`}
            className="flex gap-5 rounded-xl border border-line bg-surface p-5 transition-colors hover:border-accent"
          >
            <Caracter c={f.raiz} tamaño="lg" sinEnlace />
            <span className="space-y-2">
              <span className="block text-sm text-muted">{f.palabras.length} palabras</span>
              <span className="hanzi block text-lg">
                {f.palabras.map((p) => p.chars.map((c) => c.h).join("")).join(" · ")}
              </span>
              <span className="block text-sm text-muted">{f.resumen}</span>
            </span>
          </Link>
        ))}
      </div>

      <section id="sonido" className="space-y-4 pt-4">
        <header className="space-y-2">
          <h2 className="text-2xl font-bold">Familias de sonido</h2>
          <p className="max-w-2xl text-muted">
            La mayoría de los caracteres tiene una parte que da el significado y otra que da el sonido. Aprende la
            parte del sonido y puedes adivinar cómo se lee un carácter que nunca viste. No siempre funciona: el chino
            cambió en tres mil años y a veces solo rima, o ya no se parece.
          </p>
        </header>
        <div className="grid gap-4 xl:grid-cols-2">
          {familiasDeSonido(12).map(({ fon, lista }) => {
            const py = fon.py[0] ?? "";
            return (
              <div key={fon.h} className="space-y-3 rounded-xl border border-line bg-surface p-4">
                <Link href={rutaHanzi(fon.h)} className="flex items-baseline gap-3 hover:text-accent">
                  <span className={`hanzi text-4xl t${tonoDe(py)}`}>{fon.h}</span>
                  <span className={`py font-medium t${tonoDe(py)}`}>{py}</span>
                  <span className="es text-sm text-muted">{significado(fon).texto}</span>
                </Link>
                <ListaHanzi
                  lista={lista}
                  max={8}
                  nota={(x) => x.py[0] && <Eco eco={ecoDelSonido(x.py[0], py)} />}
                />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
