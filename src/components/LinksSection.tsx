import {
  GithubIcon,
  InstagramIcon,
  TiktokIcon,
  DiscordIcon,
  KickIcon,
  XIcon,
  YoutubeIcon,
} from "./SocialIcons";

const links = [
  { label: "GitHub", href: "https://github.com/revo667", Icon: GithubIcon },
  { label: "Instagram", href: "https://instagram.com/667revo", Icon: InstagramIcon },
  { label: "TikTok", href: "https://tiktok.com/@667revo", Icon: TiktokIcon },
  { label: "Discord", href: "https://discord.gg/667", Icon: DiscordIcon },
  { label: "Kick", href: "https://kick.com/667revo", Icon: KickIcon },
  { label: "X", href: "https://x.com/revo667", Icon: XIcon },
  { label: "YouTube", href: "https://youtube.com/@revocloser", Icon: YoutubeIcon },
];

export function LinksSection() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-6">
      <h2
        className="mb-12 text-4xl tracking-wide text-white/90 md:text-5xl animate-[fadeInDown_0.8s_ease-out]"
        style={{ fontFamily: "'ZF2334 After A Rain', sans-serif" }}
      >
        Links
      </h2>
      <div className="flex max-w-2xl flex-wrap items-center justify-center gap-5">
        {links.map(({ label, href, Icon }, index) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/80 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/50 hover:bg-white/10 hover:text-white hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] md:h-16 md:w-16 button-interactive"
            style={{
              animation: `slideInUp 0.6s ease-out ${index * 0.1}s backwards`
            }}
          >
            <Icon className="h-6 w-6 md:h-7 md:w-7 transition-transform duration-300 group-hover:scale-110" />
          </a>
        ))}
      </div>
    </div>
  );
}
