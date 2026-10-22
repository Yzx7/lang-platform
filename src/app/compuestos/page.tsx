import type { Metadata } from "next";
import { GrillaPalabras } from "@/components/palabra";
import { Texto } from "@/components/texto";
import { excepcionesFoneticas, marcas, masEjemplos, tiposCompuesto } from "@/content/compuestos";

export const metadata: Metadata = { title: "Los 7 tipos de compuestos" };

export default function Compuestos() {
  return (
    <div className="space-y-12">
      <header className="max-w-3xl space-y-3">
        <h1 className="text-3xl font-bold">Cómo se arman las palabras: los 7 tipos de compuestos</h1>
        <p className="text-lg text-muted">
          El chino moderno tiene unas 400 sílabas distintas (unas 1200 contando los tonos), así que hay muchísimos
          homófonos. La solución fue unir caracteres en palabras de dos o más, y cada uno conserva su significado.
          Casi toda palabra encaja en uno de estos siete tipos.
        </p>
        <p className="rounded-xl border border-line bg-surface p-4 text-sm">
          <strong>Ojo:</strong> la unidad con significado es el <strong>carácter</strong>, no la sílaba. <em>Shì</em>{" "}
          puede ser <span className="hanzi">是</span> (ser), <span className="hanzi">事</span> (asunto),{" "}
          <span className="hanzi">市</span> (ciudad), <span className="hanzi">试</span> (probar)… Aprende cada carácter
          con varias palabras donde aparece.
        </p>
      </header>

      <nav className="flex flex-wrap gap-2">
        {tiposCompuesto.map((t, i) => (
          <a
            key={t.id}
            href={`#${t.id}`}
            className="rounded-full border border-line px-3 py-1 text-sm hover:border-accent hover:text-accent"
          >
            {i + 1}. {t.nombre}
          </a>
        ))}
      </nav>

      {tiposCompuesto.map((t, i) => (
        <section key={t.id} id={t.id} className="scroll-mt-24 space-y-4">
          <div className="max-w-3xl space-y-1">
            <h2 className="text-2xl font-semibold">
              {i + 1}. {t.nombre} <span className="text-base font-normal text-muted">· <Texto>{t.logica}</Texto>
              </span>
            </h2>
            <p className="text-muted">
              <Texto>{t.explicacion}</Texto>
            </p>
          </div>
          {t.palabras.length > 0 && <GrillaPalabras palabras={t.palabras} />}
          {t.subgrupos?.map((g) => (
            <div key={g.titulo} className="space-y-3">
              <h3 className="font-semibold">{g.titulo}</h3>
              <GrillaPalabras palabras={g.palabras} />
            </div>
          ))}
        </section>
      ))}

      {masEjemplos.map((g) => (
        <section key={g.titulo} className="space-y-4">
          <h2 className="text-2xl font-semibold">Más ejemplos: {g.titulo.toLowerCase()}</h2>
          <GrillaPalabras palabras={g.palabras} />
        </section>
      ))}

      <section className="space-y-4">
        <div className="max-w-3xl space-y-1">
          <h2 className="text-2xl font-semibold">Las excepciones: préstamos fonéticos</h2>
          <p className="text-muted">
            Aquí los caracteres solo aportan el sonido. Son pocos, y se reconocen porque el desglose no tiene sentido.
          </p>
        </div>
        <GrillaPalabras palabras={excepcionesFoneticas} />
      </section>

      <section className="space-y-4">
        <div className="max-w-3xl space-y-1">
          <h2 className="text-2xl font-semibold">Marcas: sonido y significado a la vez</h2>
          <p className="text-muted">
            Las marcas eligen caracteres que suenan parecido al nombre original y además significan algo bueno.
          </p>
        </div>
        <GrillaPalabras palabras={marcas} />
      </section>
    </div>
  );
}
