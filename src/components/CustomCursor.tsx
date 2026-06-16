import { useEffect, useState, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    // Sitenin kendi imlecini tamamen gizle
    document.documentElement.classList.add("cursor-none");

    // Hataları çözen kritik değişken tanımlamaları burada başlıyor:
    let mouseX = 0;
    let mouseY = 0;
    let isRequested = false;

    const updateCursorPosition = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
      isRequested = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      setHidden(false);
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isRequested) {
        requestAnimationFrame(updateCursorPosition);
        isRequested = true;
      }
    };

    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.documentElement.classList.remove("cursor-none");
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []); // İşte o altta kalan dizi kapatması buraya ait!

  if (hidden) return null;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-50 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center md:flex will-change-transform"
      style={{ transition: "none !important" }}
    >
      {/* Merkezdeki Keskin Beyaz Nokta */}
      <div className="absolute h-1 w-1 rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,1)]" />

      {/* İstediğiniz Beyaz Glow Aura */}
      <div className="h-8 w-8 rounded-full bg-white/10 blur-md shadow-[0_0_25px_6px_rgba(255,255,255,0.25)]" />
    </div>
  );
}
