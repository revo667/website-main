import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// --- YÖNETİCİ ALANI ---
const ADMIN_POSTS = [
  {
    id: 1,
    title: "Sistem Güncellemesi",
    content: "Project published.",
    author: "revo667",
    date: "16.06.2026",
  },
  {
    id: 2,
    title: "Yeni Özellik",
    content: "New features added.",
    author: "revo667",
    date: "15.06.2026",
  },
  {
    id: 3,
    title: "Bug Fixes",
    content: "Several bugs fixed.",
    author: "revo667",
    date: "14.06.2026",
  },
];

export function PostsSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = 2;
  const totalPages = Math.ceil(ADMIN_POSTS.length / postsPerPage);

  const [likes, setLikes] = useState<Record<number, boolean>>({});

  useEffect(() => {
    console.log("PostsSection render edildi. Post sayısı:", ADMIN_POSTS.length);
  }, []);

  useEffect(() => {
    localStorage.setItem("currentPostsPage", String(currentPage));
    window.dispatchEvent(new Event("postsPageChange"));
  }, [currentPage]);

  const paginatedPosts = ADMIN_POSTS.slice(
    currentPage * postsPerPage,
    (currentPage + 1) * postsPerPage,
  );

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center p-6 font-mono relative bg-neutral-950/90">
      {/* BAŞLIK VE LOGO */}
      <div className="flex items-center gap-4 mb-12 animate-[fadeInDown_0.8s_ease-out]">
        <img
          src="/resim.png"
          alt="Logo"
          className="h-10 w-10 rounded-full border border-white/10 object-cover"
        />
        <h2 className="text-lg tracking-widest text-white uppercase">/POSTS_LOG</h2>
      </div>

      {/* ANA GÖVDE: POSTLAR */}
      <div className="flex items-center gap-8 w-full max-w-2xl justify-center px-4">
        {/* SOL OK */}
        <button
          onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
          disabled={currentPage === 0}
          className={`p-2 transition-all duration-300 flex-shrink-0 ${currentPage === 0 ? "opacity-20 cursor-not-allowed" : "opacity-100 hover:text-violet-500 hover:scale-110"} button-interactive`}
        >
          <ChevronLeft className="w-8 h-8 stroke-[1] text-white" />
        </button>

        {/* POST BALONCUKLARI */}
        <div className="flex-1 space-y-4">
          {paginatedPosts.length > 0 ? (
            paginatedPosts.map((post) => (
              <div
                key={post.id}
                className="relative p-6 rounded-2xl bg-neutral-900/40 border border-white/10 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-violet-500/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] animate-[fadeInUp_0.6s_ease-out] card-hover"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-neutral-800 flex items-center justify-center text-[10px] text-violet-500 font-bold">
                      {post.author[0].toUpperCase()}
                    </div>
                    <div>
                      <div className="text-xs text-white/80 font-bold">{post.author}</div>
                      <div className="text-[10px] text-white/30">{post.title}</div>
                    </div>
                  </div>
                  <div className="text-[10px] text-white/20 mt-1">{post.date}</div>
                </div>
                <p className="text-sm text-white/60 mb-4">{post.content}</p>
              </div>
            ))
          ) : (
            <div className="text-center text-white/20">Henüz kayıt yok.</div>
          )}
        </div>

        {/* SAĞ OK */}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
          disabled={currentPage === totalPages - 1 || totalPages === 0}
          className={`p-2 transition-all duration-300 flex-shrink-0 ${currentPage === totalPages - 1 || totalPages === 0 ? "opacity-20 cursor-not-allowed" : "opacity-100 hover:text-violet-500 hover:scale-110"} button-interactive`}
        >
          <ChevronRight className="w-8 h-8 stroke-[1] text-white" />
        </button>
      </div>

      {/* SAYFA İNDİKATÖRÜ */}
      <div className="mt-8 text-[10px] text-white/20 animate-[fadeInUp_0.8s_ease-out_0.2s_backwards]">
        {totalPages > 0 ? `${currentPage + 1} / ${totalPages}` : "0 / 0"}
      </div>
    </div>
  );
}
