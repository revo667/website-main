import { useState, useRef, useEffect } from "react";

// 1. ADIM: Sabit mesajlarını buraya yazıyorsun.
// Burayı değiştirdiğinde her şey otomatik güncellenir.
const ADMIN_MESSAGES = [
  "REVO667_SYSTEM_READY",
  "Sistem: Online",
  "Yönetici notu: Web siteme hoş geldiniz.",
  "Yardım için 'help' yazın.",
];

export function Terminal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  // 2. ADIM: Sadece kullanıcının yazdıklarını 'sessionStorage'da tutuyoruz.
  const [history, setHistory] = useState<string[]>(() => {
    const saved = sessionStorage.getItem("revo667_term_history");
    return saved ? JSON.parse(saved) : [];
  });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  // SessionStorage'a kaydet
  useEffect(() => {
    sessionStorage.setItem("revo667_term_history", JSON.stringify(history));
  }, [history]);

  const handleCommand = (cmd: string) => {
    const c = cmd.trim().toLowerCase();
    let response = "";

    // Basit komut mantığı
    if (c === "help") response = "Komutlar: clear, github";
    else if (c === "clear") {
      setHistory([]);
      return;
    } else if (c === "github") {
      window.open("https://github.com/revo667", "_blank");
      response = "GitHub açılıyor...";
    } else response = `Bilinmeyen komut: ${c}`;

    setHistory((prev) => [...prev, `> ${cmd}`, response]);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl h-[400px] bg-neutral-900 border border-white/20 p-6 font-mono text-sm shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* YÖNETİCİ MESAJLARI (Sabitler) */}
        {ADMIN_MESSAGES.map((msg, i) => (
          <div key={`admin-${i}`} className="text-violet-500 mb-1">
            {msg}
          </div>
        ))}

        {/* ZİYARETÇİ GEÇMİŞİ (Geçici) */}
        {history.map((line, i) => (
          <div key={`user-${i}`} className="text-white/70 mb-1">
            {line}
          </div>
        ))}

        <div className="flex gap-2 mt-4 text-white">
          <span>&gt;</span>
          <input
            ref={inputRef}
            className="flex-1 bg-transparent outline-none border-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCommand(e.currentTarget.value);
                e.currentTarget.value = "";
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
