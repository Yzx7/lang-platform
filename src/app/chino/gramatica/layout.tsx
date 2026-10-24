import { ConMenu } from "@/components/con-menu";
import { MenuLateral } from "@/components/menu-lateral";
import { esPendiente, secciones } from "@/content/gramatica";

// Solo los temas escritos: los pendientes no tienen página a la que ir.
const grupos = secciones.map((s) => ({
  titulo: s.titulo,
  href: `/chino/gramatica/${s.slug}`,
  enlaces: s.temas
    .filter((t) => !esPendiente(t))
    .map((t) => ({ href: `/chino/gramatica/${s.slug}/${t.slug}`, texto: t.titulo })),
}));

export default function Layout({ children }: LayoutProps<"/chino/gramatica">) {
  return (
    <ConMenu menu={<MenuLateral titulo="Gramática" href="/chino/gramatica" grupos={grupos} />}>{children}</ConMenu>
  );
}
