import { useState } from "react";

type Project = {
  id: string;
  title: string;
  client: string;
  year: string;
  tag: string;
  discipline: string;
  image: string;
  accent: string;
};

const projects: Project[] = [
  {
    id: "001",
    title: "Atlas Labs — Brand System",
    client: "Atlas Labs",
    year: "2026",
    tag: "Identity",
    discipline: "Brand · Motion · Web",
    image:
      "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1400",
    accent: "#FF6B3D",
  },
  {
    id: "002",
    title: "Solene — Fragrance Campaign",
    client: "Maison Solene",
    year: "2025",
    tag: "Campaign",
    discipline: "Art Direction · Print",
    image:
      "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=1400",
    accent: "#D9A86C",
  },
  {
    id: "003",
    title: "Northwind — Spatial Interface",
    client: "Northwind OS",
    year: "2025",
    tag: "Product",
    discipline: "Interface · 3D",
    image:
      "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=1400",
    accent: "#7CC4D9",
  },
  {
    id: "004",
    title: "Vermillion — Editorial Title",
    client: "Vermillion Press",
    year: "2024",
    tag: "Editorial",
    discipline: "Type · Print",
    image:
      "https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=1400",
    accent: "#C7402E",
  },
];

export default function Work() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="work" className="relative bg-[#0a0a0a] text-white py-24 md:py-32">
      {/* Section header */}
      <div className="px-6 md:px-10 lg:px-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
              <span className="text-[11px] font-mono-tech tracking-[0.18em] text-white/60 uppercase">
                Selected work · 2024 — 2026
              </span>
            </div>
            <h2 className="font-serif-display text-[44px] md:text-[64px] lg:text-[76px] leading-[0.98] tracking-[-0.03em] text-balance">
              Work that <span className="italic text-white/60">refuses</span>
              <br />
              the templates.
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-[14px] md:text-[15px] leading-[1.65] text-white/65">
              A small, fiercely selective slice of recent collaborations across brand,
              motion, product and editorial — each one shipped with care, color and
              quiet conviction.
            </p>
            <a
              href="#all-work"
              className="mt-5 inline-flex items-center gap-2 text-[13px] font-medium text-white/90 hover:text-white border-b border-white/30 hover:border-white pb-0.5 transition-colors whitespace-nowrap"
            >
              View the full archive
              <i className="ri-arrow-right-up-line text-base"></i>
            </a>
          </div>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-7">
          {projects.map((p, idx) => (
            <a
              key={p.id}
              href={`#work-${p.id}`}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
              className={`group relative block rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-500 ${
                idx % 3 === 0 ? "lg:translate-y-0" : ""
              } ${idx === 1 ? "lg:mt-10" : ""} ${idx === 3 ? "lg:mt-10" : ""}`}
            >
              {/* Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover object-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.06]"
                  draggable={false}
                />
                {/* Tag chip */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-white/15 rounded-full px-3 py-1">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: p.accent }}
                  ></span>
                  <span className="text-[10.5px] font-mono-tech tracking-wider text-white/90 uppercase">
                    {p.tag}
                  </span>
                </div>
                {/* Hover CTA */}
                <div
                  className={`absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white text-neutral-900 transition-all duration-500 ${
                    hovered === p.id ? "opacity-100 scale-100" : "opacity-0 scale-75"
                  }`}
                >
                  <i className="ri-arrow-right-up-line text-base"></i>
                </div>
                {/* Bottom gradient */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent pointer-events-none"></div>
                {/* Footer info on image */}
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

        {/* Inline marquee strip */}
        <div className="mt-16 md:mt-20 overflow-hidden border-y border-white/10 py-5">
          <div className="flex gap-12 animate-marquee whitespace-nowrap text-white/40 font-serif-display text-[28px] md:text-[36px] italic">
            {[
              "Brand systems",
              "Motion identity",
              "Editorial direction",
              "Product design",
              "Spatial interface",
              "Type & lettering",
              "Brand systems",
              "Motion identity",
              "Editorial direction",
              "Product design",
              "Spatial interface",
              "Type & lettering",
            ].map((label, i) => (
              <span key={i} className="flex items-center gap-12">
                <span>{label}</span>
                <span className="w-2 h-2 rounded-full bg-white/30"></span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}