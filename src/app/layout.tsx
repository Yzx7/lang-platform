import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import { Suspense } from "react";
import { Navegacion, type Curso } from "@/components/navegacion";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "Idiomas con lógica", template: "%s · Idiomas con lógica" },
  description:
    "Aprende idiomas en español entendiendo por qué: gramática con fórmulas, tablas y ejemplos. Cursos de chino mandarín e inglés.",
};

const cursos: Curso[] = [
  {
    href: "/chino",
    nombre: "Chino",
    pronunciacion: "pinyin",
    enlaces: [
      { href: "/chino/curso", texto: "Curso" },
      { href: "/chino/gramatica", texto: "Gramática" },
      { href: "/chino/caracteres", texto: "Caracteres" },
      { href: "/chino/compuestos", texto: "Compuestos" },
      { href: "/chino/biblioteca", texto: "Biblioteca" },
    ],
  },
  {
    href: "/ingles",
    nombre: "Inglés",
    pronunciacion: "pronunciación",
    enlaces: [
      { href: "/ingles/verbos", texto: "Verbos" },
      { href: "/ingles/tiempos", texto: "Tiempos" },
    ],
  },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${geistSans.variable} h-full antialiased`}>
      <body className="group/pagina flex min-h-full flex-col font-sans">
        <header className="sticky top-0 z-10 border-b border-line bg-bg/90 backdrop-blur">
          <div className="mx-auto flex max-w-5xl flex-wrap group-has-[[data-con-menu]]/pagina:max-w-7xl items-center gap-x-6 gap-y-2 px-4 py-3">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="rounded bg-accent px-1.5 py-0.5 text-lg text-white">¿?</span>
              Idiomas con lógica
            </Link>
            {/* El menú lee la ruta actual; Suspense evita que eso frene el prerender del resto. */}
            <Suspense>
              <Navegacion cursos={cursos} />
            </Suspense>
          </div>
        </header>

        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 has-[[data-ancho-completo]]:max-w-none has-[[data-ancho-completo]]:py-6 has-[[data-con-menu]]:max-w-7xl">{children}</main>

        <footer className="border-t border-line">
          <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-muted group-has-[[data-con-menu]]/pagina:max-w-7xl">
            Prototipo. Contenido en borrador, pendiente de revisar con fuentes de referencia y hablantes nativos.
          </div>
        </footer>
      </body>
    </html>
  );
}
