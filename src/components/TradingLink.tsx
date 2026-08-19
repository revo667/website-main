const TRADING_URL = "https://trading.revo667.com";
export function TradingLink() {
  return (
    <a
      href={TRADING_URL}
      className="group fixed top-6 right-6 z-[100] flex items-center gap-2 border-r border-white/20 pr-4 font-mono text-[10px] tracking-widest text-white/50 transition-colors duration-300 hover:text-white"
    >
      <span className="h-1 w-1 rounded-full bg-violet-500 shadow-[0_0_6px_1px_rgba(139,92,246,0.8)] transition-transform duration-300 group-hover:scale-150" />
      <span>TRADING</span>
      <span
        aria-hidden
        className="translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
      >
        ↗
      </span>
    </a>
  );
}
