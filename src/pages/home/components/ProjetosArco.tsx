import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type TouchEvent,
} from "react";
import { useTranslation } from "react-i18next";

// 9 cards (ímpar → arco simétrico). Adicionar mais projetos aqui estende o arco.
const cards = [
  { name: "Benedi — Clube de Psicologia", image: "https://benediclube.com.br/assets/images/logo/meta-benedi.jpg" },
  { name: "Natural Talking — Inglês", image: "https://i.postimg.cc/cHmhWN6j/NYT-20260119-203332-0000.png" },
  { name: "E-commerce", image: "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Identidade Visual", image: "https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Alojamento Local", image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Restaurante", image: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Produtor Regional", image: "https://images.pexels.com/photos/1414651/pexels-photo-1414651.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Comércio Local", image: "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Estúdio Criativo", image: "https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=600" },
];

const STEP_DEG = 10; // N = (índice - ativo) * STEP_DEG — maior = cards mais afastados
const INTERVAL = 3000; // avança a cada 3s
const EASE = "cubic-bezier(.22,.61,.36,1)";
const N = cards.length;

// Distância assinada mais curta em torno do círculo → arco "infinito".
function wrap(d: number) {
  d = ((d % N) + N) % N;
  return d > N / 2 ? d - N : d;
}

export default function ProjetosArco() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const touchX = useRef(0);
  const prevActive = useRef(0);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [instant, setInstant] = useState<number[]>([]); // cards a teletransportar (sem animação)
  const [manualNonce, setManualNonce] = useState(0); // muda a cada interação → reinicia o autoplay
  const [paused, setPaused] = useState(false); // rato em cima do card de destaque → pausa tudo
  const manualRef = useRef(false);
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  // Marca interação manual (seta/swipe/clique) → o autoplay reinicia a contagem e triplica o tempo.
  const markManual = () => {
    manualRef.current = true;
    setManualNonce((n) => n + 1);
  };
  const go = (dir: 1 | -1) => {
    setActive((a) => (a + dir + N) % N);
    markManual();
  };

  // Pausar autoplay quando a secção sai do viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.25,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Autoplay — após clique/swipe, espera o TRIPLO do tempo antes de voltar a avançar sozinho.
  useEffect(() => {
    if (reduced || !inView || paused) return;
    const firstDelay = manualRef.current ? INTERVAL * 3 : INTERVAL;
    manualRef.current = false;
    let interval = 0;
    const timeout = window.setTimeout(() => {
      setActive((a) => (a + 1) % N);
      interval = window.setInterval(() => setActive((a) => (a + 1) % N), INTERVAL);
    }, firstDelay);
    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [reduced, inView, paused, manualNonce]);

  // Deteta os cards que dão a volta e teletransporta-os SEM animação (nas pontas
  // invisíveis) — antes do paint (useLayoutEffect) para não se ver o "salto".
  useLayoutEffect(() => {
    const wrapping: number[] = [];
    for (let i = 0; i < N; i++) {
      if (Math.abs(wrap(i - active) - wrap(i - prevActive.current)) > N / 2) {
        wrapping.push(i);
      }
    }
    prevActive.current = active;
    if (!wrapping.length) return;
    setInstant(wrapping);
    const raf = requestAnimationFrame(() => setInstant([]));
    return () => cancelAnimationFrame(raf);
  }, [active]);

  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  };

  const baseTransition = `transform 0.75s ${EASE}, opacity 0.75s ${EASE}`;

  return (
    <section
      ref={sectionRef}
      id="projetos-arco"
      className="relative rounded-t-[2rem] md:rounded-t-[3rem] -mt-8 md:-mt-12 bg-ink text-white py-24 md:py-32 overflow-hidden"
    >
      {/* Texto centralizado */}
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-14 text-center">
        <div
          data-reveal
          className="text-caption font-mono-tech uppercase tracking-[0.25em] text-white/60"
        >
          {t("projetos.label")}
        </div>
        <h2 data-reveal-title className="mt-4 font-serif text-h2 text-balance">
          {t("projetos.title.p1")}
          <span className="italic text-white/55">{t("projetos.title.p2")}</span>
        </h2>
        <p data-reveal className="mt-4 mx-auto max-w-xl text-body-lg text-white/70">
          {t("projetos.subtitle")}
        </p>
      </div>

      {/* Leque curvo infinito de cards quadrados */}
      <div
        className="relative mt-16 h-[240px] md:h-[360px]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {cards.map((card, i) => {
          const d = wrap(i - active);
          const dist = Math.abs(d);
          const rotate = d * STEP_DEG;
          // Card central (ativo) cresce ~22% para ganhar destaque; cresce de forma
          // animada porque o transform tem transition de 0.75s.
          const scale = dist === 0 ? 1.22 : Math.max(0, 1 - 0.04 * dist);
          const opacity = Math.max(0, 1 - 0.2 * dist);
          const noAnim = reduced || instant.includes(i);
          return (
            <div
              key={i}
              className="absolute left-1/2 top-4 ml-[-54px] md:ml-[-80px]"
              style={{
                transformOrigin: "50% 1000px",
                transform: `rotate(${rotate}deg)`,
                transition: noAnim ? "none" : baseTransition,
                zIndex: 30 - dist, // abaixo da navbar (z-50)
              }}
            >
              <button
                onClick={() => {
                  setActive(i);
                  markManual();
                }}
                onMouseEnter={dist === 0 ? () => setPaused(true) : undefined}
                onMouseLeave={dist === 0 ? () => setPaused(false) : undefined}
                aria-label={card.name}
                className="block w-[108px] h-[108px] md:w-[160px] md:h-[160px] rounded-[10px] overflow-hidden ring-1 ring-white/10 shadow-sm"
                style={{
                  transform: `scale(${scale})`,
                  opacity,
                  transition: noAnim ? "none" : baseTransition,
                }}
              >
                <img
                  src={card.image}
                  alt={card.name}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </button>
            </div>
          );
        })}
      </div>

      {/* Título do projeto ativo + setas discretas */}
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-14 mt-6 flex items-center justify-center gap-5">
        <button
          onClick={() => go(-1)}
          aria-label="Projeto anterior"
          className="text-2xl leading-none text-white/40 hover:text-white transition-colors"
        >
          ‹
        </button>
        <div className="text-center min-w-[200px] md:min-w-[260px]">
          <span
            key={active}
            className="font-serif text-[20px] md:text-[24px] inline-block animate-fade-up"
          >
            {cards[active].name}
          </span>
        </div>
        <button
          onClick={() => go(1)}
          aria-label="Próximo projeto"
          className="text-2xl leading-none text-white/40 hover:text-white transition-colors"
        >
          ›
        </button>
      </div>
    </section>
  );
}
