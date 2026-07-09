import { useState } from "react";
import { useTranslation } from "react-i18next"; // Integrando o hook trilingue

export default function Process() {
  const [active, setActive] = useState(0);
  const { t } = useTranslation();

  // As chaves puxam exatamente as traduções estruturadas mantendo os tipos originais da Versão 0
  // Array atualizada com a escala cromática da tua identidade visual
  const steps = [
    {
      no: "01",
      title: t("process.step1.title"),
      week: t("process.step1.week"),
      summary: t("process.step1.summary"),
      deliverables: t("process.step1.deliv", { returnObjects: true }) as string[],
      icon: "ri-mic-line",
      accent: "#534AB7", // 1. Roxo Profundo/Escuro (Início, Imersão)
      image: "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      no: "02",
      title: t("process.step2.title"),
      week: t("process.step2.week"),
      summary: t("process.step2.summary"),
      deliverables: t("process.step2.deliv", { returnObjects: true }) as string[],
      icon: "ri-compasses-2-line",
      accent: "#7F77DD", // 2. O teu Roxo Primário (Planeamento, Estrutura)
      image: "https://images.pexels.com/photos/3201763/pexels-photo-3201763.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      no: "03",
      title: t("process.step3.title"),
      week: t("process.step3.week"),
      summary: t("process.step3.summary"),
      deliverables: t("process.step3.deliv", { returnObjects: true }) as string[],
      icon: "ri-shape-line",
      accent: "#9D8EFF", // 3. Roxo Médio/Aberto (Desenvolvimento, Código Ativo)
      image: "https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      no: "04",
      title: t("process.step4.title"),
      week: t("process.step4.week"),
      summary: t("process.step4.summary"),
      deliverables: t("process.step4.deliv", { returnObjects: true }) as string[],
      icon: "ri-rocket-2-line",
      accent: "#02C39A", // 4. Verde Menta Vibrante (Lançamento, Sucesso, Projeto no Ar!)
      image: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
  ];

  return (
    <section
      id="process"
      className="relative bg-[#fafafa] text-neutral-900 py-24 md:py-32 overflow-hidden"
    >
      <div className="px-6 md:px-10 lg:px-14">
        {/* Eyebrow + headline - Versão 0 Pura */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-900"></span>
              <span className="text-[11px] font-mono-tech tracking-[0.18em] text-neutral-500 uppercase">
                {t("process.label")}
              </span>
            </div>
            <h2 className="font-serif-display text-[44px] md:text-[64px] lg:text-[76px] leading-[0.98] tracking-[-0.03em] text-balance">
              {t("process.headline.p1")}
              <br />
              <span className="italic text-neutral-400">{t("process.headline.p2")}</span>
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-[14px] md:text-[15px] leading-[1.65] text-neutral-600">
              {t("process.description")}
            </p>
          </div>
        </div>

        {/* Process layout - Versão 0 Pura */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-7">
          {/* Step list */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            {steps.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.no}
                  onClick={() => setActive(i)}
                  className={`group text-left rounded-2xl border transition-all duration-500 overflow-hidden ${
                    isActive
                      ? "bg-neutral-900 text-white border-neutral-900"
                      : "bg-white text-neutral-900 border-neutral-200 hover:border-neutral-400"
                  }`}
                >
                  <div className="flex items-center gap-5 px-5 md:px-7 py-5">
                    <div
                      className={`font-serif-display text-[36px] md:text-[44px] leading-none transition-colors ${
                        isActive ? "text-white" : "text-neutral-300"
                      }`}
                    >
                      {s.no}
                    </div>
                    <div
                      className={`w-11 h-11 flex items-center justify-center rounded-full transition-colors ${
                        isActive ? "bg-white/10" : "bg-neutral-100"
                      }`}
                      style={isActive ? { backgroundColor: s.accent } : {}}
                    >
                      <i className={`${s.icon} text-lg ${isActive ? "text-white" : "text-neutral-700"}`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-3">
                        <h3 className="font-serif-display text-[24px] md:text-[28px] leading-none">
                          {s.title}
                        </h3>
                        <span
                          className={`text-[11px] font-mono-tech tracking-wider uppercase whitespace-nowrap ${
                            isActive ? "text-white/60" : "text-neutral-400"
                          }`}
                        >
                          {s.week}
                        </span>
                      </div>
                    </div>
                    <i
                      className={`ri-arrow-down-s-line text-xl transition-transform ${
                        isActive ? "rotate-180 text-white" : "text-neutral-400 group-hover:text-neutral-700"
                      }`}
                    ></i>
                  </div>

                  {/* Expandable detail */}
                  <div
                    className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                      isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 md:px-7 pb-6 -mt-1">
                        <p className="text-[14px] md:text-[15px] leading-[1.65] text-white/75 max-w-xl">
                          {s.summary}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {s.deliverables.map((d) => (
                            <span
                              key={d}
                              className="inline-flex items-center gap-1.5 text-[11px] font-mono-tech tracking-wider uppercase bg-white/10 border border-white/15 text-white/85 px-3 py-1 rounded-full"
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: s.accent }}
                              ></span>
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Image preview synced with active step - Versão 0 Pura */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 rounded-2xl overflow-hidden bg-neutral-900 aspect-[4/5] lg:aspect-auto lg:h-[560px] relative">
              {steps.map((s, i) => (
                <img
                  key={s.no}
                  src={s.image}
                  alt={s.title}
                  className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ${
                    i === active ? "opacity-100 scale-100" : "opacity-0 scale-105"
                  }`}
                  draggable={false}
                />
              ))}
              {/* Overlay info */}
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 bg-gradient-to-t from-black/75 via-black/30 to-transparent">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-mono-tech tracking-wider text-white/65 uppercase">
                      Step · {steps[active].no} / 04
                    </div>
                    <div className="mt-1 font-serif-display text-[26px] md:text-[30px] text-white leading-tight">
                      {steps[active].title}
                    </div>
                  </div>
                  <div
                    className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 backdrop-blur-md"
                    style={{ backgroundColor: `${steps[active].accent}33` }}
                  >
                    <i className={`${steps[active].icon} text-lg text-white`}></i>
                  </div>
                </div>
              </div>

              {/* Progress dots */}
              <div className="absolute top-5 left-5 right-5 flex gap-1.5">
                {steps.map((s, i) => (
                  <span
                    key={s.no}
                    className={`flex-1 h-1 rounded-full transition-colors ${
                      i <= active ? "bg-white" : "bg-white/25"
                    }`}
                  ></span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}