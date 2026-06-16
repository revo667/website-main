import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Sliders, CloudRain, CloudLightning, Waves } from "lucide-react";

const SOUNDS = [
  {
    id: "heavy",
    name: "Fırtınalı Yağmur",
    url: "https://actions.google.com/sounds/v1/weather/rain_heavy_loud.ogg",
    icon: CloudRain,
  },
  {
    id: "thunder",
    name: "Gök Gürültüsü",
    url: "https://actions.google.com/sounds/v1/weather/thunder_crack.ogg",
    icon: CloudLightning,
  },
  {
    id: "soft",
    name: "Cama Vuran Yağmur",
    url: "https://actions.google.com/sounds/v1/weather/fine_constant_rain.ogg",
    icon: Waves,
  },
];

export function AmbientSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [currentSound, setCurrentSound] = useState(SOUNDS[0]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const audio = new Audio(currentSound.url);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }

    const handleMKey = (e: KeyboardEvent) => {
      if (
        e.key.toLowerCase() === "m" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        toggleSound();
      }
    };
    window.addEventListener("keydown", handleMKey);

    return () => {
      audio.pause();
      window.removeEventListener("keydown", handleMKey);
    };
  }, [currentSound]);

  const toggleSound = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log(err));
    }
  };

  const handleVolumeChange = (v: number) => {
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  const changeSound = (sound: (typeof SOUNDS)[0]) => {
    setIsPlaying(false);
    if (audioRef.current) audioRef.current.pause();
    setCurrentSound(sound);
    setIsPlaying(true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* SOLID SLIDE-UP PANEL ANIMASYONU */}
      {isOpen && (
        <div
          className="flex w-56 flex-col gap-4 rounded-2xl border border-white/10 bg-neutral-950/95 p-4 backdrop-blur-2xl shadow-2xl origin-bottom"
          style={{
            animation: "solidSlideUp 350ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
        >
          <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/30">
            Atmosfer Mikseri
          </div>

          <div className="flex flex-col gap-1.5">
            {SOUNDS.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => changeSound(s)}
                  className={`flex items-center gap-3 w-full rounded-xl p-2 text-left text-xs transition-all active:scale-[0.98] ${
                    currentSound.id === s.id
                      ? "bg-white text-black font-bold"
                      : "text-white/60 hover:bg-white/5"
                  }`}
                  style={{ transition: "all 200ms cubic-bezier(0.16, 1, 0.3, 1)" }}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span className="truncate">{s.name}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-[10px] text-white/40 font-mono">
              <span>VOLUME</span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white transition-all"
            />
          </div>
        </div>
      )}

      {/* BUTON GRUBU */}
      <div className="flex gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/10 backdrop-blur-md transition-all active:scale-90 ${isOpen ? "bg-white text-black border-white" : "bg-neutral-900/60 text-white/60 hover:text-white"}`}
          style={{ transition: "all 250ms cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <Sliders className="h-4 w-4" />
        </button>
        <button
          onClick={toggleSound}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-neutral-900/60 text-white/60 backdrop-blur-md transition-all active:scale-90 hover:text-white"
          style={{ transition: "all 250ms cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          {isPlaying ? (
            <Volume2 className="h-4 w-4 text-white" />
          ) : (
            <VolumeX className="h-4 w-4 text-white/40" />
          )}
        </button>
      </div>
    </div>
  );
}
