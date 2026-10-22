"use client";

import { useEffect, useSyncExternalStore } from "react";

type Opcion = "ocultar-pinyin" | "ocultar-es";

const EVENTO = "preferencias-estudio";

// La memoria es la fuente de verdad; localStorage solo la persiste cuando está disponible.
const memoria: Partial<Record<Opcion, boolean>> = {};

function leer(opcion: Opcion): boolean {
  if (memoria[opcion] === undefined) {
    try {
      memoria[opcion] = localStorage.getItem(opcion) === "1";
    } catch {
      memoria[opcion] = false;
    }
  }
  return memoria[opcion];
}

function guardar(opcion: Opcion, activo: boolean) {
  memoria[opcion] = activo;
  try {
    localStorage.setItem(opcion, activo ? "1" : "0");
  } catch {
    // Sin almacenamiento (modo privado): la preferencia solo dura esta visita.
  }
  window.dispatchEvent(new Event(EVENTO));
}

function suscribir(avisar: () => void) {
  window.addEventListener(EVENTO, avisar);
  return () => window.removeEventListener(EVENTO, avisar);
}

function useOpcion(opcion: Opcion): boolean {
  const activo = useSyncExternalStore(suscribir, () => leer(opcion), () => false);
  useEffect(() => {
    document.documentElement.toggleAttribute(`data-${opcion}`, activo);
  }, [opcion, activo]);
  return activo;
}

function Boton({ opcion, etiqueta }: { opcion: Opcion; etiqueta: string }) {
  const activo = useOpcion(opcion);
  return (
    <button
      type="button"
      onClick={() => guardar(opcion, !activo)}
      aria-pressed={activo}
      className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
        activo ? "border-accent bg-accent text-white" : "border-line text-muted hover:border-accent hover:text-accent"
      }`}
    >
      {etiqueta}
    </button>
  );
}

/**
 * Modo estudio: oculta el pinyin o los significados en todo el sitio para
 * ponerte a prueba. Al pasar el cursor (o tocar) sobre un elemento, se revela.
 */
export function ControlesEstudio() {
  return (
    <div className="flex items-center gap-2">
      <Boton opcion="ocultar-pinyin" etiqueta="Ocultar pinyin" />
      <Boton opcion="ocultar-es" etiqueta="Ocultar significados" />
    </div>
  );
}
