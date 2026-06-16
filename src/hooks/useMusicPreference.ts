import { useEffect, useState } from "react";
import { SOUNDS, Sound } from "../constants/sounds";

const STORAGE_KEY = "selectedMusic";

export function useMusicPreference() {
  const [selectedSound, setSelectedSound] = useState<Sound | null>(null);

  // Kaydedilen müziği yükle
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const sound = SOUNDS.find((s) => s.id === parsed.id);
        if (sound) {
          setSelectedSound(sound);
        } else {
          setSelectedSound(SOUNDS[0]);
        }
      } catch {
        setSelectedSound(SOUNDS[0]);
      }
    } else {
      setSelectedSound(SOUNDS[0]);
    }
  }, []);

  // Müzik seçimi değiştiğinde kaydet
  const saveMusic = (sound: Sound) => {
    setSelectedSound(sound);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ id: sound.id }));
  };

  return { selectedSound, saveMusic };
}
