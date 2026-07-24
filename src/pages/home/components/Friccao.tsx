import { useTranslation } from "react-i18next";

export default function Friccao() {
  const { t } = useTranslation();

  return (
    <section
      id="friccao"
      className="relative bg-[#fafafa] text-neutral-900 py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute bottom-0 right-1/4 w-[420px] h-[420px] rounded-full bg-[#02C39A]/15 blur-3xl pointer-events-none"></div>

      <div className="relative mx-auto max-w-[1200px] px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Título */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-[#534AB7] shadow-[0_0_0_4px_rgba(83,74,183,0.25)]"></span>
              <span className="text-[11px] font-mono tracking-[0.18em] text-[#534AB7] uppercase font-semibold">
                {t("friccao.label")}
              </span>
            </div>
            <h2 className="font-serif text-[38px] md:text-[54px] lg:text-[60px] leading-[1.03] tracking-[-0.03em] text-balance">
              {t("friccao.title.p1")}
              <span className="italic text-[#534AB7]">{t("friccao.title.p2")}</span>
            </h2>
          </div>

          {/* Corpo */}
          <div className="lg:col-span-6 lg:pt-2">
            <div className="space-y-5 text-[16px] md:text-[17px] leading-[1.75] text-neutral-800">
              <p>{t("friccao.p1")}</p>
              <p>{t("friccao.p2")}</p>
            </div>

            <div className="mt-8 flex items-start gap-3 bg-[#534AB7] text-white rounded-2xl px-6 py-5 shadow-md">
              <i className="ri-time-line text-xl mt-0.5 text-[#02C39A]"></i>
              <p className="text-[16px] md:text-[17px] font-medium leading-snug">
                {t("friccao.highlight")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
