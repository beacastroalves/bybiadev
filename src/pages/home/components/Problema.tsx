import { useTranslation } from "react-i18next";

export default function Problema() {
  const { t } = useTranslation();

  return (
    <section
      id="problema"
      className="relative bg-cream text-neutral-900 py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute -top-32 -right-24 w-[460px] h-[460px] rounded-full bg-brand/15 blur-3xl pointer-events-none"></div>

      <div className="relative mx-auto max-w-[1200px] px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Título */}
          <div className="lg:col-span-6">
            <div data-reveal className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-brand shadow-[0_0_0_4px_rgba(83,74,183,0.25)]"></span>
              <span className="text-caption font-mono-tech text-brand uppercase font-semibold">
                {t("problema.label")}
              </span>
            </div>
            <h2 data-reveal-title className="font-serif text-h2 text-balance">
              {t("problema.title.p1")}
              <span className="italic text-brand">{t("problema.title.p2")}</span>
            </h2>
          </div>

          {/* Corpo */}
          <div className="lg:col-span-6 lg:pt-2">
            <div data-reveal className="space-y-5 text-body-lg text-neutral-800">
              <p>{t("problema.p1")}</p>
              <p>{t("problema.p2")}</p>
              <p className="font-medium text-neutral-900 border-l-2 border-brand pl-5">
                {t("problema.p3")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
