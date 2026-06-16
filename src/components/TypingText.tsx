import { useState, useEffect } from "react";

interface TypingTextProps {
  text: string;
  speed?: number;
  className?: string;
}

export function TypingText({ text, speed = 120, className = "" }: TypingTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayed((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [index, text, speed]);

  useEffect(() => {
    const cursor = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursor);
  }, []);

  return (
    <span
      className={`inline-block transition-all duration-300 ease-out hover:scale-105 hover:drop-shadow-[0_0_15px_rgba(139,92,246,0.6)] cursor-pointer ${className}`}
    >
      {displayed}
      <span
        className={`inline-block h-[1em] w-[2px] translate-y-[1px] align-middle bg-white/80 ml-0.5 transition-opacity duration-100 ${showCursor ? "opacity-100" : "opacity-0"}`}
        aria-hidden="true"
      />
    </span>
  );
}
