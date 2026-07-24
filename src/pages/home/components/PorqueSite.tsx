import { useTranslation } from "react-i18next";

export default function PorqueSite() {
  const { t } = useTranslation();

  return (
    <section
      id="porque-site"
      className="relative bg-ink text-white py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute -top-40 left-0 w-[520px] h-[520px] rounded-full bg-brand/15 blur-3xl pointer-events-none"></div>

      <div className="relative mx-auto max-w-[1200px] px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Título */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
              <span className="text-caption font-mono-tech text-white/60 uppercase">
                {t("porqueSite.label")}
              </span>
            </div>
            <h2 className="font-serif text-h2 text-balance">
              {t("porqueSite.title.p1")}
              <span className="italic text-white/55">{t("porqueSite.title.p2")}</span>
            </h2>
          </div>

          {/* Corpo */}
          <div className="lg:col-span-6 lg:pt-2">
            <div className="space-y-5 text-body-lg text-white/75">
              <p>{t("porqueSite.p1")}</p>
              <p>{t("porqueSite.p2")}</p>
              <p className="font-medium text-white border-l-2 border-accent pl-5">
                {t("porqueSite.p3")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
