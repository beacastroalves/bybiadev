const heroVideo =
  "https://public.readdy.ai/ai/video_res/019ef297-7978-7fa0-a63c-8c798b51c36e.mp4";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a]">
      {/* FULL-SCREEN BACKGROUND VIDEO */}
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

      {/* Floating annotation — live rendering */}
      <div className="hidden md:flex absolute top-28 right-6 lg:right-10 z-20 items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full pl-2 pr-4 py-1.5 animate-fade-up-delay-3">
        <span className="relative flex w-2 h-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75 animate-ping"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
        </span>
        <span className="text-[11px] font-mono-tech tracking-wider text-white/90 uppercase">
          Rendering · live
        </span>
      </div>

      {/* CONTENT OVERLAY */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="flex-1 flex items-center">
          <div className="w-full px-6 md:px-10 lg:px-14 pt-32 md:pt-36 pb-24">
            <div className="max-w-2xl">
              <h1 className="animate-fade-up-delay-1 font-serif-display text-[56px] leading-[0.95] sm:text-[68px] md:text-[78px] lg:text-[88px] xl:text-[104px] text-white tracking-[-0.03em] text-balance drop-shadow-[0_2px_30px_rgba(0,0,0,0.35)]">
                Ideas
                <span className="italic text-white/60"> that</span>
                <br />
                burn brighter,
                <br />
                <span className="text-shimmer">in color.</span>
              </h1>

              <p className="animate-fade-up-delay-2 mt-7 max-w-md text-[15px] md:text-[16px] leading-[1.65] text-white/80">
                NOVA is a creative intelligence studio crafting brand systems, motion
                and digital products at the edge of art and code — for founders who
                refuse to look like everyone else.
              </p>

              <div className="animate-fade-up-delay-3 mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href="#start"
                  className="group inline-flex items-center justify-center gap-2 bg-white hover:bg-white/90 text-neutral-900 text-sm font-medium px-6 py-3.5 rounded-full transition-all whitespace-nowrap"
                >
                  Begin a collaboration
                  <i className="ri-arrow-right-up-line text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"></i>
                </a>
                <a
                  href="#work"
                  className="group inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/25 text-white text-sm font-medium px-6 py-3.5 rounded-full transition-all whitespace-nowrap"
                >
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white text-neutral-900">
                    <i className="ri-play-fill text-[10px]"></i>
                  </span>
                  Watch reel · 02:14
                </a>
              </div>

              {/* Mini stats */}
              <div className="animate-fade-up-delay-4 mt-12 grid grid-cols-3 gap-4 max-w-md">
                <div>
                  <div className="font-serif-display text-[28px] leading-none text-white">142</div>
                  <div className="mt-1.5 text-[11px] font-mono-tech tracking-wider text-white/60 uppercase">Projects shipped</div>
                </div>
                <div className="border-l border-white/20 pl-4">
                  <div className="font-serif-display text-[28px] leading-none text-white">
                    09<span className="text-white/50">.8</span>
                  </div>
                  <div className="mt-1.5 text-[11px] font-mono-tech tracking-wider text-white/60 uppercase">Years in motion</div>
                </div>
                <div className="border-l border-white/20 pl-4">
                  <div className="font-serif-display text-[28px] leading-none text-white">
                    4<span className="text-white/50">.97</span>
                  </div>
                  <div className="mt-1.5 text-[11px] font-mono-tech tracking-wider text-white/60 uppercase">Client rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}