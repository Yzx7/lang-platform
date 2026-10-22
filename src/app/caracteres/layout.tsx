import { ConMenu } from "@/components/con-menu";
import { MenuLateral } from "@/components/menu-lateral";
import { familias } from "@/content/familias";

const grupos = [
  {
    enlaces: familias.map((f) => ({ href: `/caracteres/${f.slug}`, texto: f.raiz.m, hanzi: f.raiz.h })),
  },
];

export default function Layout({ children }: LayoutProps<"/caracteres">) {
  return (
    <ConMenu menu={<MenuLateral titulo="Caracteres" href="/caracteres" grupos={grupos} />}>{children}</ConMenu>
  );
}
