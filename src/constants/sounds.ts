// src/constants/sounds.ts
import { CloudRain, CloudLightning, Waves, Music, LucideIcon } from "lucide-react";

export interface Sound {
  id: string;
  name: string;
  url: string;
  icon: LucideIcon;
}

export const SOUNDS: Sound[] = [
  {
    id: "kalbim", // Benzersiz bir ID
    name: "Kalbim <3", // Ekranda görünecek isim
    url: "/kalbim.mp3", // PUBLIC KLASÖRÜNDEKİ ADI (Başında / işareti olmalı)
    icon: Music, // İkon
  },
  {
    id: "heavy",
    name: "Fırtınalı Yağmur",
    url: "https://actions.google.com/sounds/v1/weather/rain_heavy_loud.ogg",
    icon: CloudRain,
  },
];
