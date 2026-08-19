import { useEffect, useRef, useState } from "react";
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none");
    let mouseX = 0;
    let mouseY = 0;
    let frame = 0;
    const render = () => {
      frame = 0;
      const el = cursorRef.current;
      if (!el) return;
      el.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      el.style.opacity = "1";
    };
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!frame) frame = requestAnimationFrame(render);
    };
    const handleMouseLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "0";
    };
    window.addEventListener("mousemove", handleMouseMove, {
      passive: true,
    });
    window.addEventListener("pointermove", handleMouseMove, {
      passive: true,
    });
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.documentElement.classList.remove("cursor-none");
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("pointermove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);
  if (!enabled) return null;
  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        zIndex: 9999,
        pointerEvents: "none",
        opacity: 0,
        transition: "none",
        willChange: "transform",
      }}
    >
      {}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          marginTop: -16,
          marginLeft: -16,
          borderRadius: "9999px",
          background: "rgba(255,255,255,0.10)",
          filter: "blur(12px)",
          boxShadow: "0 0 25px 6px rgba(255,255,255,0.25)",
        }}
      />

      {}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 4,
          height: 4,
          marginTop: -2,
          marginLeft: -2,
          borderRadius: "9999px",
          background: "#fff",
          boxShadow: "0 0 8px 2px rgba(255,255,255,1)",
        }}
      />
    </div>
  );
}
