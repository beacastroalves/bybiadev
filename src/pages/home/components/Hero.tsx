import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Counter from "./Counter";

// Assets do Hero na TUA base (public/), não em terceiros como o readdy.
const HERO_POSTER = "/hero-image.webp"; // capa leve — carrega já (é o LCP)
const HERO_VIDEO = "/hero-video.mp4"; // vídeo — só carrega na 1.ª interação

export default function Hero({ isPrelaunch }: { isPrelaunch?: boolean }) {
  const { t } = useTranslation();

  // Performance: mostramos só a capa (leve). O vídeo (mais pesado) entra apenas
  // quando o utilizador interage com a página — o carregamento inicial fica leve.
  const [showVideo, setShowVideo] = useState(false);
  useEffect(() => {
    if (showVideo) return;
    const load = () => setShowVideo(true);
    const events = ["click", "touchstart", "keydown", "mousedown", "mousemove", "scroll", "pointerdown"];
    events.forEach((e) => window.addEventListener(e, load, { passive: true, once: true }));
    return () => events.forEach((e) => window.removeEventListener(e, load));
  }, [showVideo]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a]">
      {/* FUNDO: capa leve sempre visível (LCP); o vídeo entra por cima só após interação. */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_POSTER}
          alt="Figura escultural preta com chama prismática — inteligência criativa"
          className="w-full h-full object-cover object-center select-none pointer-events-none"
          fetchPriority="high"
          draggable={false}
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
        {showVideo && (
          <video
            src={HERO_VIDEO}
            className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none animate-fade-in"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-label="Figura escultural preta com chama prismática, símbolo de inteligência criativa"
            onCanPlay={(e) => {
              // Garante o arranque: o autoPlay de um <video muted> inserido via React
              // nem sempre dispara (o atributo muted pode não estar refletido a tempo).
              e.currentTarget.muted = true;
              void e.currentTarget.play().catch(() => {});
            }}
          />
        )}
      </div>

      {/* GRADIENT OVERLAY */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/50 via-black/15 to-transparent pointer-events-none"></div>

      {/* Floating annotation - Ajustada a posição (top-20 md:top-28) para não ficar sobreposta ao texto no mobile */}
      <div className="flex absolute top-20 md:top-28 right-6 lg:right-10 z-20 items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full pl-2 pr-4 py-1.5 animate-fade-up-delay-3">
        <span className="relative flex w-2 h-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
        </span>
        <span className="text-caption font-mono-tech text-white/90 uppercase">
          {isPrelaunch ? t("prelaunch.hero.status") : t("hero.status")}
        </span>
      </div>

      {/* CONTENT OVERLAY */}
      <div className="relative z-20 min-h-screen flex flex-col">
        <div className="flex-1 flex items-center">
          <div className="w-full mx-auto max-w-[1200px] px-6 md:px-10 lg:px-14 pt-32 md:pt-36 pb-24">
            <div className="max-w-2xl">
              
              {isPrelaunch ? (
                <h1 className="animate-fade-up-delay-1 font-serif-display text-display text-white text-balance drop-shadow-[0_2px_30px_rgba(0,0,0,0.35)]">
                  {t("prelaunch.hero.title.part1")}
                  <span className="italic text-white/60 animate-font-cycle">{t("prelaunch.hero.title.part2")}</span>
                  <br />
                  {t("prelaunch.hero.title.part3")}
                  <br />
                  <span className="text-shimmer bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">{t("prelaunch.hero.title.part4")}</span>
                </h1>
              ) : (
                <h1 className="animate-fade-up-delay-1 font-serif-display text-display text-white text-balance drop-shadow-[0_2px_30px_rgba(0,0,0,0.35)]">
                  {t("hero.title.part1")}
                  <span className="italic text-white/60">{t("hero.title.part2")}</span>
                  <br />
                  {t("hero.title.part3")}
                  <br />
                  <span className="text-shimmer bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">{t("hero.title.part4")}</span>
                </h1>
              )}

              <p className="animate-fade-up-delay-2 mt-7 max-w-md text-body text-white/80 drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
                {isPrelaunch ? t("prelaunch.hero.description") : t("hero.description")}
              </p>

              <div className="animate-fade-up-delay-3 mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {isPrelaunch ? (
                  <>
                    <a
                      href={t("whatsapp.link")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group btn btn-invert"
                    >
                      {t("prelaunch.hero.btn.contact")}
                      <i className="ri-arrow-right-up-line text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"></i>
                    </a>
                    <a
                      href="https://github.com/beacastroalves"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group btn btn-secondary"
                    >
                      <i className="ri-github-line text-base mr-1"></i>
                      {t("prelaunch.hero.btn.github")}
                    </a>
                  </>
                ) : (
                  <>
                    <a
                      href="#trabalho"
                      className="group btn btn-invert"
                    >
                      {t("hero.btn.work")}
                      <i className="ri-arrow-right-up-line text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"></i>
                    </a>
                    <a
                      href="#processo"
                      className="group btn btn-secondary"
                    >
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white text-neutral-900">
                        <i className="ri-play-fill text-[10px]"></i>
                      </span>
                      {t("hero.btn.process")} · 01:30
                    </a>
                  </>
                )}
              </div>

              {/* Mini stats */}
              <div className="animate-fade-up-delay-4 mt-12 grid grid-cols-3 gap-4 max-w-md">
                {isPrelaunch ? (
                  <>
                    <div>
                      <div className="font-serif-display text-[28px] leading-none text-white">2026</div>
                      <div className="mt-1.5 text-caption font-mono-tech text-white/60 uppercase">
                        {t("prelaunch.hero.stat.launch")}
                      </div>
                    </div>
                    <div className="border-l border-white/20 pl-4">
                      <div className="font-serif-display text-[28px] leading-none text-white">100%</div>
                      <div className="mt-1.5 text-caption font-mono-tech text-white/60 uppercase">
                        {t("prelaunch.hero.stat.focus")}
                      </div>
                    </div>
                    <div className="border-l border-white/20 pl-4">
                      <div className="font-serif-display text-[28px] leading-none text-white">Clean</div>
                      <div className="mt-1.5 text-caption font-mono-tech text-white/60 uppercase">
                        {t("prelaunch.hero.stat.code")}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <div className="font-serif-display text-[28px] leading-none text-white"><Counter to={100} suffix="%" /></div>
                      <div className="mt-1.5 text-caption font-mono-tech text-white/60 uppercase">
                        {t("hero.stat.direct")}
                      </div>
                    </div>
                    <div className="border-l border-white/20 pl-4">
                      <div className="font-serif-display text-[28px] leading-none text-white">2024</div>
                      <div className="mt-1.5 text-caption font-mono-tech text-white/60 uppercase">
                        {t("hero.stat.experience")}
                      </div>
                    </div>
                    <div className="border-l border-white/20 pl-4">
                      <div className="font-serif-display text-[28px] leading-none text-white"><Counter to={48} suffix="h" /></div>
                      <div className="mt-1.5 text-caption font-mono-tech text-white/60 uppercase">
                        {t("hero.stat.response")}
                      </div>
                    </div>
                  </>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}