import { useTranslation } from "react-i18next";

export default function Footer({ isPrelaunch }: { isPrelaunch?: boolean }) {
  const { t } = useTranslation();

  return (
    <footer className="relative bg-ink border-t border-white/10 text-white pt-20 pb-12 overflow-hidden">
      {/* Efeito granulado de estúdio herdado */}
      <div className="absolute inset-0 opacity-15 bg-grain pointer-events-none"></div>
      
      {/* Blob decorativo roxo sutil no fundo */}
      <div className="absolute -bottom-40 -left-40 w-[420px] h-[420px] rounded-full bg-brand/10 blur-3xl pointer-events-none"></div>

      <div className="relative px-6 md:px-10 lg:px-14 max-w-[1200px] mx-auto">
        
        {/* PARTE SUPERIOR: Bloco de Chamada para Ação (CTA) Direto */}
        <div className="relative p-8 md:p-12 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <div className="text-caption font-mono-tech text-accent uppercase mb-2">
              {t("footer.cta.eyebrow")}
            </div>
            <h3 className="font-serif text-h3">
              {t("footer.cta.title.p1")}<span className="italic text-white/65">{t("footer.cta.title.p2")}</span>
            </h3>
            <p className="mt-2 text-small text-white/60">
              {t("footer.cta.description")}
            </p>
          </div>

          <div>
            <a 
              href={t("whatsapp.link")} 
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              {t("footer.cta.btn")}
            </a>
          </div>
        </div>

        {/* PARTE CENTRAL: Grelha de Links Úteis */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-white/10 pb-16">
          
          {/* Coluna de Marca */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <a href="#" className="flex items-center gap-1.5 group w-max">
              <div className="w-6 h-6 flex items-center justify-center rounded-full overflow-hidden bg-brand text-white">
                <i className="ri-code-box-line text-xs"></i>
              </div>
              <span className="text-small font-semibold tracking-tight text-white">
                ByBia<span className="text-white/60 font-light">/dev</span>
              </span>
            </a>
            <p className="text-small text-white/65 max-w-xs">
              {t("footer.brand.description")}
            </p>
          </div>

          {/* Coluna Dinâmica de Navegação ou Serviços */}
          {isPrelaunch ? (
            /* Coluna de Serviços em Pre-Lançamento */
            <div className="md:col-span-3 md:col-start-7 flex flex-col gap-4">
              <h4 className="text-caption font-mono-tech text-white/60 uppercase">{t("footer.services.title")}</h4>
              <ul className="flex flex-col gap-2.5 text-small text-white/65 select-none">
                <li>{t("footer.services.item1")}</li>
                <li>{t("footer.services.item2")}</li>
                <li>{t("footer.services.item3")}</li>
                <li>{t("footer.services.item4")}</li>
              </ul>
            </div>
          ) : (
            /* Coluna de Navegação Interna do Portfólio */
            <div className="md:col-span-3 md:col-start-7 flex flex-col gap-4">
              <h4 className="text-caption font-mono-tech text-white/60 uppercase">{t("footer.nav.title")}</h4>
              <ul className="flex flex-col gap-2.5 text-small">
                <li><a href="#trabalho" className="text-white/70 hover:text-accent transition-colors">{t("nav.work")}</a></li>
                <li><a href="#sobre" className="text-white/70 hover:text-accent transition-colors">{t("nav.about")}</a></li>
                <li><a href="#processo" className="text-white/70 hover:text-accent transition-colors">{t("nav.process")}</a></li>
                <li><a href="#blog" className="text-white/70 hover:text-accent transition-colors">{t("nav.blog")}</a></li>
              </ul>
            </div>
          )}

          {/* Coluna de Canais e Contacto Direto */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h4 className="text-caption font-mono-tech text-white/60 uppercase">{t("footer.contact.title")}</h4>
            <ul className="flex flex-col gap-2.5 text-small">
              <li>
                <a href="mailto:contact@bybia.dev" className="text-white/70 hover:text-accent transition-colors flex items-center gap-2">
                  <i className="ri-mail-line text-neutral-500"></i> contact@bybia.dev
                </a>
              </li>
              <li>
                <a href="https://github.com/beacastroalves" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-accent transition-colors flex items-center gap-2">
                  <i className="ri-github-line text-neutral-500"></i> GitHub
                </a>
              </li>
              <li>
                <span className="text-white/70 flex items-center gap-2">
                  <i className="ri-map-pin-line text-neutral-500"></i> {t("footer.contact.country")}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* PARTE INFERIOR: Direitos Autorais */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-caption font-mono-tech text-white/60">
          <div>
            © {new Date().getFullYear()} ByBia.dev. {t("footer.copyright")}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
            <span>{t("footer.made_with")}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}