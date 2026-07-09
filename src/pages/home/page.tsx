import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Trabalho from "./components/Trabalho";
import Sobre from "./components/Sobre";
import Processo from "./components/Processo";
import Blog from "./components/Blog";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#fafafa] text-neutral-900">
      <Navbar />
      <Hero />
      <Trabalho />
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
      <Blog />
      <Footer />
    </div>
  );
}