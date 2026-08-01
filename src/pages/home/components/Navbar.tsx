import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Importação do hook de tradução

// Bandeiras em SVG inline — renderizam em TODOS os sistemas (incluindo Windows, onde
// os emoji de bandeira caem para códigos "PT"/"BR"/"GB"). Versões simplificadas, legíveis a ~18px.
function FlagIcon({ code, className = "w-[18px] h-[13px]" }: { code: string; className?: string }) {
  const cls = `${className} rounded-[2px] block shrink-0`;
  if (code === "pt-PT") {
    return (
      <svg viewBox="0 0 30 20" className={cls} aria-hidden="true">
        <rect width="30" height="20" fill="#da291c" />
        <rect width="12" height="20" fill="#046a38" />
        <circle cx="12" cy="10" r="3.1" fill="#ffe08a" stroke="#f9d616" strokeWidth="0.7" />
      </svg>
    );
  }
  if (code === "pt-BR") {
    return (
      <svg viewBox="0 0 30 20" className={cls} aria-hidden="true">
        <rect width="30" height="20" fill="#009c3b" />
        <polygon points="15,2.5 27.5,10 15,17.5 2.5,10" fill="#ffdf00" />
        <circle cx="15" cy="10" r="3.4" fill="#002776" />
      </svg>
    );
  }
  // en → Union Jack (GB), simplificado
  return (
    <svg viewBox="0 0 30 20" className={cls} aria-hidden="true">
      <rect width="30" height="20" fill="#012169" />
      <path d="M0,0 30,20 M30,0 0,20" stroke="#fff" strokeWidth="4" />
      <path d="M0,0 30,20 M30,0 0,20" stroke="#c8102e" strokeWidth="2" />
      <path d="M15,0 V20 M0,10 H30" stroke="#fff" strokeWidth="6" />
      <path d="M15,0 V20 M0,10 H30" stroke="#c8102e" strokeWidth="3.4" />
    </svg>
  );
}

