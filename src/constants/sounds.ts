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
    id: "likeastar",
    name: "Like a Star",
    url: "/likeastar.mp3",
    icon: Music,
  },
  {
    id: "kalbim",
    name: "Kalbim <3",
    url: "/kalbim.mp3",
    icon: Music,
  },
  {
    id: "heavy",
    name: "Fırtınalı Yağmur",
    url: "https://actions.google.com/sounds/v1/weather/rain_heavy_loud.ogg",
    icon: CloudRain,
  },
];
