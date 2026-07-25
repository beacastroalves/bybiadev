# Motion & Modernização — ByBia.dev

**Versão v1 — 2026-07-25** | Lente: UI/UX + frontend design. Objetivo: elevar de "bem feito" para **premium/editorial moderno** (nível Awwwards clean), com GSAP, transições e separadores — sem perder o minimalismo nem a performance.

---

## 0. Princípio orientador

A marca é **serifada elegante (Instrument Serif) + editorial**. A modernização certa **não** é WebGL/efeitos barulhentos — é **movimento com propósito**: revelar conteúdo ao scroll, dar profundidade e ritmo, guiar o olho. *Menos, mas impecável.* Tudo com `prefers-reduced-motion` respeitado e a animar só `transform`/`opacity` (GPU).

---

## 1. Diagnóstico do estado atual

| Área | Hoje | Lacuna |
|---|---|---|
| Entrada de conteúdo | `fade-up` **só no hero** (CSS, no load) | Restantes secções aparecem "secas" — sem reveal ao scroll |
| Títulos | Estáticos | Sem reveal editorial (linha a linha / máscara) |
| Números (stats) | Estáticos (100% · 2024 · 48h) | Sem count-up ao entrar |
| Imagens/blobs | Blobs estáticos; imagens fixas | Sem parallax / profundidade |
| Marquee (Trabalho) | Loop linear constante | Sem reação ao scroll (velocidade) |
| Separadores | **1 só** (glass badge Sobre↔Processo) | Transições entre secções abruptas (troca de cor seca) |
| Transições | Hover em botões/cards; acordeão FAQ | Sem transições de secção / profundidade |

**Conclusão:** a base (tipografia, tokens, layout) está sólida; falta a **camada de movimento e transição** que faz um site parecer 2025/2026.

---

## 2. Práticas internacionais atuais (2025/2026)

- **Reveal-on-scroll** subtil (opacity + `translateY` 16–32px, 0.6–0.8s, easing `power3.out`/`expo.out`, stagger 0.06–0.1s, `once: true`). É o standard de qualquer site premium.
- **Text reveals** por linha/palavra com máscara (`overflow:hidden` + slide up) — assinatura editorial. GSAP **SplitText** (agora **grátis**, desde 2024).
- **Scroll-linked** (scrub): parallax de imagens/blobs, marquee com velocidade, progress. GSAP **ScrollTrigger**.
- **Sticky stacking / painéis sobrepostos com cantos arredondados** — secções que "encavalitam" ao scroll. Muito usado em SaaS/agências 2025.
- **Smooth scroll** virtual (**Lenis**) como companheiro do ScrollTrigger — a "manteiga" dos sites Awwwards. *(Opcional — pode chocar com o nosso scroll de âncoras; ver §6.)*
- **Native CSS scroll-driven animations** (`animation-timeline: view()`) — o futuro nativo, já em Chrome/Edge. Mais leve para reveals simples, mas menos poderoso e sem Safari/FF estáveis. **Recomendação:** GSAP para o rico (cross-browser, robusto); CSS scroll-driven só se quiseres zero-dependências para reveals básicos.
- **Micro-interações**: botões magnéticos, tilt/zoom em cards, cursor custom — *usar com parcimónia* (a11y). Nesta marca: só zoom subtil em cards e talvez magnético no CTA principal.
- **Regras de ouro**: gate por reduced-motion; animar só transform/opacity; `will-change` cirúrgico; reveals `once:true` (não re-animar); nada que atrase o LCP do hero.

---

## 3. Stack recomendada

| Pacote | Para quê | Prioridade |
|---|---|---|
| `gsap` | Core + **ScrollTrigger** (reveals, scrub, parallax) + **SplitText** (text reveal) — plugins todos grátis | ✅ base |
| `@gsap/react` | Hook `useGSAP()` — integração React 19 com cleanup automático (evita fugas em StrictMode/HMR) | ✅ base |
| `lenis` | Smooth scroll virtual (opcional) | ⚠️ P2 (ver conflito §6) |

