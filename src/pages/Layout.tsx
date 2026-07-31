import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { Head } from "vite-react-ssg";
import i18n from "../i18n";

const SITE = "https://bybia.dev";

// Mapa de locales → URL / atributos. A rota "/" é o PT-PT (mercado primário) e
// serve também de x-default; /br = PT-BR; /en = EN.
export type Locale = "pt-PT" | "pt-BR" | "en";
const LOCALES: Record<Locale, { path: string; htmlLang: string; ogLocale: string }> = {
  "pt-PT": { path: "/", htmlLang: "pt-PT", ogLocale: "pt_PT" },
  "pt-BR": { path: "/br/", htmlLang: "pt-BR", ogLocale: "pt_BR" },
  "en": { path: "/en/", htmlLang: "en", ogLocale: "en" },
};

export default function Layout({ locale }: { locale: Locale }) {
  // SSR: fixa a língua da rota antes do render (para o HTML estático sair no locale certo).
  if (import.meta.env.SSR && i18n.language !== locale) {
    i18n.changeLanguage(locale);
  }
  // Cliente: troca de idioma nas transições SPA — em efeito (fora do render), para não
  // disparar setState noutro componente durante o render (Navbar). Na hidratação já vem
  // certo do URL (ver i18n/index.ts), por isso aqui é no-op no 1.º render.
  useEffect(() => {
    if (i18n.language !== locale) i18n.changeLanguage(locale);
  }, [locale]);

  const cfg = LOCALES[locale];
  const canonical = SITE + cfg.path;
  // getFixedT garante a string na língua certa independentemente do estado atual.
  const tt = i18n.getFixedT(locale);
  const title = tt("seo.title");
  const description = tt("seo.description");

  return (
    <I18nextProvider i18n={i18n}>
      <Head>
        <html lang={cfg.htmlLang} />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />

        {/* hreflang recíproco + x-default (aponta para o PT-PT) */}
        <link rel="alternate" hrefLang="pt-PT" href={`${SITE}/`} />
        <link rel="alternate" hrefLang="pt-BR" href={`${SITE}/br/`} />
        <link rel="alternate" hrefLang="en" href={`${SITE}/en/`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE}/`} />

        {/* Open Graph / Twitter localizados */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:locale" content={cfg.ogLocale} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Head>
      <Outlet />
    </I18nextProvider>
  );
}
