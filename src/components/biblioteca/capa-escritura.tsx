"use client";

import { get, set } from "idb-keyval";
import { useEffect, useImperativeHandle, useRef, type PointerEvent, type Ref } from "react";

export type Herramienta = "azul" | "rojo" | "borrador";

/** Un trazo: puntos normalizados a la página (0–1) con la presión del lápiz. */
type Trazo = { h: Herramienta; p: [number, number, number][] };

export type CapaEscrituraRef = { deshacer: () => void; borrarTodo: () => void };

const COLOR: Record<Herramienta, string> = { azul: "#1d3fae", rojo: "#d92d20", borrador: "#000" };

function grosor(h: Herramienta, presion: number, ancho: number) {
  const escala = ancho / 800;
  return h === "borrador" ? 24 * escala : (1 + presion * 2.5) * escala;
}

/**
 * Lienzo transparente sobre la página del PDF para escribir con la tableta.
 * Los trazos se guardan en IndexedDB (en este navegador), uno por página.
 */
export function CapaEscritura({
  clave,
  ancho,
  alto,
  activa,
  herramienta,
  ref,
}: {
  clave: string;
  ancho: number;
  alto: number;
  activa: boolean;
  herramienta: Herramienta;
  ref?: Ref<CapaEscrituraRef>;
}) {
  const lienzo = useRef<HTMLCanvasElement>(null);
  const trazos = useRef<Trazo[]>([]);
  const actual = useRef<Trazo | null>(null);
  // Si alguna vez llegó un lápiz, los toques con el dedo o la palma no dibujan.
  const vioLapiz = useRef(false);

  function contexto() {
    const c = lienzo.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return null;
    ctx.setTransform(c.width / ancho, 0, 0, c.height / alto, 0, 0);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    return ctx;
  }

  function segmento(ctx: CanvasRenderingContext2D, h: Herramienta, a: Trazo["p"][0], b: Trazo["p"][0]) {
    ctx.globalCompositeOperation = h === "borrador" ? "destination-out" : "source-over";
    ctx.strokeStyle = COLOR[h];
    ctx.lineWidth = grosor(h, b[2], ancho);
    ctx.beginPath();
    if (a === b) {
      // Un toque sin movimiento: una línea de largo cero no pinta, así que va un punto.
      ctx.fillStyle = COLOR[h];
      ctx.arc(a[0] * ancho, a[1] * alto, ctx.lineWidth / 2, 0, Math.PI * 2);
      ctx.fill();
      return;
    }
    ctx.moveTo(a[0] * ancho, a[1] * alto);
    ctx.lineTo(b[0] * ancho, b[1] * alto);
    ctx.stroke();
  }

  function redibujar() {
    const c = lienzo.current;
    const ctx = contexto();
    if (!c || !ctx) return;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.restore();
    for (const t of actual.current ? [...trazos.current, actual.current] : trazos.current) {
      if (t.p.length === 1) segmento(ctx, t.h, t.p[0], t.p[0]);
      for (let i = 1; i < t.p.length; i++) segmento(ctx, t.h, t.p[i - 1], t.p[i]);
    }
  }

  function guardar() {
    set(clave, trazos.current).catch(() => {});
  }

  useImperativeHandle(ref, () => ({
    deshacer() {
      trazos.current.pop();
      redibujar();
      guardar();
    },
    borrarTodo() {
      trazos.current = [];
      redibujar();
      guardar();
    },
  }));

  // Ajusta la resolución del lienzo y redibuja cuando cambia el tamaño de la página.
  useEffect(() => {
    const c = lienzo.current;
    if (!c || !ancho || !alto) return;
    const dpr = window.devicePixelRatio || 1;
    c.width = Math.round(ancho * dpr);
    c.height = Math.round(alto * dpr);
    redibujar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ancho, alto]);

  // Carga los trazos guardados de esta página.
  useEffect(() => {
    let vigente = true;
    trazos.current = [];
    redibujar();
    get<Trazo[]>(clave)
      .then((guardados) => {
        if (!vigente) return;
        trazos.current = guardados ?? [];
        redibujar();
      })
      .catch(() => {});
    return () => {
      vigente = false;
    };
    // redibujar lee refs y el tamaño actual; solo hace falta recargar al cambiar de página.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clave]);

  function punto(e: { clientX: number; clientY: number; pressure: number }): Trazo["p"][0] {
    const r = lienzo.current!.getBoundingClientRect();
    return [(e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height, e.pressure > 0 ? e.pressure : 0.5];
  }

  function empezar(e: PointerEvent<HTMLCanvasElement>) {
    if (!activa) return;
    if (e.pointerType === "pen") vioLapiz.current = true;
    else if (e.pointerType === "touch" && vioLapiz.current) return;
    // La captura mantiene el trazo aunque el lápiz salga del lienzo; si no se puede, se dibuja igual.
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    const p = punto(e);
    actual.current = { h: herramienta, p: [p] };
    const ctx = contexto();
    if (ctx) segmento(ctx, herramienta, p, p);
  }

  function mover(e: PointerEvent<HTMLCanvasElement>) {
    const t = actual.current;
    const ctx = contexto();
    if (!t || !ctx) return;
    // Los eventos agrupados dan todos los puntos que el lápiz mandó entre dos frames
    // (algunos navegadores devuelven la lista vacía: entonces vale el evento mismo).
    const agrupados = e.nativeEvent.getCoalescedEvents?.() ?? [];
    for (const ev of agrupados.length ? agrupados : [e.nativeEvent]) {
      const p = punto(ev);
      segmento(ctx, t.h, t.p[t.p.length - 1], p);
      t.p.push(p);
    }
  }

  function terminar() {
    if (!actual.current) return;
    trazos.current.push(actual.current);
    actual.current = null;
    guardar();
  }

  return (
    <canvas
      ref={lienzo}
      onPointerDown={empezar}
      onPointerMove={mover}
      onPointerUp={terminar}
      onPointerCancel={terminar}
      className={`absolute inset-0 h-full w-full ${activa ? "cursor-crosshair touch-none" : "pointer-events-none"}`}
    />
  );
}
