import { ConMenu } from "@/components/con-menu";
import { MenuLateral } from "@/components/menu-lateral";
import { esPendiente, secciones } from "@/content/ingles";

// Solo los temas escritos: los pendientes no tienen página a la que ir.
const grupos = secciones.map((s) => ({
  titulo: s.titulo,
  href: `/ingles/${s.slug}`,
  enlaces: s.temas
    .filter((t) => !esPendiente(t))
    .map((t) => ({ href: `/ingles/${s.slug}/${t.slug}`, texto: t.titulo })),
}));

export default function Layout({ children }: LayoutProps<"/ingles">) {
  return <ConMenu menu={<MenuLateral titulo="Inglés" href="/ingles" grupos={grupos} />}>{children}</ConMenu>;
}
