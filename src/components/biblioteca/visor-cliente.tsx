"use client";

import dynamic from "next/dynamic";

// PDF.js, el lienzo y localStorage solo existen en el navegador.
export const VisorCliente = dynamic(() => import("./visor"), {
  ssr: false,
  loading: () => <p className="text-sm text-muted">Cargando visor…</p>,
});
