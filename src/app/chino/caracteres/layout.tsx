import { ConMenu } from "@/components/con-menu";
import { MenuLateral } from "@/components/menu-lateral";
import { familias } from "@/content/familias";

const grupos = [
  {
    enlaces: familias.map((f) => ({ href: `/chino/caracteres/${f.slug}`, texto: f.raiz.m, hanzi: f.raiz.h })),
  },
];

export default function Layout({ children }: LayoutProps<"/chino/caracteres">) {
  return (
    <ConMenu menu={<MenuLateral titulo="Caracteres" href="/chino/caracteres" grupos={grupos} />}>{children}</ConMenu>
  );
}
