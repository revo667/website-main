import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useGlobalAudio } from "@/hooks/useGlobalAudio";

import { RainEffect } from "@/components/RainEffect";
import { TypingText } from "@/components/TypingText";
import { PostsSection } from "@/components/PostsSection";
import { AboutSection } from "@/components/AboutSection";
import { LinksSection } from "@/components/LinksSection";
import { SiberHUD } from "@/components/SiberHUD";
import { Terminal } from "@/components/Terminal";
import { CustomCursor } from "@/components/CustomCursor";
import { SplashScreen } from "@/components/SplashScreen";
import { SoundManager } from "@/components/SoundManager";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { ScrollDownHint } from "@/components/ScrollDownHint";
import Star3D from "@/components/Star3D";

const TOTAL = 4;

function Index() {
  const [active, setActive] = useState(0);
  const [showSplash, setShowSplash] = useState(true);
  const [showTerminal, setShowTerminal] = useState(false);
  // Bölüme her girişte içeriği yeniden mount etmek için (giriş animasyonları)
  const [visits, setVisits] = useState<Record<number, number>>({});
  const lockRef = useRef(false);
  const { audioRef, currentSound } = useGlobalAudio();

  // Sayfa geçiş mantığı
  const go = (i: number) => {
    const next = Math.max(0, Math.min(TOTAL - 1, i));
    if (next === active || lockRef.current) return;
    lockRef.current = true;
    setActive(next);
    setVisits((v) => ({ ...v, [next]: (v[next] ?? 0) + 1 }));
    setTimeout(() => {
      lockRef.current = false;
    }, 750);
  };

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (showTerminal || Math.abs(e.deltaY) < 15) return;
      e.preventDefault();
      go(active + (e.deltaY > 0 ? 1 : -1));
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [active, showTerminal]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('error', (e) => {
        console.error('Audio error:', e, 'URL:', currentSound.url);
      });
    }
  }, [audioRef, currentSound.url]);

  const soundManagerDelay = showSplash ? undefined : 5000;

  return (
    <>
      <audio
        ref={audioRef}
        src={currentSound.url}
        loop
        preload="auto"
        onError={(e) => console.error('Audio element error:', e)}
      />

      {/* Başlangıç Ekranı */}
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      {/* Global Bileşenler */}
      <CustomCursor />
      <SiberHUD />
      <SoundManager autoHideDelay={soundManagerDelay} />
      <ScrollProgressBar currentPage={active} />
      {active === 0 && !showSplash && <ScrollDownHint />}
      <Terminal isOpen={showTerminal} onClose={() => setShowTerminal(false)} />

      {/* 3D KROM YILDIZ: ana sayfada ortada, diğer bölümlerde üst kenarda */}
      <Star3D active={active} />

      {/* ANA KONTEYNER */}
      <div className="relative h-screen overflow-hidden bg-neutral-950 select-none">
        {/* YAĞMUR EFEKTİ: z-0 ile en arkada */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <RainEffect count={50} />
        </div>

        {/* İÇERİK: z-10 ile yağmurun önünde */}
        <div
          className="relative z-10 h-screen transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{ transform: `translate3d(0, -${active * 100}vh, 0)` }}
        >
          {/* Home Section */}
          <section className="h-screen w-full flex items-center justify-center bg-transparent">
            <div className="flex flex-col items-center gap-6 pb-[140px]">
              {/* Yıldızın yer tuttuğu alan (logo buradan kalktı) */}
              <div
                aria-hidden
                className="h-[min(60vh,600px)] w-[min(60vh,600px)]"
              />
              <div className="text-5xl text-white">
                <TypingText text="revo667" speed={100} />
              </div>
            </div>
          </section>

          {/* Diğer Bölümler — key değişince giriş animasyonları tekrar oynar */}
          <section className="h-screen w-full bg-transparent">
            <LinksSection key={`links-${visits[1] ?? 0}`} />
          </section>

          <section className="h-screen w-full bg-transparent">
            <AboutSection key={`about-${visits[2] ?? 0}`} />
          </section>

          <section className="h-screen w-full bg-transparent">
            <PostsSection key={`posts-${visits[3] ?? 0}`} />
          </section>
        </div>
      </div>
    </>
  );
}

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [{ title: "revo667" }],
  }),
});