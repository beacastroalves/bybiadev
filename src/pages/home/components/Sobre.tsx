import { useTranslation } from "react-i18next";

export default function Studio() {
  const { t } = useTranslation();

  return (
    <section
      id="sobre"
      className="relative bg-[#f3ede4] text-neutral-900 py-24 md:py-32 overflow-hidden"
    >
      {/* BLOBS DE ALTA OPACIDADE RESGATADOS DA VERSÃO 0 — Adaptados para a paleta roxa e menta */}
      <div 
        className="absolute -top-40 -left-32 w-[560px] h-[560px] rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: 'rgba(83, 74, 183, 0.25)' }} // 0.15 é a opacidade (15%). Altera para o valor que quiseres!
      />
      <div className="absolute top-1/3 -right-24 w-[460px] h-[460px] rounded-full bg-[#7F77DD]/35 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-[420px] h-[420px] rounded-full bg-[#02C39A]/30 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-10 w-[380px] h-[380px] rounded-full bg-[#534AB7]/35 blur-3xl pointer-events-none"></div>

      <div className="relative px-6 md:px-10 lg:px-14">
        {/* Eyebrow + headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-16 md:mb-24">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-[#534AB7] shadow-[0_0_0_4px_rgba(83,74,183,0.25)]"></span>
              <span className="text-[11px] font-mono tracking-[0.18em] text-[#534AB7] uppercase font-semibold">
                {t("about.label")}
              </span>
            </div>
            <h2 className="font-serif text-[44px] md:text-[64px] lg:text-[80px] leading-[0.98] tracking-[-0.03em] text-balance">
              {t("about.headline.p1")}
              <br />
              {t("about.headline.p2")}
              <br />
              <span className="italic text-[#534AB7]">{t("about.headline.p3")}</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-8">
            <p className="text-[15px] md:text-[16px] leading-[1.7] text-neutral-800 max-w-md font-medium">
              {t("about.text")}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-[#534AB7] hover:bg-[#433aa1] text-white text-[13px] font-medium px-5 py-3 rounded-full transition-all shadow-md"
              >
                {t("about.btn.talk")}
              </a>
              <a
                href="#manifesto"
                className="inline-flex items-center gap-2 text-[13px] font-medium text-neutral-700 hover:text-neutral-900 border-b border-neutral-400 hover:border-neutral-900 pb-0.5 transition-colors whitespace-nowrap"
              >
                {t("about.btn.manifesto")}
              </a>
            </div>
          </div>
        </div>

        {/* Studio scene image + team panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-7">
          {/* Imagem do espaço de trabalho */}
          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden aspect-[5/4] lg:aspect-auto lg:h-[560px] group border border-neutral-300/40 shadow-sm">
            <img
              src="https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=1400"
              alt="Espaço de trabalho ByBia"
              className="w-full h-full object-cover object-center transition-transform duration-[1500ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-103"
              draggable={false}
            />
            {/* Float card */}
            <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-xl rounded-xl p-4 border border-white/60 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#534AB7] text-white">
                  <i className="ri-map-pin-2-line text-sm"></i>
                </div>
                <div>
                  <div className="text-[13px] font-medium text-neutral-900">
                    Bia · {t("about.profile.role")}
                  </div>
                  <div className="text-[11px] text-neutral-500 font-mono">
                    📍 Portugal
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid restaurado em layout vertical com preenchimento de cor da Versão 0 */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {[
                { val: "2024", suff: "", lab: t("about.stat.1") },
                { val: "12", suff: "", lab: t("about.stat.2") },
                { val: "100", suff: "%", lab: t("about.stat.3") },
                { val: "48", suff: "h", lab: t("about.stat.4") }
              ].map((s) => (
                <div
                  key={s.lab}
                  className="bg-white/70 backdrop-blur-md border border-white/80 rounded-2xl p-5"
                >
                  {/* Classe font-serif-display pura com leading-none para colar o sufixo roxo idêntico ao original */}
                  <div className="font-serif-display text-[40px] md:text-[44px] leading-none text-neutral-900">
                    {s.val}
                    <span className="text-[#534AB7]">{s.suff}</span>
                  </div>
                  <div className="mt-2 text-[12px] text-neutral-600 leading-snug">
                    {s.lab}
                  </div>
                </div>
              ))}
            </div>

            {/* Caixa inferior escura de fecho técnico da secção */}
            <div className="bg-[#0F0E1A] text-white rounded-2xl p-6 flex-1 flex flex-col justify-between border border-white/5 shadow-lg min-h-[160px]">
              <div className="text-[10px] font-mono tracking-wider text-white/50 uppercase">
                // Tech Stack & Workflow
              </div>
              <div className="font-serif text-[22px] leading-tight text-white/90 my-3">
                Garantia de código limpo, arquitetura sem traves e autonomia total para o seu negócio.
              </div>
              <div className="flex gap-4 text-[11px] font-mono text-[#02C39A] uppercase tracking-wider">
                <span className="flex items-center gap-1.5"><i className="ri-instance-line"></i> React</span>
                <span className="flex items-center gap-1.5"><i className="ri-palette-line"></i> Tailwind</span>
                <span className="flex items-center gap-1.5"><i className="ri-seo-line"></i> SEO</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}