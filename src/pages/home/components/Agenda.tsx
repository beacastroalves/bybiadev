import { useEffect } from "react";
import { useTranslation } from "react-i18next";

// ⚠️ TROQUE pelo seu link do Calendly (ex.: "https://calendly.com/bybia/15min").
// É a ÚNICA linha que precisa de editar para o agendamento ficar a funcionar.
const CALENDLY_URL = "https://calendly.com/SEU-USUARIO/15min";

export default function Agenda() {
  const { t } = useTranslation();

  // Carrega o script do Calendly uma única vez e inicializa o widget inline.
  useEffect(() => {
    const id = "calendly-widget-script";
    const w = window as unknown as { Calendly?: { initInlineWidgets?: () => void } };

    if (document.getElementById(id)) {
      w.Calendly?.initInlineWidgets?.();
      return;
    }
    const s = document.createElement("script");
    s.id = id;
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  // Tema da marca + esconde o banner de cookies do Calendly.
  const widgetUrl = `${CALENDLY_URL}?hide_gdpr_banner=1&primary_color=534AB7`;

  return (
    <section
      id="agenda"
      className="relative bg-ink text-white py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute -top-40 right-0 w-[520px] h-[520px] rounded-full bg-brand/15 blur-3xl pointer-events-none"></div>

      <div className="relative mx-auto max-w-[1200px] px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Copy */}
          <div className="lg:col-span-5">
            <div data-reveal className="flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
              <span className="text-caption font-mono-tech text-white/60 uppercase">
                {t("agenda.label")}
              </span>
            </div>

            <h2 data-reveal-title className="font-serif text-h2 text-balance">
              {t("agenda.title.p1")}
              <span className="italic text-white/55">{t("agenda.title.p2")}</span>
            </h2>

            <div data-reveal className="mt-8 space-y-5 text-body-lg text-white/75">
              <p>{t("agenda.p1")}</p>
              <p>{t("agenda.p2")}</p>
            </div>

            <p className="mt-8 text-small text-white/60">
              {t("agenda.fallback")}{" "}
              <a
                href={t("whatsapp.link")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-white border-b border-accent/40 hover:border-white pb-0.5 transition-colors"
              >
                {t("agenda.fallback_link")}
              </a>
            </p>
          </div>

          {/* Calendário */}
          <div className="lg:col-span-7">
            <div
              className="calendly-inline-widget rounded-2xl overflow-hidden border border-white/10 bg-white shadow-lg"
              data-url={widgetUrl}
              style={{ minWidth: "320px", height: "680px" }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}
