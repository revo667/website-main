"use client";

import { useEffect, useState } from "react";

const TOTAL_PAGES = 4;

export function ScrollProgressBar({ currentPage = 0 }: { currentPage?: number }) {
  const [dotPosition, setDotPosition] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const pos = currentPage * 72;
    setDotPosition(pos);
  }, [currentPage]);

  const handleLineClick = (index: number) => {
    if (typeof document === "undefined") return;
    const sections = document.querySelectorAll("section");
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!mounted) return null;

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-20 hidden md:block">
      <div className="relative flex flex-col gap-6 w-0.5">
        <div className="absolute left-0 top-0 w-0.5 h-full bg-white/20 rounded-full"></div>

        {Array.from({ length: TOTAL_PAGES }).map((_, index) => {
          const isVisited = index < currentPage;
          const isActive = index === currentPage;

          return (
            <button
              key={index}
              onClick={() => handleLineClick(index)}
              className={`relative w-0.5 h-12 transition-all duration-300 rounded-full cursor-pointer ${
                isVisited
                  ? "bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.6)]"
                  : isActive
                  ? "bg-violet-400 shadow-[0_0_10px_rgba(139,92,246,0.8)]"
                  : "bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          );
        })}
      </div>

      <div
        className="absolute w-3 h-3 rounded-full bg-gradient-to-b from-violet-300 to-violet-500 left-1/2 -translate-x-1/2 transition-all duration-700 ease-in-out shadow-[0_0_15px_rgba(139,92,246,0.8)]"
        style={{
          top: `calc(${dotPosition}px - 6px)`,
        }}
      ></div>
    </div>
  );
}
