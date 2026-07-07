import { useState } from "react";

type Project = {
  id: string;
  title: string;
  client: string;
  year: string;
  tag: string;
  discipline: string;
  image: string;
};

const projects: Project[] = [
  {
    id: "001",
    title: "[Cliente 01] — Sistema de Marca",
    client: "Identidade",
    year: "2026",
    tag: "Branding · Web",
    discipline: "Design de Identidade & Web",
    image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1400",
  },
  {
    id: "002",
    title: "[Cliente 02] — Site Institucional",
    client: "Website",
    year: "2025",
    tag: "Web · SEO",
    discipline: "Desenvolvimento & Otimização",
    image: "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=1400",
  },
  {
    id: "003",
    title: "[Cliente 03] — E-commerce",
    client: "Loja Online",
    year: "2025",
    tag: "Web · UX",
    discipline: "Loja Virtual Completa",
    image: "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=1400",
  },
  {
    id: "004",
    title: "[Cliente 04] — Identidade Visual",
    client: "Identidade",
    year: "2024",
    tag: "Branding",
    discipline: "Design Visual e Marca",
    image: "https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=1400",
  },
];

export default function Work() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="trabalho" className="relative bg-[#0F0E1A] text-white py-24 md:py-32">
      <div className="px-6 md:px-10 lg:px-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#02C39A]"></span>
              <span className="text-[11px] font-mono tracking-[0.18em] text-white/60 uppercase">
                • TRABALHO SELECIONADO · 2024 — 2026
              </span>
            </div>
            <h2 className="font-serif text-[44px] md:text-[64px] lg:text-[76px] leading-[0.98] tracking-[-0.03em] text-balance">
              Sites que recusam<br />
              <span className="italic text-[#7F77DD]">parecer todos iguais.</span>
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-[14px] md:text-[15px] leading-[1.65] text-white/65">
              Uma seleção de projetos recentes — sites institucionais, lojas online e identidades visuais — cada um feito com atenção ao detalhe e pensado para converter.
            </p>
            <a
              href="#archive"
              className="mt-5 inline-flex items-center gap-2 text-[13px] font-medium text-white/90 hover:text-[#02C39A] border-b border-white/30 hover:border-[#02C39A] pb-0.5 transition-colors whitespace-nowrap"
            >
              Ver o arquivo completo ↗
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-7">
          {projects.map((p, idx) => (
            <a
              key={p.id}
              href={`#work-${p.id}`}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
              className={`group relative block rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-sm transition-all duration-500 ${
                idx === 1 || idx === 3 ? "lg:mt-10" : ""
              }`}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover object-center transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                  draggable={false}
                />
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-3 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#02C39A]"></span>
                  <span className="text-[10.5px] font-mono tracking-wider text-white/95 uppercase">
                    {p.tag}
                  </span>
                </div>
                <div
                  className={`absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-[#02C39A] text-neutral-900 transition-all duration-500 ${
                    hovered === p.id ? "opacity-100 scale-100" : "opacity-0 scale-75"
                  }`}
                >
                  <i className="ri-arrow-right-up-line text-base text-white"></i>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0F0E1A] to-transparent pointer-events-none"></div>
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                  <div>
                    <div className="text-[10.5px] font-mono text-white/50 uppercase">
                      {p.client} · {p.id}
                    </div>
                    <h3 className="mt-1 font-serif text-[22px] md:text-[26px] leading-tight text-white">
                      {p.title}
                    </h3>
                  </div>
                  <div className="hidden sm:block text-right">
                    <span className="text-[11px] text-white/60 font-mono">{p.year}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* SECÇÃO 3 — TICKER AJUSTADO SEM MAREKTING */}
        <div className="mt-24 md:mt-32 overflow-hidden border-y border-white/15 py-6">
          <div className="flex gap-12 animate-marquee whitespace-nowrap text-white/40 font-serif text-[24px] md:text-[32px] italic">
            {[
              "Websites institucionais", "Landing pages de alta conversão", "Web Development", "Portfólios Digitais", "Arquitetura Web", "Código Limpo", "Otimização SEO",
              "Websites institucionais", "Landing pages de alta conversão", "Web Development", "Portfólios Digitais", "Arquitetura Web", "Código Limpo", "Otimização SEO"
            ].map((label, i) => (
              <span key={i} className="flex items-center gap-12">
                <span>{label}</span>
                <span className="w-2 h-2 rounded-full bg-[#534AB7]"></span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}