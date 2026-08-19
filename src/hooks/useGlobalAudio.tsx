import {
  createContext,
  useContext,
  useRef,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { SOUNDS, Sound } from "../constants/sounds";
import { useMusicPreference } from "../hooks/useMusicPreference";

const PLAYING_KEY = "isAudioPlaying";
const VOLUME_KEY = "audioVolume";

interface GlobalAudioContextType {
  isPlaying: boolean;
  currentSound: Sound;
  volume: number;
  setIsPlaying: (playing: boolean) => void;
  setCurrentSound: (sound: Sound) => void;
  setVolume: (volume: number) => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  attachAudio: (el: HTMLAudioElement | null) => void;
  playAudio: () => Promise<void>;
}

const GlobalAudioContext = createContext<GlobalAudioContextType | undefined>(undefined);

export function GlobalAudioProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlayingState] = useState(false);
  const [currentSound, setCurrentSoundState] = useState<Sound>(SOUNDS[0]);
  const [volume, setVolumeState] = useState(0.15);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { selectedSound, saveMusic } = useMusicPreference();

  const volumeRef = useRef(volume);
  volumeRef.current = volume;

  const attachAudio = useCallback((el: HTMLAudioElement | null) => {
    audioRef.current = el;
    if (el) el.volume = volumeRef.current;
  }, []);

  useEffect(() => {
    const savedVolume = localStorage.getItem(VOLUME_KEY);
    if (savedVolume) {
      const vol = parseFloat(savedVolume);
      if (Number.isFinite(vol)) {
        const clamped = Math.min(1, Math.max(0, vol));
        setVolumeState(clamped);
        if (audioRef.current) audioRef.current.volume = clamped;
      }
    }

    const savedPlaying = localStorage.getItem(PLAYING_KEY);
    if (savedPlaying === "true") {
      setIsPlayingState(true);
    }
  }, []);

  useEffect(() => {
    if (selectedSound) {
      setCurrentSoundState(selectedSound);
      if (audioRef.current) {
        audioRef.current.src = selectedSound.url;
        audioRef.current.load();
        if (isPlaying) {
          audioRef.current.play().catch((error) => {
            console.error("Failed to play audio:", error, "URL:", selectedSound.url);
          });
        }
      }
    }
  }, [selectedSound, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Play error:", error);
        });
      } else {
        audioRef.current.pause();
      }
      localStorage.setItem(PLAYING_KEY, String(isPlaying));
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
    localStorage.setItem(VOLUME_KEY, String(volume));
  }, [volume]);

  const setIsPlaying = (playing: boolean) => {
    setIsPlayingState(playing);
  };

  const setCurrentSound = (sound: Sound) => {
    setCurrentSoundState(sound);
    saveMusic(sound);
    if (audioRef.current) {
      audioRef.current.src = sound.url;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Failed to play audio after sound change:", error, "URL:", sound.url);
        });
      }
    }
  };

  const playAudio = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
      } catch (error) {
        console.error("Play error:", error);
      }
    }
  };

  const setVolume = (vol: number) => {
    setVolumeState(vol);
  };

  return (
    <GlobalAudioContext.Provider
      value={{
        isPlaying,
        currentSound,
        volume,
        setIsPlaying,
        setCurrentSound,
        setVolume,
        audioRef,
        attachAudio,
        playAudio,
      }}
    >
      {children}
    </GlobalAudioContext.Provider>
  );
}

export function useGlobalAudio(): GlobalAudioContextType {
  const context = useContext(GlobalAudioContext);
  if (context === undefined) {
    throw new Error("useGlobalAudio must be used within GlobalAudioProvider");
  }
  return context;
}
