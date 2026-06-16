import { useEffect, useState } from "react";

export function SiberHUD() {
  const [time, setTime] = useState("");
  const [latency, setLatency] = useState(24);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      // Saat, Dakika, Saniye ve Milisaniye formatı
      const h = now.getHours().toString().padStart(2, "0");
      const m = now.getMinutes().toString().padStart(2, "0");
      const s = now.getSeconds().toString().padStart(2, "0");
      const ms = now.getMilliseconds().toString().padStart(3, "0");

      setTime(`${h}:${m}:${s}.${ms}`);

      // Latency'yi hafifçe dalgalandırarak daha "siber" bir his verelim
      if (Math.random() > 0.95) {
        setLatency(Math.floor(Math.random() * 15) + 20);
      }
    }, 50); // 50ms güncelleme hızı ile milisaniyeler akıcı görünecek

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-6 left-6 z-[100] flex flex-col gap-1 font-mono text-[10px] tracking-widest text-white/50 border-l border-white/20 pl-4 pointer-events-none">
      <div className="flex gap-2">
        <span>LATENCY:</span>
        <span className="text-violet-500">{latency}ms</span>
      </div>
      <div className="flex gap-2">
        <span>PROJECT:</span>
        <span className="text-white/80">github revo667</span>
      </div>
      <div className="flex gap-2">
        <span>TIME:</span>
        <span className="text-white/80">{time}</span>
      </div>
    </div>
  );
}
