import { useState } from "react";
import { useTranslation } from "react-i18next";

type Project = {
  id: string;
  title: string;
  client: string;
  year: string;
  tag: string;
  discipline: string;
  image: string;
  accent: string; // Resgatado o suporte a cores customizadas por projeto[cite: 6]
};

const projects: Project[] = [
  {
    id: "001",
    title: "[Cliente 01] — Sistema de Marca",
    client: "Identidade",
    year: "2026",
    tag: "Branding · Web",
    discipline: "Design & UI Dev",
    image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1400",
    accent: "#534AB7", // Teu Roxo Primário
  },
  {
    id: "002",
    title: "[Cliente 02] — Site Institucional",
    client: "Website",
    year: "2025",
    tag: "Web · SEO",
    discipline: "Next.js · Performance",
    image: "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=1400",
    accent: "#02C39A", // Teu Verde Menta
  },
  {
    id: "003",
    title: "[Cliente 03] — E-commerce",
    client: "Loja Online",
    year: "2025",
    tag: "Web · UX",
    discipline: "E-commerce Engine",
    image: "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=1400",
    accent: "#7F77DD", // Teu Roxo Médio
  },
  {
    id: "004",
    title: "[Cliente 04] — Identidade Visual",
    client: "Identidade",
    year: "2024",
    tag: "Branding",
    discipline: "Visual System",
    image: "https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=1400",
    accent: "#534AB7",
  },
];

export default function Work() {
  const [hovered, setHovered] = useState<string | null>(null);
  const { t } = useTranslation();

  // Carrega a array do ticker traduzida e duplica para criar o loop contínuo perfeito
  const tickerItems = t("work.ticker", { returnObjects: true }) as string[];
  const doubledTicker = [...tickerItems, ...tickerItems];

  return (
    <section id="trabalho" className="relative bg-[#0F0E1A] text-white py-24 md:py-32">
      <div className="px-6 md:px-10 lg:px-14">
        
        {/* Section header — Alinhado com tipografia original da Versão 0[cite: 6] */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#02C39A] animate-pulse"></span>
              <span className="text-[11px] font-mono-tech tracking-[0.18em] text-white/60 uppercase">
                {t("work.label")}
              </span>
            </div>
            <h2 className="font-serif-display text-[44px] md:text-[64px] lg:text-[76px] leading-[0.98] tracking-[-0.03em] text-balance">
              {t("work.headline.p1")}
              <br />
              <span className="italic text-white/60">{t("work.headline.p2")}</span>
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-[14px] md:text-[15px] leading-[1.65] text-white/65">
              {t("work.description")}
            </p>
            <a
              href="#archive"
              className="mt-5 inline-flex items-center gap-2 text-[13px] font-medium text-white/90 hover:text-[#02C39A] border-b border-white/30 hover:border-[#02C39A] pb-0.5 transition-colors whitespace-nowrap"
            >
              {t("work.archive")}
            </a>
          </div>
        </div>

        {/* Projects grid — Restaurada a matemática exata de assimetria da Versão 0[cite: 6] */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-7">
          {projects.map((p, idx) => (
            <a
              key={p.id}
              href={`#work-${p.id}`}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
              className={`group relative block rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-500 ${
                // Se for o Case 1 (idx 0) ou Case 3 (idx 2), eles alinham no topo sem margem adicional
                idx === 0 || idx === 2 ? "lg:translate-y-0" : ""
              } ${
                // Apenas os Cases 2 (idx 1) e 4 (idx 3) recebem o recuo para criar o efeito cascata
                idx === 1 || idx === 3 ? "lg:mt-10" : ""
              }`}
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover object-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.06]"
                  draggable={false}
                />
                
                {/* Tag chip dinâmica */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-white/15 rounded-full px-3 py-1">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: p.accent }}
                  ></span>
                  <span className="text-[10.5px] font-mono-tech tracking-wider text-white/90 uppercase">
                    {p.tag}
                  </span>
                </div>

                {/* Hover CTA interativo */}
                <div
                  className={`absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white text-neutral-900 transition-all duration-500 ${
                    hovered === p.id ? "opacity-100 scale-100" : "opacity-0 scale-75"
                  }`}
                >
                  <i className="ri-arrow-right-up-line text-base"></i>
                </div>

                {/* Escurecimento inferior gradiente nativo */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent pointer-events-none"></div>
                
                {/* Metadados e Títulos */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                  <div>
                    <div className="text-[10.5px] font-mono-tech tracking-wider text-white/60 uppercase">
                      Case · {p.id} / {p.client}
                    </div>
                    <h3 className="mt-1 font-serif-display text-[22px] md:text-[26px] leading-tight text-white">
                      {p.title}
                    </h3>
                  </div>
                  <div className="hidden sm:block text-right">
                    <div className="text-[10.5px] font-mono-tech text-white/60 tracking-wider uppercase">
                      {p.year}
                    </div>
                    <div className="mt-0.5 text-[11px] text-white/75">{p.discipline}</div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Ticker / Marquee Horizontal — Integrado trilingue com fontes da Versão 0[cite: 6] */}
        <div className="mt-24 md:mt-32 overflow-hidden border-y border-white/10 py-5">
          <div className="flex gap-12 animate-marquee whitespace-nowrap text-white/40 font-serif-display text-[28px] md:text-[36px] italic">
            {doubledTicker.map((label, i) => (
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