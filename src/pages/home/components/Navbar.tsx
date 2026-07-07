import { useEffect, useState } from "react";

const navLinks = [
  { label: "Trabalho", href: "#trabalho" },
  { label: "Sobre", href: "#sobre" },
  { label: "Processo", href: "#processo" },
  { label: "Blog", href: "#blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-neutral-200/70"
          : "bg-transparent"
      }`}
    >
      <div className="px-6 md:px-10 lg:px-14 h-16 md:h-20 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full overflow-hidden transition-colors ${
              scrolled ? "bg-[#534AB7] text-white" : "bg-white text-neutral-900"
            }`}
          >
            <i className="ri-code-box-line text-sm"></i>
          </div>
          <span
            className={`text-[15px] font-semibold tracking-tight transition-colors ${
              scrolled ? "text-neutral-900" : "text-white"
            }`}
          >
            ByBia
            <span className={scrolled ? "text-neutral-400 font-light" : "text-white/60 font-light"}>
              /digital
            </span>
          </span>
        </a>

        <nav
          className={`hidden md:flex items-center gap-1 backdrop-blur-md rounded-full px-2 py-1.5 transition-colors ${
            scrolled
              ? "bg-white/60 border border-neutral-200/70"
              : "bg-white/10 border border-white/20"
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`px-4 py-1.5 text-[13px] font-medium rounded-full transition-colors whitespace-nowrap ${
                scrolled
                  ? "text-neutral-700 hover:text-[#534AB7] hover:bg-neutral-100"
                  : "text-white/90 hover:text-[#02C39A] hover:bg-white/15"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            className={`group inline-flex items-center gap-2 text-[13px] font-medium px-5 py-2.5 rounded-full transition-all whitespace-nowrap ${
              scrolled
                ? "bg-[#534AB7] hover:bg-[#433aa1] text-white"
                : "bg-white hover:bg-[#02C39A] hover:text-white text-neutral-900"
            }`}
          >
            Iniciar um projeto
            <i className="ri-arrow-right-up-line transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"></i>
          </a>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
            scrolled
              ? "border border-neutral-200 bg-white/80 text-neutral-900"
              : "border border-white/25 bg-white/10 text-white"
          }`}
          aria-label="menu"
        >
          <i className={`${menuOpen ? "ri-close-line" : "ri-menu-line"} text-lg`}></i>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-200 px-6 py-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block py-3 text-sm font-medium text-neutral-700 border-b border-neutral-100 last:border-0"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="block mt-3 text-center bg-[#534AB7] text-white text-sm font-medium px-4 py-3 rounded-full"
          >
            Iniciar um projeto
          </a>
        </div>
      )}
    </header>
  );
}