const heroVideo =
  "https://public.readdy.ai/ai/video_res/019ef297-7978-7fa0-a63c-8c798b51c36e.mp4";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#F5F4F8]">
      {/* FULL-SCREEN BACKGROUND VIDEO — Intocado, com contraste e cores originais ao máximo */}
      <div className="absolute inset-0 z-0">
        <video
          src={heroVideo}
          className="w-full h-full object-cover object-center select-none pointer-events-none"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-label="Glossy black sculptural figure with vivid prismatic flame, symbolizing creative intelligence"
        />
      </div>

      {/* REMOVIDAS TODAS AS OVERLAYS QUE RETIRAVAM O CONTRASTE DO VÍDEO */}

      {/* Floating annotation */}
      <div className="hidden md:flex absolute top-28 right-6 lg:right-10 z-20 items-center gap-2 bg-neutral-900/5 backdrop-blur-md border border-neutral-900/10 rounded-full pl-2 pr-4 py-1.5 animate-fade-up-delay-3">
        <span className="relative flex w-2 h-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#534AB7] opacity-75 animate-ping"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#534AB7]"></span>
        </span>
        <span className="text-[11px] font-mono-tech tracking-wider text-neutral-800 uppercase font-medium">
          Disponível para projetos
        </span>
      </div>

      {/* CONTENT OVERLAY — Textos escuros com sombreamento leve para flutuarem sobre o vídeo */}
      <div className="relative z-20 min-h-screen flex flex-col">
        <div className="flex-1 flex items-center">
          <div className="w-full px-6 md:px-10 lg:px-14 pt-32 md:pt-36 pb-24">
            <div className="max-w-2xl">
              
              <h1 className="animate-fade-up-delay-1 font-serif-display text-[56px] leading-[0.95] sm:text-[68px] md:text-[78px] lg:text-[88px] xl:text-[104px] text-neutral-900 tracking-[-0.03em] text-balance drop-shadow-[0_2px_10px_rgba(255,255,255,0.5)]">
                Ideias
                <span className="italic text-[#534AB7] font-normal"> que</span>
                <br />
                crescem,
                <br />
                <span className="text-neutral-900 font-medium">no digital.</span>
              </h1>

              <p className="animate-fade-up-delay-2 mt-7 max-w-md text-[15px] md:text-[16px] leading-[1.65] text-neutral-800 font-medium drop-shadow-sm">
                ByBia.dev é uma desenvolvedora independente que cria sites, sistemas de identidade e estratégias digitais para negócios portugueses que recusam ser invisíveis.
              </p>

              <div className="animate-fade-up-delay-3 mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href="#trabalho"
                  className="group inline-flex items-center justify-center gap-2 bg-neutral-900 hover:bg-[#534AB7] text-white text-sm font-medium px-6 py-3.5 rounded-full transition-all whitespace-nowrap shadow-md"
                >
                  Ver o meu trabalho
                  <i className="ri-arrow-right-up-line text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"></i>
                </a>
                <a
                  href="#processo"
                  className="group inline-flex items-center justify-center gap-2 bg-white/70 hover:bg-white backdrop-blur-md border border-neutral-300 text-neutral-800 text-sm font-medium px-6 py-3.5 rounded-full transition-all whitespace-nowrap shadow-sm"
                >
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#534AB7] text-white">
                    <i className="ri-play-fill text-[10px]"></i>
                  </span>
                  Como trabalho · 01:30
                </a>
              </div>

              {/* Mini stats */}
              <div className="animate-fade-up-delay-4 mt-12 grid grid-cols-3 gap-4 max-w-md border-t border-neutral-400/30 pt-8">
                <div>
                  <div className="font-serif-display text-[32px] leading-none text-neutral-900 font-bold">12</div>
                  <div className="mt-1.5 text-[10px] font-mono-tech tracking-wider text-neutral-600 uppercase font-bold">Projetos entregues</div>
                </div>
                <div className="border-l border-neutral-400/40 pl-4">
                  <div className="font-serif-display text-[32px] leading-none text-neutral-900 font-bold">2024</div>
                  <div className="mt-1.5 text-[10px] font-mono-tech tracking-wider text-neutral-600 uppercase font-bold">Código web desde</div>
                </div>
                <div className="border-l border-neutral-400/40 pl-4">
                  <div className="font-serif-display text-[32px] leading-none text-[#534AB7] font-bold">5★</div>
                  <div className="mt-1.5 text-[10px] font-mono-tech tracking-wider text-neutral-600 uppercase font-bold">Avaliação média</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}