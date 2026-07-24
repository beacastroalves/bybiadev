import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Faq() {
  const { t } = useTranslation();
  const [open, setOpen] = useState<number | null>(0);

  const items = [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
  ];

  return (
    <section
      id="faq"
      className="relative bg-[#f3ede4] text-neutral-900 py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-[#534AB7]/12 blur-3xl pointer-events-none"></div>

      <div className="relative mx-auto max-w-[1200px] px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Título */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-[#534AB7] shadow-[0_0_0_4px_rgba(83,74,183,0.25)]"></span>
              <span className="text-caption font-mono-tech text-[#534AB7] uppercase font-semibold">
                {t("faq.label")}
              </span>
            </div>
            <h2 className="font-serif text-h2 text-balance">
              {t("faq.title.p1")}
              <span className="italic text-[#534AB7]">{t("faq.title.p2")}</span>
            </h2>

            <a
              href={t("whatsapp.link")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-small font-medium text-[#534AB7] hover:text-[#433aa1] border-b border-[#534AB7]/40 hover:border-[#433aa1] pb-0.5 transition-colors"
            >
              {t("faq.cta")}
            </a>
          </div>

          {/* Acordeão */}
          <div className="lg:col-span-7 lg:pt-1">
            <div className="border-t border-neutral-300/60">
              {items.map((it, i) => {
                const isOpen = open === i;
                return (
                  <div key={i} className="border-b border-neutral-300/60">
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                    >
                      <span className="font-serif text-h4 group-hover:text-[#534AB7] transition-colors">
                        {it.q}
                      </span>
                      <i
                        className={`ri-add-line text-xl text-[#534AB7] shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      ></i>
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-body text-neutral-700">
                          {it.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
