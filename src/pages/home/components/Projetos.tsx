import { useEffect, useRef, useState, type TouchEvent } from "react";
import { useTranslation } from "react-i18next";

// Slides reaproveitados dos projetos do Trabalho (nome, categoria, imagem).
const slides = [
  {
    name: "Benedi — Clube de Psicologia",
    category: "Landing Page · Web",
    image: "https://benediclube.com.br/assets/images/logo/meta-benedi.jpg",
  },
  {
    name: "Natural Talking — Aulas de Inglês",
    category: "Landing Page · SEO",
    image: "https://i.postimg.cc/cHmhWN6j/NYT-20260119-203332-0000.png",
  },
  {
    name: "E-commerce",
    category: "Web · UX",
    image:
      "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    name: "Identidade Visual",
    category: "Branding",
    image:
      "https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
];

const INTERVAL = 4000; // troca automática a cada 4s

export default function Projetos() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const touchX = useRef(0);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const go = (dir: 1 | -1) =>
    setActive((a) => (a + dir + slides.length) % slides.length);

  // Pausar autoplay quando a secção sai do viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.25,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Autoplay (pausa fora do ecrã e com reduced-motion)
  useEffect(() => {
    if (reduced || !inView) return;
    const id = window.setInterval(
      () => setActive((a) => (a + 1) % slides.length),
      INTERVAL
    );
    return () => window.clearInterval(id);
  }, [reduced, inView]);

  // Pré-carregar a próxima imagem antes da troca
  useEffect(() => {
    const next = (active + 1) % slides.length;
    const img = new Image();
    img.src = slides[next].image;
  }, [active]);

  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  };

  return (
    <section
      ref={sectionRef}
      id="projetos"
      className="relative rounded-t-[2rem] md:rounded-t-[3rem] -mt-8 md:-mt-12 bg-ink text-white py-24 md:py-32 overflow-hidden"
    >
      {/* Bloco de texto centralizado */}
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-14 text-center">
        <div
          data-reveal
          className="text-caption font-mono-tech uppercase tracking-[0.25em] text-white/60"
        >
          {t("projetos.label")}
        </div>
        <h2 data-reveal-title className="mt-4 font-serif text-h2 text-balance">
          {t("projetos.title.p1")}
          <span className="italic text-white/55">{t("projetos.title.p2")}</span>
        </h2>
        <p data-reveal className="mt-4 mx-auto max-w-xl text-body-lg text-white/70">
          {t("projetos.subtitle")}
        </p>
      </div>

      {/* Faixa full-bleed — crossfade de opacidade, sem deslize */}
      <div
        className="relative mt-12 md:mt-16 w-full h-[40vh] md:h-[55vh] overflow-hidden select-none"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            aria-hidden={i !== active}
            className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.name}
              className="w-full h-full object-cover"
              draggable={false}
            />
            {/* Overlay de gradiente escuro de baixo para cima */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
            {/* Nome + categoria (crossfade junto com a imagem) */}
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-10">
              <div className="font-serif text-[22px] md:text-[28px] leading-tight">
                {slide.name}
              </div>
              <div className="mt-1 text-caption font-mono-tech uppercase text-white/70">
                {slide.category}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Indicadores de progresso + CTA */}
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-14 mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="flex items-center gap-3 w-full sm:max-w-xs">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Ir para o projeto ${i + 1}`}
              className="group flex-1 py-2"
            >
              <span className="relative block h-[2px] w-full bg-white/20 overflow-hidden">
                {i === active && (
                  <span
                    key={active}
                    className="absolute inset-y-0 left-0 bg-white"
                    style={{
                      width: reduced ? "100%" : undefined,
                      animation: reduced
                        ? "none"
                        : `fill-progress ${INTERVAL}ms linear forwards`,
                      animationPlayState: inView ? "running" : "paused",
                    }}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
        <a
          href="#trabalho"
          className="inline-flex items-center gap-2 text-small font-medium text-white/90 hover:text-accent border-b border-white/30 hover:border-accent pb-0.5 transition-colors whitespace-nowrap self-start sm:self-auto"
        >
          {t("projetos.cta")} ↗
        </a>
      </div>
    </section>
  );
}
