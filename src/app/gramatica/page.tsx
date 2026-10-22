import type { Metadata } from "next";
import Link from "next/link";
import { escritos, esPendiente, secciones } from "@/content/gramatica";

export const metadata: Metadata = { title: "Gramática" };

// Lo mismo que las «4 cosas» de los apuntes de inglés: la base antes del detalle.
const cincoIdeas = [
  {
    titulo: "El verbo nunca cambia",
    texto: "No hay conjugaciones. El «cuándo» lo dicen palabras como 昨天 (ayer) o 明天 (mañana).",
    href: "/gramatica/tiempo-y-aspecto/el-verbo-no-cambia",
  },
  {
    titulo: "El orden manda",
    texto: "Quién, cuándo, dónde y recién la acción: el tiempo y el lugar van antes del verbo.",
    href: "/gramatica/estructura/orden-de-la-oracion",
  },
  {
    titulo: "Piezas alrededor del verbo",
    texto: "在 (en curso), 了 (completado), 过 (experiencia), 不/没 (negación), 吗 (pregunta): cada una en su lugar fijo.",
    href: "/gramatica/tiempo-y-aspecto/todas-las-formas",
  },
  {
    titulo: "Para contar, un clasificador",
    texto: "Entre el número y la cosa va una palabra que dice su forma: 一本书, 三杯咖啡.",
    href: "/gramatica/numeros-y-clasificadores/clasificadores",
  },
  {
    titulo: "Las palabras se arman con caracteres",
    texto: "Cada carácter tiene significado: 电 (electricidad) + 脑 (cerebro) = computadora.",
    href: "/compuestos",
  },
];

export default function Gramatica() {
  const total = secciones.reduce((n, s) => n + s.temas.length, 0);

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">Gramática</h1>
        <p className="max-w-2xl text-muted">
          Organizada por clases de palabras y estructuras, como una gramática de consulta. Cada tema tiene su fórmula,
          una explicación desde el español, ejemplos desglosados y los errores típicos. Las reglas sirven para entender
          lo que escuchas, no para recitarlas.
        </p>
        <p className="text-sm text-muted">
          {escritos.length} de {total} temas escritos · borrador pendiente de verificar
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Lo que hay que entender: 5 ideas</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {cincoIdeas.map((idea, i) => (
            <Link
              key={idea.href}
              href={idea.href}
              className="space-y-1 rounded-xl border border-line bg-surface p-5 transition-colors hover:border-accent"
            >
              <span className="text-2xl font-bold text-accent">{i + 1}</span>
              <h3 className="text-lg font-semibold">{idea.titulo}</h3>
              <p className="text-sm text-muted">{idea.texto}</p>
            </Link>
          ))}
        </div>
      </section>

      <h2 className="text-2xl font-semibold">El mapa</h2>

      <div className="grid gap-4 md:grid-cols-2">
        {secciones.map((seccion, i) => (
          <section key={seccion.slug} className="space-y-3 rounded-xl border border-line bg-surface p-5">
            <Link href={`/gramatica/${seccion.slug}`} className="group block space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-sm font-medium text-muted">{i + 1}</span>
                <h2 className="text-xl font-semibold group-hover:text-accent">{seccion.titulo}</h2>
                <span className="hanzi text-muted">{seccion.hanzi}</span>
              </div>
              <p className="text-sm text-muted">{seccion.resumen}</p>
            </Link>
            <ul className="space-y-1 border-t border-line pt-3 text-sm">
              {seccion.temas.map((t) =>
                esPendiente(t) ? (
                  <li key={t.slug} className="text-muted opacity-60">
                    ○ {t.titulo}
                  </li>
                ) : (
                  <li key={t.slug}>
                    <Link href={`/gramatica/${seccion.slug}/${t.slug}`} className="hover:text-accent hover:underline">
                      <span className="text-accent">●</span> {t.titulo}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
