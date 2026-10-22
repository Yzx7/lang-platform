"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

// Distancia mínima entre la ventanita y el borde de la pantalla.
const MARGEN = 8;

/**
 * Ancla con una ventanita que se abre al pasar el cursor o al tocarla.
 * La ventanita usa position: fixed: así sale de las tablas y cajas con scroll
 * en vez de quedar recortada dentro de ellas o estirarlas. Se abre debajo del
 * ancla, o encima si abajo no cabe, y nunca se sale por los costados.
 */
export function Emergente({
  children,
  contenido,
  className = "",
}: {
  children: ReactNode;
  contenido: ReactNode;
  className?: string;
}) {
  const ancla = useRef<HTMLSpanElement>(null);
  const ventana = useRef<HTMLSpanElement>(null);
  const [encima, setEncima] = useState(false);
  const [enfocado, setEnfocado] = useState(false);
  const abierto = encima || enfocado;

  useLayoutEffect(() => {
    if (!abierto) return;
    function ubicar() {
      const a = ancla.current?.getBoundingClientRect();
      const v = ventana.current;
      if (!a || !v) return;
      const { width, height } = v.getBoundingClientRect();
      const abajo = a.bottom + height <= innerHeight - MARGEN || a.top - height < MARGEN;
      const x = Math.min(Math.max(a.left + a.width / 2 - width / 2, MARGEN), innerWidth - width - MARGEN);
      v.style.left = `${x}px`;
      v.style.top = `${abajo ? a.bottom : a.top - height}px`;
      v.style.visibility = "visible";
    }
    ubicar();
    addEventListener("scroll", ubicar, { capture: true, passive: true });
    addEventListener("resize", ubicar);
    return () => {
      removeEventListener("scroll", ubicar, { capture: true });
      removeEventListener("resize", ubicar);
    };
  }, [abierto]);

  return (
    <span
      ref={ancla}
      tabIndex={0}
      className={`focus:outline-none ${className}`}
      onMouseEnter={() => setEncima(true)}
      onMouseLeave={() => setEncima(false)}
      onFocus={() => setEnfocado(true)}
      // Si el foco pasa a un enlace de la ventanita, sigue abierta.
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setEnfocado(false)}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setEncima(false);
          e.currentTarget.blur();
        }
      }}
    >
      {children}
      {abierto && (
        // El py-1 hace de puente entre el ancla y la ventanita: el cursor puede cruzar sin cerrarla.
        <span
          ref={ventana}
          role="tooltip"
          className="invisible fixed left-0 top-0 z-40 block w-max max-w-[calc(100vw-1rem)] py-1 text-base font-normal"
        >
          {contenido}
        </span>
      )}
    </span>
  );
}
