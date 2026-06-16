export function GlitchText({ text }: { text: string }) {
  return (
    <div className="group relative inline-block cursor-default select-none">
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 opacity-0 group-hover:opacity-100 group-hover:text-purple-500 group-hover:translate-x-[2px] transition-all duration-75">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 opacity-0 group-hover:opacity-100 group-hover:text-blue-500 group-hover:-translate-x-[2px] transition-all duration-75">
        {text}
      </span>
    </div>
  );
}
