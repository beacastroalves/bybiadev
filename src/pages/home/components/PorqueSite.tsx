import { useTranslation } from "react-i18next";

export default function PorqueSite() {
  const { t } = useTranslation();

  return (
    <section
      id="porque-site"
      className="relative bg-[#0F0E1A] text-white py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute -top-40 left-0 w-[520px] h-[520px] rounded-full bg-[#534AB7]/15 blur-3xl pointer-events-none"></div>

      <div className="relative mx-auto max-w-[1200px] px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Título */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#02C39A]"></span>
              <span className="text-[11px] font-mono tracking-[0.18em] text-white/60 uppercase">
                {t("porqueSite.label")}
              </span>
            </div>
            <h2 className="font-serif text-[38px] md:text-[54px] lg:text-[60px] leading-[1.03] tracking-[-0.03em] text-balance">
              {t("porqueSite.title.p1")}
              <span className="italic text-white/55">{t("porqueSite.title.p2")}</span>
            </h2>
          </div>

          {/* Corpo */}
          <div className="lg:col-span-6 lg:pt-2">
            <div className="space-y-5 text-[16px] md:text-[17px] leading-[1.75] text-white/75">
              <p>{t("porqueSite.p1")}</p>
              <p>{t("porqueSite.p2")}</p>
              <p className="font-medium text-white border-l-2 border-[#02C39A] pl-5">
                {t("porqueSite.p3")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
