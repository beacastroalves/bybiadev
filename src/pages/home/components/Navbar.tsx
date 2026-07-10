import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"; // Importação do hook de tradução

export default function Navbar({ isPrelaunch }: { isPrelaunch?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const { t, i18n } = useTranslation(); // Instanciação do tradutor

  // Mapeamento dinâmico dos links com base nas chaves de tradução
  const navLinks = [
    { label: t("nav.work"), href: "#trabalho" },
    { label: t("nav.about"), href: "#sobre" },
    { label: t("nav.process"), href: "#processo" },
    { label: t("nav.blog"), href: "#blog" },
  ];

  const languages = [
    { code: "pt-BR", label: "PT-BR", flag: "https://flagcdn.com/br.svg" },
    { code: "pt-PT", label: "PT-PT", flag: "https://flagcdn.com/pt.svg" },
    { code: "en", label: "EN", flag: "https://flagcdn.com/us.svg" },
  ];

  // Função cíclica de idiomas: BR ➔ PT ➔ EN ➔ BR
  const toggleLanguage = () => {
    const currentLang = i18n.language || "pt-BR";
    let nextLang = "pt-BR";

    if (currentLang.startsWith("pt-BR")) {
      nextLang = "pt-pt";
    } else if (currentLang.startsWith("pt-PT") || currentLang.startsWith("pt-pt")) {
      nextLang = "en";
    } else {
      nextLang = "pt-BR";
    }

    i18n.changeLanguage(nextLang);
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
          ? "bg-[#0F0E1A]/80 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="px-6 md:px-10 lg:px-14 h-16 md:h-20 flex items-center justify-between">
        
        {/* LOGO / ASSINATURA */}
        <a href="#" className="flex items-center gap-1.5 group">
          <div
            className={`w-6 h-6 flex items-center justify-center rounded-full overflow-hidden transition-colors ${
              scrolled ? "bg-[#534AB7] text-white" : "bg-white text-neutral-900"
            }`}
          >
            <i className="ri-code-box-line text-xs"></i>
          </div>
          <span className="text-[13.5px] font-semibold tracking-tight text-white">
            ByBia
            <span className="text-white/60 font-light">/digital</span>
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
                className="px-4 py-1.5 text-[13px] font-medium rounded-full text-white/90 hover:text-[#02C39A] hover:bg-white/5 transition-colors whitespace-nowrap"
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
              className="flex items-center gap-1.5 text-[11px] font-mono tracking-wider uppercase border border-white/25 bg-white/5 hover:bg-white/10 rounded-full px-3 py-1.5 text-white/80 hover:text-white transition-all select-none"
            >
              <img src={currentLang.flag} alt={currentLang.label} className="w-4 h-3 object-cover rounded-[1px] border border-white/10" />
              <span>{currentLang.label}</span>
              <i className={`ri-arrow-down-s-line text-[10px] transition-transform duration-300 ${langDropdownOpen ? "rotate-180" : ""}`}></i>
            </button>

            {langDropdownOpen && (
              <>
                {/* Backdrop invisível para fechar ao clicar fora */}
                <div className="fixed inset-0 z-40" onClick={() => setLangDropdownOpen(false)}></div>
                
                <div className="absolute right-0 mt-2 w-28 bg-[#0F0E1A]/95 backdrop-blur-xl border border-white/10 rounded-xl py-1 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] z-50 overflow-hidden">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        i18n.changeLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-left text-[11px] font-mono tracking-wider transition-colors ${
                        currentLang.code === lang.code
                          ? "text-[#02C39A] bg-white/5"
                          : "text-white/80 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <img src={lang.flag} alt={lang.label} className="w-4 h-3 object-cover rounded-[1px] border border-white/10" />
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Botão de Ação Principal Traduzido (Leva para WhatsApp) */}
          <a
            href={t("whatsapp.link")}
            target="_blank"
            rel="noopener noreferrer"
            className={`group inline-flex items-center gap-2 text-[13px] font-medium px-4 py-2 rounded-full transition-all whitespace-nowrap ${
              scrolled
                ? "bg-[#534AB7] hover:bg-[#433aa1] text-white"
                : "bg-white hover:bg-[#02C39A] hover:text-white text-neutral-900"
            }`}
          >
            {isPrelaunch ? t("prelaunch.nav.cta") : t("nav.cta")}
            <i className="ri-arrow-right-up-line transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"></i>
          </a>
        </div>

        {/* BOTÃO DO MENU MOBILE */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition-colors"
          aria-label="menu"
        >
          <i className={`${menuOpen ? "ri-close-line" : "ri-menu-line"} text-lg`}></i>
        </button>
      </div>

      {/* MENU MOBILE INTERATIVO */}
      {menuOpen && (
        <div className="md:hidden bg-[#0F0E1A] border-t border-white/10 px-6 py-5 flex flex-col gap-4 animate-fade-in">
          {!isPrelaunch && navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block py-2 text-sm font-medium text-white/80 hover:text-[#02C39A] border-b border-white/5 last:border-0"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          
          {/* Alternador de idioma Mobile */}
          <button
            onClick={() => {
              toggleLanguage();
              setMenuOpen(false);
            }}
            className="text-left py-2 text-xs font-mono text-white/50 hover:text-white flex items-center gap-2 border-b border-white/5"
          >
            <i className="ri-global-line"></i>
            {currentLangCode.startsWith("pt-br") && t("nav.lang.to_pt")}
            {(currentLangCode.startsWith("pt-pt") || currentLangCode === "pt") && t("nav.lang.to_en")}
            {currentLangCode.startsWith("en") && t("nav.lang.to_br")}
          </button>

          {/* CTA Mobile */}
          <a
            href={t("whatsapp.link")}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-[#534AB7] text-white text-sm font-medium px-4 py-3 rounded-full mt-2"
            onClick={() => setMenuOpen(false)}
          >
            {isPrelaunch ? t("prelaunch.nav.cta") : t("nav.cta")}
          </a>
        </div>
      )}
    </header>
  );
}