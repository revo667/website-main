import { useState } from "react";
import { Music, Play, Volume2 } from "lucide-react";
import { SOUNDS, Sound } from "@/constants/sounds";
import { useGlobalAudio } from "@/hooks/useGlobalAudio";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const { currentSound, setCurrentSound, volume, setVolume, setIsPlaying, playAudio } =
    useGlobalAudio();
  const [clicked, setClicked] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const handleOpen = () => {
    if (clicked) return;
    setClicked(true);
    setIsPlaying(true);
    playAudio();

    // Kart ve ipuçları önce kaybolur, sonra tüm ekran fade + scale ile çıkar
    setTimeout(() => setLeaving(true), 500);
    setTimeout(() => onComplete(), 1300);
  };

  const selectSound = (sound: Sound) => {
    setCurrentSound(sound);
  };

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 transition-all duration-1000 ease-in-out ${
        leaving ? "pointer-events-none scale-105 opacity-0" : "scale-100 opacity-100"
      }`}
    >
      {/* Arka plan ışıkları */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-80 w-80 animate-pulse rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 animate-pulse rounded-full bg-cyan-600/10 blur-3xl [animation-delay:1s]" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 px-4">
        <h1 className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-[clamp(48px,8vw,96px)] font-black tracking-tighter text-transparent drop-shadow-[0_0_60px_rgba(139,92,246,0.8)]">
          revo667
        </h1>

        {/* Müzik seçimi */}
        <div
          className={`w-full max-w-sm rounded-lg border border-violet-500/30 bg-neutral-900/80 p-6 shadow-[0_0_40px_rgba(139,92,246,0.3)] backdrop-blur-md transition-all duration-500 ${
            clicked ? "hidden" : "animate-in fade-in slide-in-from-bottom-4"
          }`}
        >
          <div className="mb-4 flex items-center gap-2 text-violet-400">
            <Music className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Müzik Seç</span>
          </div>

          <div className="mb-4 flex flex-col gap-2">
            {SOUNDS.map((sound) => {
              const selected = sound.id === currentSound.id;
              const Icon = sound.icon;
              return (
                <button
                  key={sound.id}
                  onClick={() => selectSound(sound)}
                  className={`flex items-center gap-2 rounded border-l-4 px-3 py-2 text-left text-xs uppercase tracking-wider transition-all duration-200 ${
                    selected
                      ? "border-violet-500 bg-violet-500/20 font-semibold text-violet-300"
                      : "border-white/10 bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {sound.name}
                </button>
              );
            })}
          </div>

          <div className="mb-4 flex items-center gap-2 px-1">
            <Volume2 className="h-3.5 w-3.5 text-violet-400" />
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="h-1.5 w-full accent-violet-500"
            />
          </div>

          <button
            onClick={handleOpen}
            className="flex w-full items-center justify-center gap-2 rounded-sm border border-violet-500/50 bg-violet-500/20 py-3 text-xs font-semibold uppercase tracking-wider text-violet-400 transition-all duration-300 hover:bg-violet-500/30 hover:text-violet-300"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>Çal Ve Siteyi Aç</span>
          </button>
        </div>

        {/* İpuçları */}
        <div
          className={`text-center transition-all duration-500 ${
            clicked ? "opacity-0" : "opacity-100"
          }`}
        >
          <p className="mb-2 animate-pulse text-xs uppercase tracking-[0.2em] text-white/40">
            Müziği Seç Ve Başla
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="h-1 w-1 animate-bounce rounded-full bg-violet-500" />
            <p className="text-sm font-semibold uppercase tracking-widest text-violet-400/80">
              Tikla → Aç
            </p>
            <div className="h-1 w-1 animate-bounce rounded-full bg-violet-500 [animation-delay:0.2s]" />
          </div>
        </div>
      </div>

      {/* Köşe süsleri */}
      <div className="pointer-events-none absolute left-4 top-4 h-20 w-20 rounded-lg border border-violet-500/30 opacity-40" />
      <div className="pointer-events-none absolute bottom-4 right-4 h-20 w-20 rotate-45 rounded-lg border border-cyan-500/20 opacity-30" />
    </div>
  );
}

export default SplashScreen;
