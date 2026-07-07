export default function Studio() {
  return (
    <section id="sobre" className="relative bg-[#FAF9F5] text-neutral-900 py-24 md:py-32 overflow-hidden">
      {/* Luzes decorativas roxas e menta */}
      <div className="absolute -top-40 -left-32 w-[560px] h-[560px] rounded-full bg-[#534AB7]/10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-[420px] h-[420px] rounded-full bg-[#02C39A]/10 blur-3xl pointer-events-none"></div>

      <div className="relative px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-16 md:mb-24">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-[#534AB7]"></span>
              <span className="text-[11px] font-mono tracking-[0.18em] text-[#534AB7] uppercase font-semibold">
                • SOBRE · DEV INDEPENDENTE
              </span>
            </div>
            <h2 className="font-serif text-[44px] md:text-[64px] lg:text-[80px] leading-[0.98] tracking-[-0.03em] text-balance">
              Uma dev sozinha,<br />
              apaixonada por<br />
              <span className="italic text-[#534AB7]">código, marca & resultado.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-8">
            <p className="text-[15px] md:text-[16px] leading-[1.7] text-neutral-700 max-w-md">
              ByBia.dev nasceu da convicção de que pequenas empresas e profissionais independentes portugueses merecem uma presença web tão robusta e profissional quanto as grandes corporações. Desenvolvo sites estruturados, rápidos e otimizados, sem intermediários entre ti e o código — do briefing à entrega.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-[#534AB7] hover:bg-[#433aa1] text-white text-[13px] font-medium px-5 py-3 rounded-full transition-colors whitespace-nowrap"
              >
                Fala comigo ↗
              </a>
              <a
                href="#manifesto"
                className="inline-flex items-center gap-2 text-[13px] font-medium text-neutral-600 hover:text-neutral-900 border-b border-neutral-300 pb-0.5 transition-colors whitespace-nowrap"
              >
                Ler o manifesto
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-7">
          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden aspect-[5/4] lg:aspect-auto lg:h-[480px]">
            <img
              src="https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=1400"
              alt="Espaço de trabalho ByBia"
              className="w-full h-full object-cover object-center"
              draggable={false}
            />
            <div className="absolute bottom-5 left-5 bg-black/60 backdrop-blur-xl rounded-xl p-4 border border-white/10 text-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#534AB7]">
                  <i className="ri-map-pin-2-line text-sm"></i>
                </div>
                <div>
                  <div className="text-[13px] font-medium">Bia · Dev Independente</div>
                  <div className="text-[11px] text-white/60 font-mono">📍 Portugal</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {[
              { val: "2024", suff: "", lab: "Dedicada ao desenvolvimento web" },
              { val: "12", suff: "", lab: "Projetos robustos entregues" },
              { val: "100", suff: "%", lab: "Colaboração direta, sem gestores de conta" },
              { val: "48", suff: "h", lab: "Tempo máximo de resposta garantido" }
            ].map((s) => (
              <div key={s.lab} className="bg-white border border-neutral-200/60 rounded-2xl p-6 flex flex-col justify-center">
                <div className="font-serif text-[38px] md:text-[44px] leading-none text-neutral-900">
                  {s.val}<span className="text-[#534AB7]">{s.suff}</span>
                </div>
                <div className="mt-2 text-[12px] text-neutral-600 leading-snug">{s.lab}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}