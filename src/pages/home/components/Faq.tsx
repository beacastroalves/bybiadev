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
      className="relative bg-cream text-neutral-900 py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-brand/10 blur-3xl pointer-events-none"></div>

      <div className="relative mx-auto max-w-[1200px] px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Título */}
          <div className="lg:col-span-5">
            <div data-reveal className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-brand shadow-[0_0_0_4px_rgba(83,74,183,0.25)]"></span>
              <span className="text-caption font-mono-tech text-brand uppercase font-semibold">
                {t("faq.label")}
              </span>
            </div>
            <h2 data-reveal-title className="font-serif text-h2 text-balance">
              {t("faq.title.p1")}
              <span className="italic text-brand">{t("faq.title.p2")}</span>
            </h2>

            <a
              href={t("whatsapp.link")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-small font-medium text-brand hover:text-brand-deep border-b border-brand/40 hover:border-brand-deep pb-0.5 transition-colors"
            >
              {t("faq.cta")}
            </a>
          </div>

          {/* Acordeão */}
          <div data-reveal className="lg:col-span-7 lg:pt-1">
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
                      <span className="font-serif text-h4 group-hover:text-brand transition-colors">
                        {it.q}
                      </span>
                      <i
                        className={`ri-add-line text-xl text-brand shrink-0 transition-transform duration-300 ${
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
