import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type TouchEvent,
} from "react";
import { useTranslation } from "react-i18next";

// 9 cards (ímpar → arco simétrico). Adicionar mais projetos aqui estende o arco.
// tall?: true  → a imagem é um screenshot COMPRIDO (página inteira). Nesse caso, quando
// o card está em destaque (central), a imagem "rola" do topo ao fundo em loop, como um
// mini-walkthrough do site. Sem tall, o card é um quadrado estático normal.
const cards: { name: string; image: string; tall?: boolean }[] = [
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

// Ângulo entre cards (rotate = (índice - ativo) * STEP). Responsivo: no mobile o
// ecrã é estreito, então um passo menor junta os cards (leque) e deixa mais à vista;
// no desktop um passo maior dá folga limpa entre os cards já maiores.
const STEP_MOBILE = 6.5;
const STEP_DESKTOP = 11;
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
  const arcRef = useRef<HTMLDivElement>(null);
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
  const [step, setStep] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(min-width: 768px)").matches
      ? STEP_DESKTOP
      : STEP_MOBILE
  );

  // Passo do arco muda com o breakpoint (mobile mais junto, desktop mais aberto).
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => setStep(mq.matches ? STEP_DESKTOP : STEP_MOBILE);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Marca interação manual (seta/swipe/clique) → o autoplay reinicia a contagem e triplica o tempo.
  const markManual = () => {
    manualRef.current = true;
    setManualNonce((n) => n + 1);
  };
  const go = (dir: 1 | -1) => {
    setActive((a) => (a + dir + N) % N);
    markManual();
  };
  // Referência sempre atualizada para o listener nativo de wheel (anexado uma vez).
  const goRef = useRef(go);
  goRef.current = go;

  // Desktop: com o rato sobre a zona dos cards, a roda do rato roda os cards em
  // vez de rolar a página. Usa listener NATIVO com { passive: false } porque o
  // onWheel do React é passivo e não deixa fazer preventDefault.
  useEffect(() => {
    const el = arcRef.current;
    if (!el) return;
    let accum = 0;
    let last = 0;
    const STEP = 50; // px de scroll acumulado por cada card rodado
    const onWheel = (e: WheelEvent) => {
      // Só no desktop; no mobile/tablet deixa a página rolar normalmente.
      if (!window.matchMedia("(min-width: 768px)").matches) return;
      e.preventDefault();
      const now = performance.now();
      if (now - last > 200) accum = 0; // scrolls separados não se somam
      last = now;
      accum += e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY; // normaliza linhas→px
      if (accum >= STEP) {
        goRef.current(1);
        accum = 0;
      } else if (accum <= -STEP) {
        goRef.current(-1);
        accum = 0;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

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

  // Deteta os cards que dão a volta. Em vez de os "colar" já na posição final,
  // marcamo-los como `instant`: nesse frame são desenhados UM passo ALÉM da borda
  // (fora do ecrã, invisíveis) sem animação — e no frame seguinte, ao limpar
  // `instant`, deslizam suavemente para o lugar (entra com movimento, não salta).
  // Duplo requestAnimationFrame garante que o frame "fora do ecrã" chega a pintar
  // antes de ligar a transição, senão o browser saltava direto para o destino.
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
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setInstant([]));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
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
      id="trabalho"
      className="relative isolate rounded-t-[2rem] md:rounded-t-[3rem] -mt-8 md:-mt-12 bg-ink text-white py-24 md:py-32 overflow-hidden"
    >
      {/* Texto centralizado — usa a copy da secção Trabalho (chaves work.*). */}
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-14 text-center">
        <div
          data-reveal
          className="text-caption font-mono-tech uppercase tracking-[0.25em] text-white/60"
        >
          {t("work.label")}
        </div>
        <h2 data-reveal-title className="mt-4 font-serif text-h2 text-balance">
          {t("work.headline.p1")}{" "}
          <span className="italic text-white/55">{t("work.headline.p2")}</span>
        </h2>
        <p data-reveal className="mt-4 mx-auto max-w-xl text-body-lg text-white/70">
          {t("work.description")}
        </p>
      </div>

      {/* Leque curvo infinito de cards quadrados */}
      <div
        ref={arcRef}
        className="relative mt-16 h-[240px] md:h-[360px]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {cards.map((card, i) => {
          const d = wrap(i - active);
          const dist = Math.abs(d);
          const teleporting = instant.includes(i);
          // No frame do salto, o card que dá a volta fica UM passo além da borda
          // (fora do ecrã) e invisível; a seguir desliza+aparece para a posição real.
          const rotate = (teleporting ? d + Math.sign(d) : d) * step;
          // Card central (ativo) cresce ~22% para ganhar destaque; cresce de forma
          // animada porque o transform tem transition de 0.75s.
          const scale = dist === 0 ? 1.22 : Math.max(0, 1 - 0.04 * dist);
          const opacity = teleporting ? 0 : Math.max(0, 1 - 0.2 * dist);
          const noAnim = reduced || teleporting;
          return (
            <div
              key={i}
              className="absolute left-1/2 top-4 ml-[-64px] md:ml-[-88px]"
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
                className="block w-[128px] h-[128px] md:w-[176px] md:h-[176px] rounded-[12px] overflow-hidden ring-1 ring-white/10 shadow-sm"
                style={{
                  transform: `scale(${scale})`,
                  opacity,
                  transition: noAnim ? "none" : baseTransition,
                }}
              >
                <img
                  src={card.image}
                  alt={card.name}
                  className={`w-full h-full object-cover${
                    card.tall && dist === 0 && !reduced ? " animate-scroll-shot" : ""
                  }`}
                  // Screenshot comprido: em repouso mostra o TOPO da página; ao ficar
                  // em destaque, a classe acima anima o object-position até ao fundo.
                  style={card.tall ? { objectPosition: "50% 0%" } : undefined}
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