Integração: um util `useGSAP` por componente/secção, dentro de `gsap.matchMedia()` para gating de reduced-motion.

---

## 4. Oportunidades priorizadas

### P0 — impacto alto, risco baixo (a base do "moderno")
1. **Reveal-on-scroll global** — cada secção revela eyebrow → título → corpo/cards com stagger ao entrar (`ScrollTrigger`, `once:true`). *É o que mais muda a perceção.* Aplicar em Problema, PorqueSite, Fricção, Sobre, Processo, Trabalho, FAQ, Agenda.
2. **Count-up dos números** — hero (100% · 2024 · 48h) e stats do Sobre contam ao entrar no ecrã.
3. **Reveal editorial dos títulos** — os `<h2>` serifados sobem por máscara (linha a linha via SplitText). Assinatura premium, discreta.

### P1 — profundidade e ritmo
4. **Parallax subtil** — blobs de fundo e imagens (Sobre workspace, cards do Trabalho) deslocam-se em scrub. Dá profundidade sem distrair.
5. **Marquee com velocidade** — o ticker do Trabalho acelera/inclina conforme a velocidade do scroll (efeito muito atual).
6. **Separadores/transições de secção** — resolver as trocas de cor abruptas (ver §5).

### P2 — "wow" opcional (usar com critério)
7. **Pin + scrub no Processo** — fixar a secção e "raspar" pelos 4 passos ao scroll (storytelling). Impacto alto, mas mais trabalho e risco de exagero.
8. **Lenis smooth scroll** — só se quisermos o toque Awwwards completo (cuidado com âncoras).
9. **CTA magnético / cursor** — micro-luxo; avaliar a11y.

---

## 5. Transições, divisores e separadores

O ponto fraco atual: secções trocam de cor de repente e só há 1 separador. Opções (podem combinar-se):

| Opção | O que é | Vibe | Nota |
|---|---|---|---|
| **A. Painéis sobrepostos arredondados** | Cada secção com `rounded-t-[2.5rem]` a encavalitar a anterior (`-mt-*` + z-index/sticky) | Moderno SaaS 2025 | **Recomendado** — elegante, dá profundidade |
| **B. Fade de gradiente** | Faixa de gradiente no topo da secção a fundir com a cor anterior | Suave, editorial | Bom para dark↔light |
| **C. Linha divisória animada** | Linha fina de gradiente que "desenha" ao scroll (`scaleX`) | Minimal | Discreto, barato |
| **D. Marquee divisor** | Faixa de texto a correr entre secções | Trendy | Pode ficar barulhento — usar 1x |
| **E. Generalizar o glass badge** | O separador atual como sistema entre blocos-chave | Assinatura da marca | Manter, não abusar |

**Recomendação para esta marca:** **A (painéis arredondados sobrepostos)** como transição base entre light↔dark, + **C (linha animada)** em fronteiras subtis, mantendo o **glass badge (E)** como acento único antes do Processo. Nada de D em excesso.

---

## 6. Notas de implementação

- **Reduced-motion:** envolver tudo em `gsap.matchMedia()` com `"(prefers-reduced-motion: no-preference)"`; no ramo `reduce`, deixar os elementos **visíveis e estáticos** (nunca presos a `opacity:0`).
- **FOUC/anti-flash:** para reveals, pôr o estado inicial via GSAP (`gsap.set`) no mesmo tick, ou usar `autoAlpha`. Nunca esconder por CSS sem garantir que o reduced-motion mostra.
- **React 19:** usar `useGSAP(() => {...}, { scope: ref })` do `@gsap/react` — trata do cleanup (essencial com HMR/StrictMode).
- **Performance:** `once: true` nos reveals; `will-change` só durante a animação; não animar o hero de forma que atrase o LCP (o hero pode manter o `fade-up` CSS atual).
- **Lenis (se usado):** substitui o scroll nativo → é preciso religar o `ScrollTrigger.scrollerProxy` e **rever o scroll de âncoras** (o nosso `scroll-behavior: smooth` + handler de deep-link). Por isso está em P2.
- **Bundle:** GSAP core+ScrollTrigger+SplitText ~ pesa, mas é tree-shaken e standard. Lazy-load abaixo do hero se o LCP apertar.

