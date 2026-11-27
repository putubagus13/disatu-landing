import { useEffect, useRef, type ReactNode } from "react";

// Adapted from "Wave Mesh". A field of dots laid out to the horizon and rolling like a slow sea. The pointer lifts a
// soft hill where it points on the ground; a click throws off a ring that travels outward and dies away. Dots shrink
// and fade with distance, so it reads as deep space without any 3D library.
//
// Ported to this project: the dots carry the Disatu gradient (green into the logo yellow, running left to right and
// up the crests) instead of one flat colour, the colours follow the theme, the canvas is transparent so the page
// background and glow show through, and it stops drawing off screen or in a hidden tab. Visitors who ask for reduced
// motion get one still frame.

type Rgb = [number, number, number];
type Props = {
  theme: "dark" | "light";
  /** Where the horizon sits, as a fraction of the host's height. */
  horizon?: number;
  className?: string;
  children?: ReactNode;
};

// The same two ends as --grad-from / --grad-to; the light theme uses a deeper pair so dots still read on white.
const GRADIENT: Record<Props["theme"], { from: Rgb; to: Rgb }> = {
  dark: { from: [63, 163, 127], to: [255, 211, 63] },
  light: { from: [18, 66, 50], to: [230, 176, 0] },
};
const STEPS = 24; // colours are bucketed so a frame sets the fill style a few times per row, not per dot

const CAM = 0.62; // camera height above the ground
const NEAR = 0.35;
const FAR = 3.4;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export function WaveMesh({ theme, horizon = 0.3, className = "", children }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block";
    host.prepend(canvas);
    const ctx = canvas.getContext("2d");
    if (!ctx) return () => canvas.remove();

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = !matchMedia("(hover: hover) and (pointer: fine)").matches;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const { from, to } = GRADIENT[theme];
    const palette = Array.from({ length: STEPS }, (_, i) => {
      const t = i / (STEPS - 1);
      return `rgb(${Math.round(from[0] + (to[0] - from[0]) * t)},${Math.round(from[1] + (to[1] - from[1]) * t)},${Math.round(from[2] + (to[2] - from[2]) * t)})`;
    });

    let W = 0,
      H = 0,
      cols = 0,
      rows = 0,
      f = 0,
      hz = 0;
    let raf = 0,
      visible = true,
      last = 0;
    const t0 = performance.now();
    const ptr = { x: 0, z: 1.4, s: 0, tx: 0, tz: 1.4, ts: 0 };
    const rings: { x: number; z: number; t: number }[] = [];

    const resize = () => {
      const w = host.clientWidth,
        h = host.clientHeight;
      if (w === W && h === H) return;
      W = w;
      H = h;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      f = Math.max(W, H * 1.2) * 0.55; // focal length
      hz = H * horizon;
      cols = Math.round(Math.min(150, Math.max(56, W / 9)));
      rows = Math.round(Math.min(90, Math.max(48, H / 9.5)));
    };

    // World ground spans this half-width at the far edge, so the field always fills the frame.
    const half = () => (W / 2 / f) * FAR * 1.05;

    const height = (x: number, z: number, t: number) => {
      let y =
        0.085 * Math.sin(x * 2.2 + t * 0.7) +
        0.07 * Math.sin(z * 2.9 - t * 0.9 + x * 0.8) +
        0.03 * Math.sin((x + z) * 6.1 + t * 1.6);
      if (ptr.s > 0.01) {
        const d2 = (x - ptr.x) ** 2 + (z - ptr.z) ** 2;
        y += 0.24 * ptr.s * Math.exp(-d2 / 0.07);
      }
      for (const r of rings) {
        const age = t - r.t,
          d = Math.hypot(x - r.x, z - r.z),
          front = age * 1.15;
        y += 0.2 * Math.exp(-((d - front) ** 2) / 0.014) * Math.exp(-age * 0.75);
      }
      return y;
    };

    const frame = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      ptr.x += (ptr.tx - ptr.x) * 0.1;
      ptr.z += (ptr.tz - ptr.z) * 0.1;
      ptr.s += (ptr.ts - ptr.s) * 0.06;
      while (rings.length && t - rings[0].t > 5) rings.shift();
      const hw = half();
      for (let j = 0; j < rows; j++) {
        // Rows are spaced geometrically in depth, so they sit roughly evenly on screen; each row shares a size and a fog.
        const z = FAR * Math.pow(NEAR / FAR, j / (rows - 1));
        const fog = Math.pow(1 - (z - NEAR) / (FAR - NEAR), 1.25);
        const size = Math.max(0.8, Math.min(3.2, 2.3 / z));
        ctx.globalAlpha = 0.12 + fog * 0.85;
        let bucket = -1;
        for (let i = 0; i < cols; i++) {
          const x = -hw + (i / (cols - 1)) * hw * 2;
          const y = height(x, z, t);
          const sx = W / 2 + (x / z) * f;
          if (sx < -4 || sx > W + 4) continue;
          const sy = hz + ((CAM - y) / z) * f;
          // green on the left, yellow on the right, and the crests of the waves lean yellow
          const b = Math.round(clamp01(0.5 + (x / hw) * 0.32 + y * 2.4) * (STEPS - 1));
          if (b !== bucket) {
            ctx.fillStyle = palette[b];
            bucket = b;
          }
          ctx.fillRect(sx - size / 2, sy - size / 2, size, size);
        }
      }
      ctx.globalAlpha = 1;
    };

    const now = () => (performance.now() - t0) / 1000;
    const loop = (ms: number) => {
      if (!visible || document.hidden) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(loop);
      if (coarse && ms - last < 30) return;
      last = ms;
      resize();
      frame(now());
    };
    const wake = () => {
      if (!reduced && !raf && visible && !document.hidden) raf = requestAnimationFrame(loop);
    };

    /** Where on the ground a screen point lands (ignoring the waves). */
    const ground = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      const sx = e.clientX - r.left,
        sy = e.clientY - r.top;
      if (sx < 0 || sy < 0 || sx > r.width || sy > r.height || sy <= hz + 4) return null;
      const z = Math.min(FAR, Math.max(NEAR, (CAM * f) / (sy - hz)));
      return { x: ((sx - W / 2) * z) / f, z };
    };
    const onMove = (e: PointerEvent) => {
      const g = ground(e);
      if (g) {
        ptr.tx = g.x;
        ptr.tz = g.z;
        if (ptr.s < 0.05) {
          ptr.x = g.x;
          ptr.z = g.z;
        }
      }
      ptr.ts = g ? 1 : 0;
    };
    const onDown = (e: PointerEvent) => {
      const g = ground(e);
      if (g) rings.push({ x: g.x, z: g.z, t: now() });
    };

    resize();
    frame(reduced ? 3 : 0);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      wake();
    });
    io.observe(host);
    const ro =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(() => {
            if (reduced) {
              resize();
              frame(3);
            }
          });
    ro?.observe(host);
    document.addEventListener("visibilitychange", wake);
    if (!reduced) {
      wake();
      if (!coarse) window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerdown", onDown, { passive: true });
    }
    return () => {
      cancelAnimationFrame(raf);
      raf = 0;
      io.disconnect();
      ro?.disconnect();
      document.removeEventListener("visibilitychange", wake);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      canvas.remove();
    };
  }, [theme, horizon]);

  return (
    <div ref={hostRef} data-wave-mesh className={`relative isolate overflow-hidden ${className}`}>
      {children && <div className="relative z-[1] h-full">{children}</div>}
    </div>
  );
}
