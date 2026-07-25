import { useGSAP } from "@gsap/react";
import type { RefObject } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";

/**
 * Reveal-on-scroll editorial e subtil para todas as <section id="…">.
 * Por secção: o título faz um "wipe" (clip-path) + os elementos [data-reveal]
 * sobem com fade e stagger, quando a secção entra no ecrã (once).
 *
 * Reduced-motion: nada corre — os elementos ficam no estado natural (visíveis).
 * Sem JS: os from/fromTo não se aplicam → conteúdo visível por defeito (seguro).
 */
export function useSiteReveals(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const sections = gsap.utils.toArray<HTMLElement>(
          "section[id]",
          scope.current ?? undefined
        );

        sections.forEach((sec) => {
          const title = sec.querySelector<HTMLElement>("[data-reveal-title]");
          const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", sec);
          if (!title && items.length === 0) return;

          const tl = gsap.timeline({
            scrollTrigger: { trigger: sec, start: "top 80%", once: true },
          });

          if (title) {
            tl.from(title, { y: 32, opacity: 0, duration: 0.9, ease: "power3.out" }, 0);
          }
          if (items.length) {
            tl.from(
              items,
              { y: 24, opacity: 0, duration: 0.7, ease: "power3.out", stagger: 0.08 },
              title ? 0.14 : 0
            );
          }
        });

        // Parallax subtil dos blobs [data-parallax] — via listener de scroll + quickTo
        // (NÃO ScrollTrigger, para não colidir com os triggers dos reveals). Dentro deste
        // mesmo hook para não introduzir um 2.º hook (evita quebra de ordem de hooks).
        const blobs = gsap.utils.toArray<HTMLElement>("[data-parallax]", scope.current ?? undefined);
        const setters = blobs.map((el) =>
          gsap.quickTo(el, "yPercent", { duration: 0.6, ease: "power3.out" })
        );
        let ticking = false;
        const updateParallax = () => {
          const vh = window.innerHeight;
          blobs.forEach((el, i) => {
            const r = el.getBoundingClientRect();
            const progress = gsap.utils.clamp(-1, 1, (r.top + r.height / 2 - vh / 2) / vh);
            setters[i](progress * -18);
          });
          ticking = false;
        };
        const onScroll = () => {
          if (!ticking) {
            ticking = true;
            requestAnimationFrame(updateParallax);
          }
        };
        if (blobs.length) {
          window.addEventListener("scroll", onScroll, { passive: true });
          updateParallax();
        }

        // Recalcula os triggers depois de fontes/imagens carregarem.
        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener("load", refresh);
        return () => {
          window.removeEventListener("load", refresh);
          window.removeEventListener("scroll", onScroll);
          gsap.killTweensOf(blobs);
        };
      });
    },
    { scope }
  );
}
