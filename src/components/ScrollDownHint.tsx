"use client";

export function ScrollDownHint() {
  return (
    <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-[float_3s_ease-in-out_infinite]">
      {/* Text */}
      <span className="text-xs uppercase tracking-widest text-white/40 font-mono">Scroll</span>

      {/* Arrow container with animation */}
      <div className="flex flex-col items-center gap-1">
        {/* First arrow */}
        <svg
          className="w-4 h-4 text-violet-400 animate-[slideDownFade_1.5s_ease-in-out_infinite]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>

        {/* Second arrow with delay */}
        <svg
          className="w-4 h-4 text-violet-400 animate-[slideDownFade_1.5s_ease-in-out_0.3s_infinite]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  );
}
