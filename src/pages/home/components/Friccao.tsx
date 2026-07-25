import { useTranslation } from "react-i18next";

export default function Friccao() {
  const { t } = useTranslation();

  return (
    <section
      id="friccao"
      className="relative rounded-t-[2rem] md:rounded-t-[3rem] -mt-8 md:-mt-12 bg-paper text-neutral-900 py-24 md:py-32 overflow-hidden"
    >
      <div data-parallax className="absolute bottom-0 right-1/4 w-[420px] h-[420px] rounded-full bg-accent/15 blur-3xl pointer-events-none"></div>

      <div className="relative mx-auto max-w-[1200px] px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Título */}
          <div className="lg:col-span-6">
            <div data-reveal className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-brand shadow-[0_0_0_4px_rgba(83,74,183,0.25)]"></span>
              <span className="text-caption font-mono-tech text-brand uppercase font-semibold">
                {t("friccao.label")}
              </span>
            </div>
            <h2 data-reveal-title className="font-serif text-h2 text-balance">
              {t("friccao.title.p1")}
              <span className="italic text-brand">{t("friccao.title.p2")}</span>
            </h2>
          </div>

          {/* Corpo */}
          <div className="lg:col-span-6 lg:pt-2">
            <div data-reveal className="space-y-5 text-body-lg text-neutral-800">
              <p>{t("friccao.p1")}</p>
              <p>{t("friccao.p2")}</p>
            </div>

            <div data-reveal className="mt-8 flex items-start gap-3 bg-brand text-white rounded-2xl px-6 py-5 shadow-md">
              <i className="ri-time-line text-xl mt-0.5 text-accent"></i>
              <p className="text-body-lg font-medium leading-snug">
                {t("friccao.highlight")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
