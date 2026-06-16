interface PageIndicatorProps {
  activeIndex: number;
  count: number;
  onSelect: (index: number) => void;
}

export function PageIndicator({ activeIndex, count, onSelect }: PageIndicatorProps) {
  const lineHeight = 48; // px (h-12)
  const gap = 16; // px (gap-4)
  const step = lineHeight + gap;

  return (
    <div className="fixed right-6 top-1/2 z-30 -translate-y-1/2">
      <div className="relative flex flex-col gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            aria-label={`Go to section ${i + 1}`}
            className="h-12 w-px bg-white/25 transition-colors hover:bg-white/60"
          />
        ))}
        <span
          aria-hidden
          className="pointer-events-none absolute -left-[3px] h-2 w-2 rounded-full bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.8)] transition-transform duration-500 ease-out"
          style={{
            top: 0,
            transform: `translateY(${activeIndex * step + lineHeight / 2 - 4}px)`,
          }}
        />
      </div>
    </div>
  );
}
