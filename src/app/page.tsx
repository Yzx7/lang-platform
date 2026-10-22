import Link from "next/link";
import { PalabraDesglosada } from "@/components/palabra";
import { OracionVista } from "@/components/oracion";
import { familias } from "@/content/familias";
import { puntoPorRuta } from "@/content/gramatica";

export default function Inicio() {
  const diannao = familias[0].palabras[2];
  const ejemplo = puntoPorRuta("estructura", "cadena-de-verbos")!.ejemplos[1];

  return (
    <div className="space-y-16">
      <section className="space-y-5">
        <p className="text-sm font-medium text-accent">Chino mandarín en español · HSK 1</p>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
          Aprende chino entendiendo <span className="text-accent">por qué</span>, no memorizando.
        </h1>
        <p className="max-w-2xl text-lg text-muted">
          Cada palabra se desarma carácter por carácter y cada regla viene con su fórmula, una tabla y oraciones de
          ejemplo. Con eso, la gramática deja de ser una lista de reglas y te ayuda a entender lo que escuchas.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/curso" className="rounded-lg bg-accent px-5 py-2.5 font-medium text-white hover:opacity-90">
            Ver el curso
          </Link>
          <Link
            href="/compuestos"
            className="rounded-lg border border-line px-5 py-2.5 font-medium hover:border-accent hover:text-accent"
          >
            Cómo se arman las palabras
          </Link>
        </div>
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Vocabulario por carácter</h2>
          <p className="text-muted">
            En chino casi todas las palabras se componen de caracteres con significado propio. Si aprendes 电
            (electricidad), ya tienes la mitad de televisión, teléfono, computadora y ascensor.
          </p>
          <PalabraDesglosada p={diannao} />
          <Link href="/caracteres" className="inline-block text-sm font-medium text-accent hover:underline">
            Explorar familias de caracteres →
          </Link>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">2. Gramática con fórmulas</h2>
          <p className="text-muted">
            El verbo nunca se conjuga y el orden manda. Cada patrón se explica desde el español, con los errores que
            solemos cometer los hispanohablantes.
          </p>
          <OracionVista o={ejemplo} />
          <Link href="/gramatica" className="inline-block text-sm font-medium text-accent hover:underline">
            Ver la gramática →
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border border-line bg-surface p-6">
        <h2 className="text-xl font-semibold">Estudia sin muletas</h2>
        <p className="mt-2 text-muted">
          Usa <strong>Ocultar pinyin</strong> u <strong>Ocultar significados</strong> (arriba a la derecha) para
          ponerte a prueba. Pasa el cursor o toca un elemento para revelarlo. Los colores del pinyin indican el tono:{" "}
          <span className="t1 font-medium">1.º</span>, <span className="t2 font-medium">2.º</span>,{" "}
          <span className="t3 font-medium">3.º</span>, <span className="t4 font-medium">4.º</span> y{" "}
          <span className="t0 font-medium">neutro</span>.
        </p>
      </section>
    </div>
  );
}
