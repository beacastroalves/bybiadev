import { useEffect, useRef } from "react";
import { useSiteReveals } from "../../hooks/useSiteReveals";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Problema from "./components/Problema";
import PorqueSite from "./components/PorqueSite";
import Friccao from "./components/Friccao";
import Sobre from "./components/Sobre";
import Processo from "./components/Processo";
import ProjetosArco from "./components/ProjetosArco";
import Faq from "./components/Faq";
import Agenda from "./components/Agenda";
import Blog from "./components/Blog";
import Footer from "./components/Footer";

// Definir modo do site: true = Em Breve (Pre-Lançamento), false = Landing Page Completa
export const isPrelaunch = true;

// Blog só entra no ar quando houver artigos reais (ver specs/05 P0#5).
const blogReady: boolean = false;

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  useSiteReveals(root);

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
    <div ref={root} className="relative min-h-screen bg-paper text-neutral-900">
      <Navbar isPrelaunch={isPrelaunch} blogReady={blogReady} />
      <Hero isPrelaunch={isPrelaunch} />
      
      {!isPrelaunch && (
        <>
          {/* Funil de confiança: dor → necessidade → alívio → quem → como → prova → dúvidas → conversa. Ver specs/06. */}
          <Problema />
          <PorqueSite />
          <Friccao />
          <Sobre />
          {/* Separadores agora são os painéis arredondados sobrepostos (rounded-t + -mt nas secções). Ver specs/09 §5. */}
          <Processo />
          {/* Portfólio: leque curvo em arco (id="trabalho") com o copy da secção Trabalho. */}
          <ProjetosArco />
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