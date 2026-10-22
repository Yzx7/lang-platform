"use client";

import type { PDFDocumentLoadingTask, PDFDocumentProxy, RenderTask } from "pdfjs-dist";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { tituloDe, urlArchivo, type Libro, type Pista } from "@/content/biblioteca/libros";
import { CapaEscritura, type CapaEscrituraRef, type Herramienta } from "./capa-escritura";

type Posicion = { pagina: number; x: number; y: number };
type Modo = "leer" | "escribir" | "colocar";
/** Ajustar al ancho, página completa o un porcentaje (1 = tamaño real). */
type Zoom = "ancho" | "pagina" | number;

const VELOCIDADES = [0.75, 1, 1.25];
const PASOS_ZOOM = [0.5, 0.67, 0.75, 0.9, 1, 1.1, 1.25, 1.5, 1.75, 2, 2.5, 3, 4];
const ZOOM_MIN = 0.25;
const ZOOM_MAX = 5;
// 100 % = el tamaño impreso de la página en una pantalla de 96 ppp.
const PUNTO_A_PX = 96 / 72;
// Tope de píxeles del lienzo: más allá, el navegador se queda sin memoria al hacer mucho zoom.
const PIXELES_MAX = 24e6;
// Lo que ocupan arriba el encabezado del sitio y la barra del visor.
const ALTO_BARRAS = 130;

function anchoDePagina(zoom: Zoom, base: { width: number; height: number }, disponible: { ancho: number; alto: number }) {
  if (zoom === "ancho") return disponible.ancho;
  if (zoom === "pagina") return Math.min(disponible.ancho, ((disponible.alto - ALTO_BARRAS) * base.width) / base.height);
  return base.width * PUNTO_A_PX * zoom;
}

// Este componente solo corre en el navegador (ver visor-cliente.tsx),
// así que puede leer localStorage al inicializar el estado.
function leer<T>(clave: string, porDefecto: T): T {
  try {
    const v = localStorage.getItem(clave);
    return v === null ? porDefecto : (JSON.parse(v) as T);
  } catch {
    return porDefecto;
  }
}

function escribir(clave: string, valor: unknown) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
  } catch {}
}

const leccion = (pista: string) => Number(pista.split("-")[0]);

