import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../../lib/gsap";

type Props = {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
};

/** Número que conta de 0 até `to` quando entra no ecrã. Reduced-motion → valor final direto. */
export default function Counter({ to, suffix = "", prefix = "", duration = 1.4, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const set = (v: number) => (el.textContent = `${prefix}${Math.round(v)}${suffix}`);

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        set(to);
        return;
      }
      set(0);
      // IntersectionObserver: conta quando entra em vista (fiável mesmo se já visível no load).
      const io = new IntersectionObserver(
        (entries, obs) => {
          if (!entries[0].isIntersecting) return;
          obs.disconnect();
          const obj = { v: 0 };
          gsap.to(obj, { v: to, duration, ease: "power2.out", onUpdate: () => set(obj.v) });
        },
        { threshold: 0.1 }
      );
      io.observe(el);
      return () => io.disconnect();
    },
    { scope: ref, dependencies: [to] }
  );

  return (
    <span ref={ref} className={className}>
      {prefix}
      {to}
      {suffix}
    </span>
  );
}
