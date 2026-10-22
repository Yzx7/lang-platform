import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import { ControlesEstudio } from "@/components/controles-estudio";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "Chino con lógica", template: "%s · Chino con lógica" },
  description:
    "Aprende chino mandarín en español entendiendo por qué: gramática con fórmulas y ejemplos, y vocabulario carácter por carácter.",
};

const enlaces = [
  { href: "/curso", texto: "Curso" },
  { href: "/gramatica", texto: "Gramática" },
  { href: "/caracteres", texto: "Caracteres" },
  { href: "/compuestos", texto: "Compuestos" },
  { href: "/biblioteca", texto: "Biblioteca" },
  { href: "/ingles", texto: "Inglés" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${geistSans.variable} h-full antialiased`}>
      <body className="group/pagina flex min-h-full flex-col font-sans">
        <header className="sticky top-0 z-10 border-b border-line bg-bg/90 backdrop-blur">
          <div className="mx-auto flex max-w-5xl flex-wrap group-has-[[data-con-menu]]/pagina:max-w-7xl items-center gap-x-6 gap-y-2 px-4 py-3">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="hanzi rounded bg-accent px-1.5 py-0.5 text-lg text-white">中</span>
              Chino con lógica
            </Link>
            <nav className="flex flex-wrap gap-4 text-sm">
              {enlaces.map((e) => (
                <Link key={e.href} href={e.href} className="text-muted hover:text-accent">
                  {e.texto}
                </Link>
              ))}
            </nav>
            <div className="ml-auto">
              <ControlesEstudio />
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 has-[[data-ancho-completo]]:max-w-none has-[[data-ancho-completo]]:py-6 has-[[data-con-menu]]:max-w-7xl">{children}</main>

        <footer className="border-t border-line">
          <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-muted group-has-[[data-con-menu]]/pagina:max-w-7xl">
            Prototipo. Contenido en borrador, pendiente de revisar con Chinese Grammar Wiki, el HSK Standard Course o
            un hablante nativo.
          </div>
        </footer>
      </body>
    </html>
  );
}
