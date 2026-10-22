import type { Metadata } from "next";
import Link from "next/link";
import { libros } from "@/content/biblioteca/libros";

export const metadata: Metadata = { title: "Biblioteca HSK" };

const ICONO = { "Libro de texto": "📘", "Cuaderno de ejercicios": "📝", Escritura: "✍️", Vocabulario: "📋" };

export default function Biblioteca() {
  const niveles = [...new Set(libros.map((l) => l.nivel))];

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">Biblioteca HSK</h1>
        <p className="max-w-2xl text-muted">
          Los libros del HSK Standard Course (nueva edición) con sus audios sobre la página: toca ▶ junto a cada ícono
          de parlante para escuchar la pista. En cualquier libro puedes escribir encima con la tableta.
        </p>
        <p className="max-w-2xl text-sm text-muted">
          Material con derechos de autor: solo está en tu computadora (carpeta <code>HSK/</code>, fuera de git).
        </p>
      </header>

      {niveles.map((nivel) => (
        <section key={nivel} className="space-y-3">
          <h2 className="text-xl font-semibold">{nivel}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {libros
              .filter((l) => l.nivel === nivel)
              .map((l) => {
                const ubicadas = l.pistas?.filter((p) => p.pagina).length ?? 0;
                return (
                  <Link
                    key={l.slug}
                    href={`/biblioteca/${l.slug}`}
                    className="space-y-1 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-accent"
                  >
                    <p className="text-2xl">{ICONO[l.tipo]}</p>
                    <p className="font-semibold">
                      {l.tipo}
                      {/^hsk4[ab]/.test(l.slug) && ` ${l.slug[4].toUpperCase()}`}
                    </p>
                    <p className="text-xs text-muted">
                      {l.pistas
                        ? `🔈 ${l.pistas.length} audios · ${ubicadas} ubicados en la página`
                        : l.tipo === "Libro de texto"
                          ? "Sin audios"
                          : l.archivo}
                    </p>
                  </Link>
                );
              })}
          </div>
        </section>
      ))}
    </div>
  );
}