export default function Visor({ libro }: { libro: Libro }) {
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [error, setError] = useState(false);
  const [pagina, setPagina] = useState(() => leer(`pagina:${libro.slug}`, 1));
  // Espacio disponible (ancho del área de lectura y alto de la ventana) y tamaño en que se dibujó la página.
  const [disponible, setDisponible] = useState({ ancho: 0, alto: 0 });
  const [tamaño, setTamaño] = useState({ ancho: 0, alto: 0, base: 0 });
  const [zoom, setZoom] = useState<Zoom>(() => leer(`zoom:${libro.slug}`, "ancho"));
  const [panel, setPanel] = useState(() => leer("biblioteca:panel", true));
  const [modo, setModo] = useState<Modo>("leer");
  const [herramienta, setHerramienta] = useState<Herramienta>("azul");
  const [confirmarBorrado, setConfirmarBorrado] = useState(false);
  const [colocando, setColocando] = useState<string | null>(null);
  const [actual, setActual] = useState<string | null>(null);
  const [velocidad, setVelocidad] = useState(1);
  const [correcciones, setCorrecciones] = useState<Record<string, Posicion>>(() =>
    leer(`pistas:${libro.slug}`, {}),
  );
  const [copiado, setCopiado] = useState(false);

  const contenedor = useRef<HTMLDivElement>(null);
  const lienzo = useRef<HTMLCanvasElement>(null);
  const audio = useRef<HTMLAudioElement>(null);
  const escritura = useRef<CapaEscrituraRef>(null);

  const total = pdf?.numPages ?? 0;
  const pistas: Pista[] = (libro.pistas ?? []).map((p) =>
    correcciones[p.pista] ? { ...p, ...correcciones[p.pista], fuente: "manual" } : p,
  );
  const enPagina = pistas.filter((p) => p.pagina === pagina);
  const lecciones = [...new Set(pistas.map((p) => leccion(p.pista)))];

  // Carga el PDF por partes: solo baja las páginas que se van mirando.
  useEffect(() => {
    let vigente = true;
    let carga: PDFDocumentLoadingTask | undefined;
    (async () => {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
      if (!vigente) return;
      carga = pdfjs.getDocument({
        url: urlArchivo(libro.archivo),
        disableAutoFetch: true,
        disableStream: true,
        rangeChunkSize: 1 << 20,
      });
      try {
        const doc = await carga.promise;
        if (vigente) setPdf(doc);
      } catch {
        if (vigente) setError(true);
      }
    })();
    return () => {
      vigente = false;
      carga?.destroy();
    };
  }, [libro.archivo]);

  // Espacio disponible: ancho del área de lectura y alto de la ventana.
  useEffect(() => {
    const el = contenedor.current;
    if (!el) return;
    const medir = () => {
      const ancho = Math.floor(el.clientWidth);
      const alto = window.innerHeight;
      setDisponible((d) => (d.ancho === ancho && d.alto === alto ? d : { ancho, alto }));
    };
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    window.addEventListener("resize", medir);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", medir);
    };
  }, []);

  // Dibuja la página al tamaño del zoom, nítida en pantallas de alta densidad.
  useEffect(() => {
    if (!pdf || !disponible.ancho || pagina > pdf.numPages) return;
    let vigente = true;
    let tarea: RenderTask | undefined;
    (async () => {
      const pag = await pdf.getPage(pagina);
      if (!vigente || !lienzo.current) return;
      const base = pag.getViewport({ scale: 1 });
      const ancho = Math.round(anchoDePagina(zoom, base, disponible));
      const escala = ancho / base.width;
      const alto = Math.round(base.height * escala);
      const dpr = Math.min(window.devicePixelRatio || 1, Math.sqrt(PIXELES_MAX / (ancho * alto)));
      const vista = pag.getViewport({ scale: escala * dpr });
      const c = lienzo.current;
      c.width = Math.floor(vista.width);
      c.height = Math.floor(vista.height);
      setTamaño((t) => (t.ancho === ancho && t.alto === alto && t.base === base.width ? t : { ancho, alto, base: base.width }));
      tarea = pag.render({ canvas: c, viewport: vista });
      await tarea.promise.catch(() => {});
    })();
    return () => {
      vigente = false;
      tarea?.cancel();
    };
  }, [pdf, pagina, zoom, disponible]);

  // Zoom actual como porcentaje, también cuando está en «ajustar».
  const porcentaje = tamaño.base ? tamaño.ancho / (tamaño.base * PUNTO_A_PX) : 1;

  useEffect(() => escribir(`zoom:${libro.slug}`, zoom), [libro.slug, zoom]);
  useEffect(() => escribir("biblioteca:panel", panel), [panel]);

  function acercar(direccion: 1 | -1) {
    const siguiente =
      direccion > 0
        ? (PASOS_ZOOM.find((p) => p > porcentaje + 0.01) ?? ZOOM_MAX)
        : ([...PASOS_ZOOM].reverse().find((p) => p < porcentaje - 0.01) ?? ZOOM_MIN);
    setZoom(siguiente);
  }

  function ajustar(z: "ancho" | "pagina") {
    setZoom(z);
    // Para ver la página completa, la deja justo debajo de la barra.
    if (z === "pagina") contenedor.current?.scrollIntoView({ block: "start" });
  }

  // Ctrl + rueda (o pellizcar en el touchpad) sobre la página: zoom continuo.
  const porcentajeActual = useRef(porcentaje);
  useEffect(() => {
    porcentajeActual.current = porcentaje;
  }, [porcentaje]);
  useEffect(() => {
    const el = contenedor.current;
    if (!el) return;
    function rueda(e: WheelEvent) {
      if (!e.ctrlKey) return;
      e.preventDefault();
      const nuevo = porcentajeActual.current * Math.exp(-e.deltaY * 0.002);
      porcentajeActual.current = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, nuevo));
      setZoom(porcentajeActual.current);
    }
    el.addEventListener("wheel", rueda, { passive: false });
    return () => el.removeEventListener("wheel", rueda);
  }, []);

  function irA(n: number) {
    setPagina(Math.max(1, Math.min(total || n, Math.round(n) || 1)));
    setConfirmarBorrado(false);
  }

  // Recuerda la última página de cada libro.
  useEffect(() => escribir(`pagina:${libro.slug}`, pagina), [libro.slug, pagina]);

  // Flechas del teclado para pasar de página (salvo escribiendo en un campo).
  useEffect(() => {
    function tecla(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) return;
      const limite = total || Infinity;
      if (e.key === "ArrowRight") setPagina((p) => Math.min(limite, p + 1));
      if (e.key === "ArrowLeft") setPagina((p) => Math.max(1, p - 1));
      if (e.key === "Escape") {
        setColocando(null);
        setModo((m) => (m === "colocar" ? "leer" : m));
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "z") escritura.current?.deshacer();
    }
    window.addEventListener("keydown", tecla);
    return () => window.removeEventListener("keydown", tecla);
  }, [total]);

  function tocar(pista: Pista) {
    const a = audio.current;
    if (!a || !libro.audio) return;
    if (pista.pagina && pista.pagina !== pagina) irA(pista.pagina);
    if (actual === pista.pista) {
      if (a.paused) a.play().catch(() => {});
      else a.pause();
      return;
    }
    a.src = urlArchivo(`audio/${libro.audio}/${pista.pista}.mp3`);
    a.playbackRate = velocidad;
    a.play().catch(() => {});
    setActual(pista.pista);
  }

  function cambiarVelocidad(v: number) {
    setVelocidad(v);
    if (audio.current) audio.current.playbackRate = v;
  }

  function empezarAColocar(pista: string) {
    setColocando(pista);
    setModo("colocar");
  }

  function colocar(e: MouseEvent<HTMLDivElement>) {
    if (modo !== "colocar" || !colocando) return;
    const r = e.currentTarget.getBoundingClientRect();
    const pos = {
      pagina,
      x: Math.round(((e.clientX - r.left) / r.width) * 1e4) / 1e4,
      y: Math.round(((e.clientY - r.top) / r.height) * 1e4) / 1e4,
    };
    const nuevas = { ...correcciones, [colocando]: pos };
    setCorrecciones(nuevas);
    escribir(`pistas:${libro.slug}`, nuevas);
    setColocando(null);
    setModo("leer");
  }

  async function copiarCorrecciones() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(correcciones, null, 1));
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {}
  }

  if (error) {
    return (
      <div className="rounded-xl border border-line bg-surface p-6">
        <p className="font-semibold">No encontré el archivo {libro.archivo}.</p>
        <p className="mt-2 text-sm text-muted">
          Los libros HSK tienen derechos de autor y solo están en tu computadora, en la carpeta <code>HSK/</code> del
          proyecto. Si estás viendo el sitio publicado, la biblioteca no está disponible.
        </p>
      </div>
    );
  }

  const boton = "rounded-lg border border-line px-3 py-1.5 text-sm hover:border-accent hover:text-accent disabled:opacity-40";
  const activo = "border-accent bg-accent-soft text-accent";

  return (
    <div className={`grid gap-6 ${panel ? "lg:grid-cols-[minmax(0,1fr)_18rem]" : ""}`}>
      <div className="min-w-0 space-y-3">
        {/* Barra de herramientas: queda fija bajo el encabezado al bajar por la página. */}
        <div className="sticky top-[57px] z-20 -mx-2 flex flex-wrap items-center gap-2 bg-bg/95 px-2 py-2 backdrop-blur">
          <button className={boton} onClick={() => irA(pagina - 1)} disabled={pagina <= 1} aria-label="Página anterior">
            ←
          </button>
          <label className="flex items-center gap-1 text-sm">
            <input
              key={pagina}
              type="number"
              defaultValue={pagina}
              min={1}
              max={total || undefined}
              onKeyDown={(e) => e.key === "Enter" && irA(Number(e.currentTarget.value))}
              onBlur={(e) => irA(Number(e.currentTarget.value))}
              className="w-16 rounded-lg border border-line bg-surface px-2 py-1.5 text-center"
              aria-label="Página"
            />
            <span className="text-muted">/ {total || "…"}</span>
          </label>
          <button className={boton} onClick={() => irA(pagina + 1)} disabled={!!total && pagina >= total} aria-label="Página siguiente">
            →
          </button>
          <span className="mx-1 h-6 w-px bg-line" />
          <button
            className={`${boton} ${modo === "escribir" ? activo : ""}`}
            onClick={() => setModo((m) => (m === "escribir" ? "leer" : "escribir"))}
          >
            ✏️ Escribir
          </button>
          {modo === "escribir" && (
            <>
              {(["azul", "rojo", "borrador"] as const).map((h) => (
                <button key={h} className={`${boton} ${herramienta === h ? activo : ""}`} onClick={() => setHerramienta(h)}>
                  {h === "azul" ? "🔵 Azul" : h === "rojo" ? "🔴 Rojo" : "🧽 Borrador"}
                </button>
              ))}
              <button className={boton} onClick={() => escritura.current?.deshacer()} title="Ctrl+Z">
                ↶ Deshacer
              </button>
              {confirmarBorrado ? (
                <button
                  className={`${boton} border-[var(--t1)] text-[var(--t1)]`}
                  onClick={() => {
                    escritura.current?.borrarTodo();
                    setConfirmarBorrado(false);
                  }}
                >
                  ¿Borrar todo lo de esta página? Sí
                </button>
              ) : (
                <button className={boton} onClick={() => setConfirmarBorrado(true)}>
                  Borrar página
                </button>
              )}
            </>
          )}
          <div className="ml-auto flex flex-wrap items-center gap-1">
            <button className={boton} onClick={() => acercar(-1)} disabled={porcentaje <= ZOOM_MIN + 0.001} aria-label="Alejar">
              −
            </button>
            <span className="w-14 text-center text-sm tabular-nums" title="Ctrl + rueda del mouse sobre la página">
              {Math.round(porcentaje * 100)} %
            </span>
            <button className={boton} onClick={() => acercar(1)} disabled={porcentaje >= ZOOM_MAX - 0.001} aria-label="Acercar">
              +
            </button>
            <button className={`${boton} ${zoom === "ancho" ? activo : ""}`} onClick={() => ajustar("ancho")}>
              ↔ Ancho
            </button>
            <button className={`${boton} ${zoom === "pagina" ? activo : ""}`} onClick={() => ajustar("pagina")}>
              ↕ Página completa
            </button>
            <button className={`${boton} hidden lg:block`} onClick={() => setPanel((p) => !p)}>
              {panel ? "Ocultar panel ⇥" : "⇤ Panel"}
            </button>
          </div>
        </div>

        {modo === "colocar" && colocando && (
          <p className="rounded-lg border border-accent bg-accent-soft px-3 py-2 text-sm text-accent">
            Haz clic en la página donde está el ícono de la pista <strong>{colocando}</strong>. Esc para cancelar.
          </p>
        )}

        {/* Página */}
        {/* Con zoom mayor al ancho disponible, la página se desplaza en horizontal aquí dentro. */}
        <div ref={contenedor} className="w-full scroll-mt-28 overflow-x-auto pb-2">
          <div
            className={`relative mx-auto overflow-hidden rounded-lg border border-line bg-white shadow-sm ${modo === "colocar" ? "cursor-crosshair" : ""}`}
            style={{ width: tamaño.ancho || "100%", height: tamaño.alto || undefined, aspectRatio: tamaño.alto ? undefined : "595 / 842" }}
            onClick={colocar}
          >
            <canvas ref={lienzo} className="absolute inset-0 h-full w-full" />
            {!pdf && <p className="absolute inset-0 grid place-items-center text-sm text-muted">Cargando {libro.archivo}…</p>}
            <CapaEscritura
              ref={escritura}
              clave={`trazos:${libro.slug}:${pagina}`}
              ancho={tamaño.ancho}
              alto={tamaño.alto}
              activa={modo === "escribir"}
              herramienta={herramienta}
            />
            {enPagina.map((p) => (
              <button
                key={p.pista}
                onClick={(e) => {
                  e.stopPropagation();
                  tocar(p);
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-2 py-1 text-xs font-semibold text-white shadow-md transition ${
                  actual === p.pista ? "bg-[var(--t2)] ring-2 ring-white" : "bg-accent hover:scale-110"
                } ${modo !== "leer" ? "pointer-events-none opacity-40" : ""}`}
                style={{ left: `${(p.x ?? 0) * 100}%`, top: `${(p.y ?? 0) * 100}%` }}
                title={`Escuchar pista ${p.pista}`}
              >
                ▶ {p.pista}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2">
          <button className={boton} onClick={() => irA(pagina - 1)} disabled={pagina <= 1}>
            ← Anterior
          </button>
          <button className={boton} onClick={() => irA(pagina + 1)} disabled={!!total && pagina >= total}>
            Siguiente →
          </button>
        </div>
      </div>

      {/* Panel lateral */}
      {/* Oculto con CSS y no quitado: tiene el reproductor que usan los marcadores ▶. */}
      <aside
        className={`space-y-4 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto ${panel ? "" : "lg:hidden"}`}
      >
        <div className="rounded-xl border border-line bg-surface p-4 text-sm">
          <p className="font-semibold">{tituloDe(libro)}</p>
          <p className="mt-1 text-muted">
            Flechas ← → para pasar de página. En modo ✏️ Escribir puedes usar la tableta; lo que escribas se guarda en
            este navegador.
          </p>
        </div>

        {libro.audio && (
          <div className="space-y-3 rounded-xl border border-line bg-surface p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Audios</h2>
              <div className="flex gap-1">
                {VELOCIDADES.map((v) => (
                  <button
                    key={v}
                    onClick={() => cambiarVelocidad(v)}
                    className={`rounded px-1.5 py-0.5 text-xs ${velocidad === v ? "bg-accent text-white" : "text-muted hover:text-accent"}`}
                  >
                    {v}×
                  </button>
                ))}
              </div>
            </div>
            <audio ref={audio} controls className="w-full" onEnded={() => setActual(null)} />
            {actual && <p className="text-xs text-muted">Sonando: pista {actual}</p>}
            <div className="space-y-3">
              {lecciones.map((l) => (
                <div key={l}>
                  <p className="mb-1 text-xs font-semibold text-muted">Lección {l}</p>
                  <ul className="space-y-0.5">
                    {pistas
                      .filter((p) => leccion(p.pista) === l)
                      .map((p) => (
                        <li key={p.pista} className="flex items-center gap-2 text-sm">
                          <button
                            onClick={() => tocar(p)}
                            className={`flex-1 rounded px-1.5 py-0.5 text-left hover:bg-accent-soft ${
                              actual === p.pista ? "font-semibold text-accent" : ""
                            } ${p.pagina === pagina ? "bg-accent-soft/60" : ""}`}
                          >
                            ▶ {p.pista}{" "}
                            <span className="text-xs text-muted">{p.pagina ? `pág. ${p.pagina}` : "sin ubicar"}</span>
                          </button>
                          <button
                            onClick={() => empezarAColocar(p.pista)}
                            className={`text-xs ${p.pagina ? "text-muted opacity-60 hover:opacity-100" : "text-accent"}`}
                            title={p.pagina ? "Mover el marcador" : "Colocar en la página"}
                          >
                            📍
                          </button>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
            {Object.keys(correcciones).length > 0 && (
              <div className="border-t border-line pt-3 text-xs text-muted">
                <p>
                  {Object.keys(correcciones).length} marcador(es) colocados a mano, guardados en este navegador.
                </p>
                <button onClick={copiarCorrecciones} className="mt-1 text-accent hover:underline">
                  {copiado ? "¡Copiado!" : "Copiar para guardarlos en el proyecto"}
                </button>
              </div>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}