export default function Navbar({ isPrelaunch, blogReady }: { isPrelaunch?: boolean; blogReady?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);
  const { t, i18n } = useTranslation(); // Instanciação do tradutor

  // Mapeamento dinâmico dos links com base nas chaves de tradução
  const navLinks = [
    { label: t("nav.work"), href: "#trabalho" },
    { label: t("nav.about"), href: "#sobre" },
    { label: t("nav.process"), href: "#processo" },
    // Blog só aparece na nav quando houver artigos reais (evita âncora morta).
    ...(blogReady ? [{ label: t("nav.blog"), href: "#blog" }] : []),
  ];

  const languages = [
    { code: "pt-BR", label: "PT-BR" },
    { code: "pt-PT", label: "PT-PT" },
    { code: "en", label: "EN" },
  ];

  const navigate = useNavigate();
  // Troca de idioma = navegar para a rota do locale (URLs por locale: /, /br, /en).
  const LOCALE_PATH: Record<string, string> = { "pt-BR": "/br/", "pt-PT": "/", en: "/en/" };
  const goToLocale = (code: string) => {
    // Guarda a escolha manual para a auto-deteção de idioma (no index.html) a respeitar.
    try { localStorage.setItem("bybia_lang", code); } catch { /* ignora modo privado */ }
    navigate(LOCALE_PATH[code] ?? "/");
  };

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Auxiliar para identificar a sigla atual com segurança
  const currentLangCode = i18n.language?.toLowerCase() || "pt-br";
  const currentLang = languages.find(l => currentLangCode.startsWith(l.code.toLowerCase())) || languages[0];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ink/80 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-14 h-16 md:h-20 flex items-center justify-between">
        
        {/* LOGO / ASSINATURA */}
        <a href="#" className="flex items-center gap-1.5 group">
          <div
            className={`w-6 h-6 flex items-center justify-center rounded-full overflow-hidden transition-colors ${
              scrolled ? "bg-brand text-white" : "bg-white text-neutral-900"
            }`}
          >
            <i className="ri-code-box-line text-xs"></i>
          </div>
          <span className="text-[13.5px] font-semibold tracking-tight text-white">
            ByBia
            <span className="text-white/60 font-light">/dev</span>
          </span>
        </a>

        {/* NAVEGAÇÃO DESKTOP (Links Traduzidos) - Ocultada em Pre-Lançamento */}
        {!isPrelaunch && (
          <nav
            className={`hidden md:flex items-center gap-1 backdrop-blur-md rounded-full px-2 py-1.5 border transition-colors ${
              scrolled
                ? "bg-white/5 border-white/10"
                : "bg-white/10 border-white/20"
            }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-1.5 text-small font-medium rounded-full text-white/90 hover:text-accent hover:bg-white/5 transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}

        {/* BOTÕES DA DIREITA (Idioma + CTA) */}
        <div className="hidden md:flex items-center gap-4">
          
          {/* Seletor Trilingue Dinâmico com Dropdown com bandeiras */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 text-caption font-mono-tech uppercase border border-white/25 bg-white/5 hover:bg-white/10 rounded-full px-3 py-1.5 text-white/80 hover:text-white transition-all select-none"
            >
              <FlagIcon code={currentLang.code} />
              <span>{currentLang.label}</span>
              <i className={`ri-arrow-down-s-line text-[10px] transition-transform duration-300 ${langDropdownOpen ? "rotate-180" : ""}`}></i>
            </button>

            {langDropdownOpen && (
              <>
                {/* Backdrop invisível para fechar ao clicar fora */}
                <div className="fixed inset-0 z-40" onClick={() => setLangDropdownOpen(false)}></div>
                
                <div className="absolute right-0 mt-2 w-28 bg-ink/95 backdrop-blur-xl border border-white/10 rounded-xl py-1 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] z-50 overflow-hidden">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        goToLocale(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-left text-caption font-mono-tech transition-colors ${
                        currentLang.code === lang.code
                          ? "text-accent bg-white/5"
                          : "text-white/80 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <FlagIcon code={lang.code} />
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Botão de Ação Principal Traduzido (Leva para WhatsApp) */}
          <a
            href={isPrelaunch ? t("whatsapp.link") : "#agenda"}
            {...(isPrelaunch ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={`group inline-flex items-center gap-2 text-small font-medium px-4 py-2 rounded-full transition-all whitespace-nowrap ${
              scrolled
                ? "bg-brand hover:bg-brand-deep text-white"
                : "bg-white hover:bg-accent hover:text-white text-neutral-900"
            }`}
          >
            {isPrelaunch ? t("prelaunch.nav.cta") : t("nav.cta")}
            <i className="ri-arrow-right-up-line transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"></i>
          </a>
        </div>

        {/* CONTROLES DE CABEÇALHO MOBILE (Pré-Lançamento vs Normal) */}
        {isPrelaunch ? (
          <div className="flex md:hidden items-center gap-2">
            {/* Seletor Trilingue Compacto Directo (UX Premium) */}
            <div className="flex items-center gap-0.5 bg-white/5 border border-white/10 rounded-full p-1">
              {languages.map((lang) => {
                const isSelected = currentLang.code === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => goToLocale(lang.code)}
                    className={`px-2.5 py-1 rounded-full text-caption font-mono-tech font-bold transition-all duration-300 ${
                      isSelected
                        ? "bg-brand text-white shadow-[0_2px_8px_rgba(83,74,183,0.4)]"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {lang.code === "pt-BR" ? "BR" : lang.code === "pt-PT" ? "PT" : "EN"}
                  </button>
                );
              })}
            </div>

            {/* CTA WhatsApp Direto */}
            <a
              href={t("whatsapp.link")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-accent hover:bg-[#02b38e] text-white transition-all shadow-[0_2px_12px_rgba(2,195,154,0.3)] active:scale-95"
              aria-label={t("prelaunch.nav.cta")}
            >
              <i className="ri-whatsapp-line text-lg"></i>
            </a>
          </div>
        ) : (
          /* SITE NORMAL - CONTROLES MOBILE */
          <div className="flex md:hidden items-center gap-2">
            {/* Seletor Trilingue Compacto Directo no Header para facilidade de uso global */}
            <div className="flex items-center gap-0.5 bg-white/5 border border-white/10 rounded-full p-1">
              {languages.map((lang) => {
                const isSelected = currentLang.code === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => goToLocale(lang.code)}
                    className={`px-2.5 py-1 rounded-full text-caption font-mono-tech font-bold transition-all duration-300 ${
                      isSelected
                        ? "bg-brand text-white shadow-[0_2px_8px_rgba(83,74,183,0.4)]"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {lang.code === "pt-BR" ? "BR" : lang.code === "pt-PT" ? "PT" : "EN"}
                  </button>
                );
              })}
            </div>

            {/* BOTÃO DO MENU MOBILE */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition-colors"
              aria-label="menu"
            >
              <i className={`${menuOpen ? "ri-close-line" : "ri-menu-line"} text-lg`}></i>
            </button>
          </div>
        )}
      </div>

      {/* MENU MOBILE INTERATIVO (Apenas para Landing Page Completa) */}
      {!isPrelaunch && menuOpen && (
        <div className="md:hidden bg-ink border-t border-white/10 px-6 py-5 flex flex-col gap-4 animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block py-2 text-sm font-medium text-white/80 hover:text-accent border-b border-white/5 last:border-0"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          
          {/* Alternador de idioma Mobile Expandível (Dropdown/Accordion com Bandeiras e Nomes) */}
          <div className="border-b border-white/5 pb-2">
            <button
              onClick={() => setMobileLangOpen(!mobileLangOpen)}
              className="w-full flex items-center justify-between py-2 text-xs font-mono text-white/70 hover:text-white"
            >
              <div className="flex items-center gap-2">
                <i className="ri-global-line text-sm text-accent"></i>
                <span>Idioma / Região:</span>
                <span className="flex items-center gap-1.5 bg-white/5 px-2 py-0.5 rounded border border-white/10 text-white font-sans text-[10px]">
                  <FlagIcon code={currentLang.code} className="w-4 h-[11px]" />
                  {currentLang.label}
                </span>
              </div>
              <i className={`ri-arrow-down-s-line transition-transform duration-300 ${mobileLangOpen ? "rotate-180" : ""}`}></i>
            </button>
            
            {/* Opções expandidas de idioma */}
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileLangOpen ? "max-h-28 opacity-100 mt-2" : "max-h-0 opacity-0 pointer-events-none"}`}>
              <div className="flex flex-col gap-2.5 pl-6 pb-2">
                {languages.map((lang) => {
                  const isSelected = currentLang.code === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => {
                        goToLocale(lang.code);
                        setMobileLangOpen(false);
                        setMenuOpen(false);
                      }}
                      className={`flex items-center gap-2.5 py-1 text-left text-xs transition-colors ${
                        isSelected ? "text-accent font-semibold" : "text-white/60 hover:text-white"
                      }`}
                    >
                      <FlagIcon code={lang.code} />
                      <span>
                        {lang.code === "pt-BR" ? "Português (Brasil)" : lang.code === "pt-PT" ? "Português (Portugal)" : "English (Global)"}
                      </span>
                      {isSelected && <i className="ri-checkbox-circle-fill text-[11px] text-accent ml-auto"></i>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* CTA Mobile */}
          <a
            href={isPrelaunch ? t("whatsapp.link") : "#agenda"}
            {...(isPrelaunch ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="block text-center bg-brand text-white text-sm font-medium px-4 py-3 rounded-full mt-2"
            onClick={() => setMenuOpen(false)}
          >
            {isPrelaunch ? t("prelaunch.nav.cta") : t("nav.cta")}
          </a>
        </div>
      )}
    </header>
  );
}