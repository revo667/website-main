export function AboutSection() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
      <h2
        className="mb-8 text-4xl tracking-wide text-white/90 md:text-5xl animate-[fadeInDown_0.8s_ease-out]"
        style={{ fontFamily: "'ZF2334 After A Rain', sans-serif" }}
      >
        About
      </h2>
      <p className="max-w-xl text-base leading-relaxed text-white/70 md:text-lg animate-[fadeInUp_0.8s_ease-out_0.2s_backwards]">
        Hi, Selim Yildiz as known as revo667. 20y/o
      </p>
      <span
        className="mt-8 text-sm tracking-widest text-white/40 animate-[fadeInUp_0.8s_ease-out_0.4s_backwards] hover:text-violet-400 transition-colors cursor-pointer"
        style={{ fontFamily: "'ZF2334 After A Rain', sans-serif" }}
      >
        Contact revo667@proton.me
      </span>
    </div>
  );
}
