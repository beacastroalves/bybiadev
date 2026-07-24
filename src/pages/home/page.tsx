import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Problema from "./components/Problema";
import PorqueSite from "./components/PorqueSite";
import Friccao from "./components/Friccao";
import Trabalho from "./components/Trabalho";
import Sobre from "./components/Sobre";
import Processo from "./components/Processo";
import Faq from "./components/Faq";
import Agenda from "./components/Agenda";
import Blog from "./components/Blog";
import Footer from "./components/Footer";

// Definir modo do site: true = Em Breve (Pre-Lançamento), false = Landing Page Completa
export const isPrelaunch = false;

// Blog só entra no ar quando houver artigos reais (ver specs/05 P0#5).
const blogReady: boolean = false;

export default function Home() {
  // Deep-link para âncoras (ex.: abrir /#agenda direto): num SPA o alvo pode não
  // existir no 1.º paint. Espera o layout estabilizar e SALTA para a secção
  // (instantâneo — o esperado num link direto). Os cliques na nav rolam suave via
  // `scroll-behavior: smooth` no CSS (âncoras nativas), sem precisar de JS.
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash === "#") return;
    let timer: number;
    let tries = 0;
    let lastTop = -1;
    let stable = 0;
    const settleThenScroll = () => {
      const el = document.querySelector(hash) as HTMLElement | null;
      tries++;
      if (!el) {
        if (tries < 40) timer = window.setTimeout(settleThenScroll, 100);
        return;
      }
      const top = Math.round(el.getBoundingClientRect().top + window.scrollY);
      if (top === lastTop) stable++;
      else { stable = 0; lastTop = top; }
      if (stable >= 2 || tries > 40) {
        // -80px = mesma compensação da navbar sticky que o scroll-margin-top no CSS.
        window.scrollTo({ top: Math.max(0, top - 80), behavior: "instant" });
      } else {
        timer = window.setTimeout(settleThenScroll, 100);
      }
    };
    timer = window.setTimeout(settleThenScroll, 100);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-paper text-neutral-900">
      <Navbar isPrelaunch={isPrelaunch} blogReady={blogReady} />
      <Hero isPrelaunch={isPrelaunch} />
      
      {!isPrelaunch && (
        <>
          {/* Funil de confiança: dor → necessidade → alívio → quem → como → prova → dúvidas → conversa. Ver specs/06. */}
          <Problema />
          <PorqueSite />
          <Friccao />
          <Sobre />
          {/* Separador Estilo Glass - Barra com Badge */}
          <div className="relative w-full h-12 flex items-center justify-center z-30 -my-6 pointer-events-none">
            {/* Corpo principal do vidro */}
            <div className="w-[90%] md:w-[80%] max-w-5xl h-full bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center shadow-[0_8px_32px_0_rgba(0,0,0,0.08)]">
              
              {/* Pequena linha brilhante interna superior */}
              <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              
              {/* Detalhe ou Badge central */}
              <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-neutral-900/10 border border-white/95 text-[10px] font-mono-tech tracking-[0.2em] text-neutral-400 uppercase select-none">
                <span className="w-1 h-1 rounded-full bg-accent"></span>
                <span>ByBia.Dev</span>
              </div>
              
            </div>
          </div>
          <Processo />
          <Trabalho />
          <Faq />
          <Agenda />
          {/* Blog oculto até haver artigos reais — os posts atuais são fictícios (datas futuras, imagens de stock). Ver specs/05 P0#5. */}
          {blogReady && <Blog />}
        </>
      )}
      
      <Footer isPrelaunch={isPrelaunch} blogReady={blogReady} />
    </div>
  );
}