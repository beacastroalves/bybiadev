import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Problema from "./components/Problema";
import PorqueSite from "./components/PorqueSite";
import Friccao from "./components/Friccao";
import Trabalho from "./components/Trabalho";
import Sobre from "./components/Sobre";
import Processo from "./components/Processo";
import Faq from "./components/Faq";
import Blog from "./components/Blog";
import Footer from "./components/Footer";

// Definir modo do site: true = Em Breve (Pre-Lançamento), false = Landing Page Completa
export const isPrelaunch = false;

// Blog só entra no ar quando houver artigos reais (ver specs/05 P0#5).
const blogReady: boolean = false;

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#fafafa] text-neutral-900">
      <Navbar isPrelaunch={isPrelaunch} />
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
                <span className="w-1 h-1 rounded-full bg-[#02C39A]"></span>
                <span>ByBia.Dev</span>
              </div>
              
            </div>
          </div>
          <Processo />
          <Trabalho />
          <Faq />
          {/* Blog oculto até haver artigos reais — os posts atuais são fictícios (datas futuras, imagens de stock). Ver specs/05 P0#5. */}
          {blogReady && <Blog />}
        </>
      )}
      
      <Footer isPrelaunch={isPrelaunch} />
    </div>
  );
}