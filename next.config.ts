import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  redirects() {
    return [
      // Rutas de antes de separar los cursos.
      ...["curso", "gramatica", "caracteres", "compuestos", "biblioteca"].map((s) => ({
        source: `/${s}/:ruta*`,
        destination: `/chino/${s}/:ruta*`,
        permanent: true,
      })),
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
