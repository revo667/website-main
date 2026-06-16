import { useEffect, useState, useRef } from "react";
import { Volume2, VolumeX, Music, Play } from "lucide-react";
import { SOUNDS, Sound } from "../constants/sounds";
import { useGlobalAudio } from "../hooks/useGlobalAudio";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [showMusicSelector, setShowMusicSelector] = useState(true);
  const pulseRef = useRef<number | null>(null);
  const { isPlaying, currentSound, volume, setIsPlaying, setCurrentSound, setVolume, audioRef, playAudio } =
    useGlobalAudio();

  const [displayedText, setDisplayedText] = useState("");
  const text = "revo667";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayedText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSoundChange = (sound: Sound) => {
    setCurrentSound(sound);
  };

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume, audioRef]);

  const handlePlayClick = () => {
    if (!clicked) {
      setClicked(true);
      setShowMusicSelector(false);
      setIsPlaying(true);

      if (audioRef.current) {
        audioRef.current.src = currentSound.url;
        audioRef.current.load();
        audioRef.current.play().catch((error) => {
          console.error('Failed to play audio on splash screen:', error);
        });
      }

      setTimeout(() => {
        setFadeOut(true);
      }, 500);

      setTimeout(() => {
        onComplete();
      }, 1300);
    }
  };

  useEffect(() => {
    if (clicked) return;

    pulseRef.current = window.setInterval(() => {
      setDisplayedText((prev) => {
        const element = document.querySelector(".splash-title");
        if (element) {
          element.classList.toggle("opacity-80");
        }
        return prev;
      });
    }, 1500);

    return () => {
      if (pulseRef.current) clearInterval(pulseRef.current);
    };
  }, [clicked]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 transition-all duration-1000 ease-in-out select-none ${
        fadeOut ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 pointer-events-auto"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 px-4">
        <div className="text-center">
          <h1
            className="splash-title text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 drop-shadow-[0_0_60px_rgba(139,92,246,0.8)] transition-opacity duration-500"
            style={{
              fontFamily: "sans-serif",
              fontWeight: "900",
              letterSpacing: "-0.05em",
              textShadow: "0 0 80px rgba(139, 92, 246, 0.6), 0 0 30px rgba(168, 85, 247, 0.4)",
            }}
          >
            {displayedText}
            {displayedText.length < text.length && <span className="animate-pulse">|</span>}
          </h1>
        </div>

        {showMusicSelector && (
          <div className="bg-neutral-900/80 backdrop-blur-xl border border-violet-500/30 rounded-lg p-6 w-full max-w-sm shadow-[0_0_40px_rgba(139,92,246,0.3)] animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-2 mb-4 text-violet-400">
              <Music size={16} />
              <span className="text-xs uppercase tracking-wider font-semibold">Müzik Seç</span>
            </div>

            <div className="flex flex-col gap-2 mb-4 max-h-48 overflow-y-auto">
              {SOUNDS.map((sound: Sound) => {
                const isSelected = currentSound.id === sound.id;
                return (
                  <button
                    key={sound.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSoundChange(sound);
                    }}
                    className={`text-xs uppercase tracking-wider px-3 py-2 rounded-sm border-l-4 transition-all ${
                      isSelected
                        ? "bg-violet-500/20 border-violet-500 text-violet-300 font-semibold"
                        : "bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {sound.name}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 mb-4 px-1">
              {volume === 0 ? (
                <VolumeX size={14} className="text-white/40 flex-shrink-0" />
              ) : (
                <Volume2 size={14} className="text-violet-400 flex-shrink-0" />
              )}
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                  e.stopPropagation();
                  setVolume(parseFloat(e.target.value));
                }}
                className="w-full h-1.5 bg-white/10 rounded-full accent-violet-500 appearance-none cursor-pointer"
              />
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePlayClick();
              }}
              className={`w-full py-3 text-xs uppercase tracking-wider font-semibold rounded-sm transition-all flex items-center justify-center gap-2 button-interactive ${
                isPlaying
                  ? "bg-green-500/20 text-green-400 border border-green-500/50"
                  : "bg-violet-500/20 text-violet-400 border border-violet-500/50 hover:bg-violet-500/30"
              }`}
            >
              <Play size={14} />
              {isPlaying ? "Çalıyor - Siteyi Aç" : "Çal Ve Siteyi Aç"}
            </button>
          </div>
        )}

        <div
          className={`text-center transition-all duration-500 ${clicked ? "opacity-0 scale-90" : "opacity-100 scale-100"}`}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-white/40 animate-pulse font-mono mb-2">
            Müziği Seç Ve Başla
          </p>
          <div className="flex items-center justify-center gap-2">
            <div
              className="w-1 h-1 bg-violet-500 rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            ></div>
            <p className="text-sm uppercase tracking-widest text-violet-400/80 font-semibold">
              Tikla → Aç
            </p>
            <div
              className="w-1 h-1 bg-violet-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>

        <div
          className={`text-center transition-all duration-500 ${clicked ? "opacity-0" : "opacity-100"}`}
        >
          <p className="text-[10px] uppercase tracking-wider text-white/20">
            Siteni keşfetmeye başla
          </p>
        </div>
      </div>

      <div className="absolute top-4 left-4 w-20 h-20 border border-violet-500/30 rounded-lg pointer-events-none opacity-40"></div>
      <div
        className="absolute bottom-4 right-4 w-20 h-20 border border-cyan-500/20 rounded-lg pointer-events-none opacity-30"
        style={{ transform: "rotate(45deg)" }}
      ></div>
    </div>
  );
}
