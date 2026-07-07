import { useState } from "react";

const teamMembers = [
  {
    name: "Luca Marín",
    role: "Founder · Creative Direction",
    image:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Mira Okafor",
    role: "Design Principal · Brand Systems",
    image:
      "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Soren Helm",
    role: "Motion · 3D Lead",
    image:
      "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Yui Tanabe",
    role: "Type · Editorial Design",
    image:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const stats = [
  { value: "09", suffix: ".8", label: "Years quietly making things" },
  { value: "12", suffix: "", label: "Humans across 4 cities" },
  { value: "47", suffix: "+", label: "Awarded projects shipped" },
  { value: "100", suffix: "%", label: "Founder-direct collaborations" },
];

export default function Studio() {
  const [activeMember, setActiveMember] = useState(0);

  return (
    <section
      id="studio"
      className="relative bg-[#f3ede4] text-neutral-900 py-24 md:py-32 overflow-hidden"
    >
      {/* Decorative blurred blobs - warmer & more saturated orange tones */}
      <div className="absolute -top-40 -left-32 w-[560px] h-[560px] rounded-full bg-[#FF6B3D]/55 blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 -right-24 w-[460px] h-[460px] rounded-full bg-[#FF8A4C]/45 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-[420px] h-[420px] rounded-full bg-[#E85A2C]/35 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-10 w-[380px] h-[380px] rounded-full bg-[#D9A86C]/50 blur-3xl pointer-events-none"></div>

      <div className="relative px-6 md:px-10 lg:px-14">
        {/* Eyebrow + headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-16 md:mb-24">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-[#FF6B3D] shadow-[0_0_0_4px_rgba(255,107,61,0.18)]"></span>
              <span className="text-[11px] font-mono-tech tracking-[0.18em] text-[#C7402E] uppercase font-semibold">
                The studio · est. 2017
              </span>
            </div>
            <h2 className="font-serif-display text-[44px] md:text-[64px] lg:text-[80px] leading-[0.98] tracking-[-0.03em] text-balance">
              A tiny studio
              <br />
              <span className="italic text-[#E85A2C]">in love with</span>
              <br />
              colour, craft & code.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-8">
            <p className="text-[15px] md:text-[16px] leading-[1.7] text-neutral-700 max-w-md">
              NOVA was founded in a sunlit Lisbon attic on the belief that great
              brands are made by humans who actually like each other. We stay small
              on purpose — twelve people, one studio, no account managers between
              you and the work.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#start"
                className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white text-[13px] font-medium px-5 py-3 rounded-full transition-colors whitespace-nowrap"
              >
                Meet the team
                <i className="ri-arrow-right-up-line"></i>
              </a>
              <a
                href="#manifesto"
                className="inline-flex items-center gap-2 text-[13px] font-medium text-neutral-700 hover:text-neutral-900 border-b border-neutral-400 hover:border-neutral-900 pb-0.5 transition-colors whitespace-nowrap"
              >
                Read our manifesto
              </a>
            </div>
          </div>
        </div>

        {/* Studio scene image + team panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-7">
          {/* Studio scene */}
          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden aspect-[5/4] lg:aspect-auto lg:h-[560px] group">
            <img
              src="https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=1400"
              alt="NOVA studio interior in warm afternoon light"
              className="w-full h-full object-cover object-center transition-transform duration-[1500ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105"
              draggable={false}
            />
            {/* Float card */}
            <div className="absolute bottom-5 left-5 right-5 md:right-auto md:max-w-xs bg-white/85 backdrop-blur-xl rounded-xl p-4 border border-white/60">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#FF6B3D] text-white">
                  <i className="ri-map-pin-2-line text-sm"></i>
                </div>
                <div>
                  <div className="text-[11px] font-mono-tech tracking-wider text-neutral-500 uppercase">
                    Lisbon · HQ
                  </div>
                  <div className="text-[13px] font-medium text-neutral-900">
                    Rua das Janelas Verdes 47
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-neutral-200 flex items-center justify-between">
                <span className="text-[11px] text-neutral-500">Open studio</span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono-tech text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Thurs · 14 — 18h
                </span>
              </div>
            </div>
          </div>

          {/* Stats + team picker */}
          <div className="lg:col-span-5 flex flex-col gap-5 md:gap-7">
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-white/70 backdrop-blur-md border border-white/80 rounded-2xl p-5"
                >
                  <div className="font-serif-display text-[40px] md:text-[44px] leading-none text-neutral-900">
                    {s.value}
                    <span className="text-[#FF6B3D]">{s.suffix}</span>
                  </div>
                  <div className="mt-2 text-[12px] text-neutral-600 leading-snug">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Team picker */}
            <div className="bg-neutral-900 text-white rounded-2xl p-5 md:p-6 flex-1 flex flex-col">
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-mono-tech tracking-wider text-white/60 uppercase">
                  Meet · 04 of 12
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() =>
                      setActiveMember((p) => (p - 1 + teamMembers.length) % teamMembers.length)
                    }
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                    aria-label="previous"
                  >
                    <i className="ri-arrow-left-line text-sm"></i>
                  </button>
                  <button
                    onClick={() =>
                      setActiveMember((p) => (p + 1) % teamMembers.length)
                    }
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                    aria-label="next"
                  >
                    <i className="ri-arrow-right-line text-sm"></i>
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                  <img
                    src={teamMembers[activeMember].image}
                    alt={teamMembers[activeMember].name}
                    className="w-full h-full object-cover object-top transition-opacity duration-500"
                    draggable={false}
                  />
                </div>
                <div>
                  <div className="font-serif-display text-[24px] leading-tight">
                    {teamMembers[activeMember].name}
                  </div>
                  <div className="text-[12px] text-white/65 mt-1">
                    {teamMembers[activeMember].role}
                  </div>
                </div>
              </div>

              <div className="mt-5 flex gap-2">
                {teamMembers.map((m, i) => (
                  <button
                    key={m.name}
                    onClick={() => setActiveMember(i)}
                    className={`flex-1 h-1 rounded-full transition-colors ${
                      i === activeMember ? "bg-white" : "bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`go to ${m.name}`}
                  ></button>
                ))}
              </div>

              <div className="mt-auto pt-5 grid grid-cols-3 gap-3 text-[11px] font-mono-tech tracking-wider text-white/55 uppercase">
                <span className="flex items-center gap-1.5">
                  <i className="ri-cup-line"></i> Lisbon
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="ri-mist-line"></i> Tokyo
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="ri-pen-nib-line"></i> Mexico CDMX
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}