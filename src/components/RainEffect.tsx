import { useEffect, useRef } from "react";

interface Drop {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
}

export function RainEffect({ count = 120 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let drops: Drop[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    const initDrops = () => {
      drops = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        length: 40 + Math.random() * 80,
        speed: 800 + Math.random() * 1200, // px per second
        opacity: 0.06 + Math.random() * 0.14,
      }));
    };

    let lastTime = performance.now();

    const draw = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (const d of drops) {
        d.y += d.speed * dt;
        if (d.y > window.innerHeight) {
          d.y = -d.length;
          d.x = Math.random() * window.innerWidth;
        }

        const grad = ctx.createLinearGradient(d.x, d.y, d.x, d.y + d.length);
        grad.addColorStop(0, `rgba(200,210,230,0)`);
        grad.addColorStop(0.5, `rgba(200,210,230,${d.opacity})`);
        grad.addColorStop(1, `rgba(200,210,230,0)`);

        ctx.fillStyle = grad;
        ctx.fillRect(d.x, d.y, 1, d.length);
      }

      animId = requestAnimationFrame(draw);
    };

    resize();
    initDrops();
    animId = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  );
}
