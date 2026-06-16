import { useState, useEffect } from "react";
import { Volume2, VolumeX, Music, Pause, Play } from "lucide-react";
import { SOUNDS, Sound } from "../constants/sounds";
import { useGlobalAudio } from "../hooks/useGlobalAudio";

export function SoundManager({ autoHideDelay }: { autoHideDelay?: number }) {
  const [showPanel, setShowPanel] = useState(true);

  useEffect(() => {
    if (autoHideDelay) {
      const timer = setTimeout(() => {
        setShowPanel(false);
      }, autoHideDelay);
      return () => clearTimeout(timer);
    }
  }, [autoHideDelay]);
  const { isPlaying, currentSound, volume, setIsPlaying, setCurrentSound, setVolume } =
    useGlobalAudio();

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const changeSound = (sound: Sound) => {
    setCurrentSound(sound);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 font-mono">
      {/* Ana Panel */}
      {showPanel && (
        <div className="bg-neutral-950/80 backdrop-blur-xl border border-violet-500/30 rounded-lg p-5 shadow-[0_0_30px_rgba(139,92,246,0.2)] w-64 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Başlık */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2 text-violet-400">
              <Music size={14} className="animate-pulse" />
              <span className="text-xs uppercase tracking-wider font-semibold">Müzik Çalar</span>
            </div>
            <button
              onClick={() => setShowPanel(false)}
              className="text-white/40 hover:text-white/80 transition-colors text-lg leading-none"
            >
              ×
            </button>
          </div>

          {/* Şu Çalan Şarkı */}
          <div className="mb-4 p-3 bg-violet-500/10 border border-violet-500/20 rounded text-center">
            <p className="text-[10px] uppercase tracking-wider text-white/50 mb-1">Şu Anda</p>
            <p className="text-sm font-bold text-violet-300 truncate">{currentSound.name}</p>
            {isPlaying && (
              <div className="flex items-center justify-center gap-1 mt-2">
                <span className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-[10px] text-green-400 uppercase tracking-wider">Çalıyor</span>
              </div>
            )}
          </div>

          {/* Müzik Listesi */}
          <div className="flex flex-col gap-2 mb-4 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-violet-500/30 scrollbar-track-transparent">
            {SOUNDS.map((sound: Sound) => {
              const isSelected = currentSound.id === sound.id;
              return (
                <button
                  key={sound.id}
                  onClick={() => changeSound(sound)}
                  className={`text-xs uppercase tracking-wider px-3 py-2 rounded border-l-4 transition-all text-left ${
                    isSelected
                      ? "bg-violet-500/20 border-violet-500 text-violet-300 font-semibold shadow-[0_0_10px_rgba(139,92,246,0.3)]"
                      : "bg-white/5 border-white/10 text-white/50 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {sound.name}
                </button>
              );
            })}
          </div>

          {/* Volume Kontrol */}
          <div className="mb-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-2 mb-2">
              {volume === 0 ? (
                <VolumeX size={14} className="text-white/40 flex-shrink-0" />
              ) : volume < 0.5 ? (
                <Volume2 size={14} className="text-blue-400 flex-shrink-0" />
              ) : (
                <Volume2 size={14} className="text-violet-400 flex-shrink-0" />
              )}
              <span className="text-[10px] text-white/40 ml-auto">{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-full accent-violet-500 appearance-none cursor-pointer hover:accent-violet-400 transition-all"
            />
          </div>

          {/* Kontrol Butonları */}
          <div className="flex gap-2">
            <button
              onClick={togglePlay}
              className={`flex-1 py-2.5 text-xs uppercase tracking-wider font-semibold rounded transition-all flex items-center justify-center gap-1.5 button-interactive ${
                isPlaying
                  ? "bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30"
                  : "bg-green-500/20 text-green-400 border border-green-500/50 hover:bg-green-500/30"
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause size={12} />
                  Durdur
                </>
              ) : (
                <>
                  <Play size={12} />
                  Çal
                </>
              )}
            </button>

            <button
              onClick={() => setShowPanel(false)}
              className="flex-1 py-2.5 text-xs uppercase tracking-wider font-semibold rounded bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 transition-all button-interactive"
            >
              Gizle
            </button>
          </div>
        </div>
      )}

      {/* Gizlenmiş Panel - Mini Buton */}
      {!showPanel && (
        <button
          onClick={() => setShowPanel(true)}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-violet-500/20 border border-violet-500/50 text-violet-400 hover:bg-violet-500/30 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]"
          title="Müzik Çalarını Aç"
        >
          <Music size={20} className={isPlaying ? "animate-pulse" : ""} />
        </button>
      )}
    </div>
  );
}