---

## 6.1 P0 — ✅ FEITO (2026-07-25)

Instalado `gsap@3.15` + `@gsap/react`. Base de motion criada e verificada no browser:
- **`src/lib/gsap.ts`** — regista o ScrollTrigger uma vez.
- **`src/hooks/useSiteReveals.ts`** — reveal-on-scroll por secção: título + `[data-reveal]` (eyebrow, corpo, cards) sobem com fade e stagger ao entrar (`once`, `top 80%`). Gated por `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`; sem JS → conteúdo visível (seguro). Ligado em `page.tsx` (ref no root).
- **`src/pages/home/components/Counter.tsx`** — count-up (IntersectionObserver + gsap); reduced-motion → valor final direto. Aplicado no hero (100%, 48h) e no Sobre (3, 100%, 48h); "2024" fica estático.
- **Marcadores** `data-reveal` / `data-reveal-title` nas 8 secções.
- `tsc` + `vite build` + `eslint` limpos.

> **Nota:** o "text-reveal por máscara" (clip-wipe do título) foi trocado por **fade+rise** por robustez — o `fromTo` com `clip-path` ficava preso em alguns casos. O clip-wipe fica como polish **P1** (a fazer com wrapper `overflow-hidden` ou SplitText, testado com cuidado).

## 6.2 P1 — parcial (2026-07-25)

- ✅ **Separadores / transições — painéis arredondados sobrepostos** (opção A). Removido o glass badge (era inconsistente); cada secção ganhou `rounded-t-[2rem] md:rounded-t-[3rem] -mt-8 md:-mt-12` → os painéis "encavalitam-se" ao scroll (light↔dark). Look premium, verificado no browser. **É o item central que o utilizador pediu (divisores/separadores).**
- ⏸️ **Parallax dos blobs** — implementado mas **revertido**: os `ScrollTrigger` de `scrub` do parallax, no mesmo contexto do hook de reveals, **partiam os reveals** (ficavam presos no from-state, opacity 0). Isolado empiricamente (remover o parallax repôs os reveals). Os `data-parallax` ficam nos blobs, prontos para uma re-tentativa **isolada** (useGSAP/contexto separado ou CSS scroll-driven).
- ⏸️ **Marquee com velocidade** — implementado mas **revertido**: o loop GSAP não aplicava transform (marquee parado). Voltou ao CSS `animate-marquee` (constante, funciona). Re-tentar com abordagem GSAP diferente.
- ⏸️ **Clip-wipe dos títulos** — continua diferido (do P0); os títulos usam fade+rise robusto.

**Lição:** misturar muitos `ScrollTrigger` (reveals `once` + parallax `scrub`) no mesmo contexto do hook causou interferência. Re-tentativas de parallax/marquee devem ficar em **contextos `useGSAP` isolados** por componente, testados um a um.

## 7. Roadmap sugerido

1. **P0** — instalar `gsap` + `@gsap/react`; util de reveal; aplicar reveal-on-scroll + count-up + text-reveal dos títulos. *(maior salto de perceção, risco baixo)*
2. **P1** — parallax de blobs/imagens; marquee com velocidade; transições de secção (painéis arredondados + linha animada).
3. **P2** — (opcional) pin/scrub no Processo; Lenis; micro-interações.

Cada passo é reduced-motion-safe e verificável no browser.

## Changelog
- v1 (2026-07-25) — Diagnóstico de motion, práticas 2025/2026, stack GSAP recomendada, oportunidades P0–P2, opções de transição/separadores, notas de implementação.
