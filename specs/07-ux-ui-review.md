# Auditoria UX/UI e Padronização — ByBia.dev

**Versão v1 — 2026-07-24** | Base: código atual (`src/pages/home/components`, `src/index.css`, `tailwind.config.ts`) + verificação no browser (1600px)

Objetivo: rever o site com boas práticas de design 2026 e propor um sistema tipográfico e de tokens padronizado. Recomendações, priorizadas — ainda não implementadas.

---

## 0. Diagnóstico em uma frase

O site tem uma direção de arte forte (serifada elegante + mono técnico + paleta roxo/menta), mas **não tem sistema**: os mesmos papéis (título de secção, corpo, eyebrow) aparecem com valores diferentes em cada componente, e há **inconsistências de fonte que renderizam errado**. Falta uma camada de *design tokens* e escala tipográfica única.

---

## 1. Bugs verificados (corrigir primeiro — P0)

### 1.1 Títulos de secção na fonte errada ⚠️ (confirmado no browser)
- `font-serif-display` está definido em `index.css` → **Instrument Serif** (a serifada da marca).
- `font-serif` **não está definido** e o `tailwind.config.ts` tem `extend: {}` → cai no genérico do Tailwind: `ui-serif, Georgia, "Times New Roman"`.
- **Resultado:** o Hero usa Instrument Serif, mas **11 títulos** (Sobre, Blog, e as 4 secções novas do funil) renderizam em **Georgia/Times**. O olho nota que "não é a mesma fonte".
- **Correção:** usar **uma só** classe/token para todos os títulos (Instrument Serif). Substituir todos os `font-serif` por `font-serif-display` (ou, melhor, definir `serif` no Tailwind — ver §4).

### 1.2 Eyebrows em monospace do sistema (confirmado)
- Vários eyebrows usam `font-mono` (genérico → **ui-monospace/Menlo**) e outros `font-mono-tech` (**JetBrains Mono**). Lado a lado, são fontes diferentes.
- **Correção:** todos os eyebrows/labels em `font-mono-tech`.

### 1.3 Hero — "built by hand" quase invisível ⚠️
- O `.text-shimmer` usa gradiente base **#0a0a0a** (quase preto) — foi feito para fundo claro. No hero escuro, a palavra em shimmer (`hero.title.part4`) fica ilegível fora do brilho que passa.
- **Correção:** versão do shimmer para fundo escuro (base branca/clara), ou tirar o shimmer do hero e usar cor sólida.

---

## 2. Acessibilidade (boas práticas 2026 — P0/P1)

### 2.1 Contraste de texto insuficiente
- Labels a `text-white/40` e `text-white/50` (11px) sobre `#0F0E1A` ficam ~2.5:1 — abaixo do mínimo **WCAG AA 4.5:1** para texto pequeno. Idem `text-white/55` em parágrafos de ênfase.
- **Correção:** mínimo `text-white/70` para texto pequeno em fundo escuro; `text-white/60` só para texto ≥18px/decorativo.

### 2.2 Sem `prefers-reduced-motion`
- `animate-font-cycle`, `text-shimmer`, `animate-marquee`, `animate-float-slow` e os `fade-up` correm sempre, alguns em loop infinito. 2026 exige respeitar utilizadores sensíveis a movimento.
- **Correção:** bloco global `@media (prefers-reduced-motion: reduce)` que desliga/encurta animações e para os loops.

### 2.3 Sem estados de foco de teclado
- Botões e links têm `:hover` mas não `:focus-visible`. Navegação por teclado fica sem indicação.
- **Correção:** anel de foco padrão (`focus-visible:ring-2 ring-[#534AB7] ring-offset-2`) nos elementos interativos.

### 2.4 Outros
- Confirmar alvos de toque ≥ 44px (o toggle de idioma e o `+` da FAQ estão no limite).
- FAQ: bom já ter `aria-expanded`; falta associar o painel ao botão (`aria-controls`/`id`).

---

## 3. Escala tipográfica padrão (o centro do pedido — P1)

Hoje há **~30 tamanhos** `text-[Npx]` avulsos e **10 valores de `leading`**. Proposta: reduzir a **8 papéis**, com **tipografia fluida** (`clamp()`) para os títulos — elimina as cadeias de 4-5 breakpoints (o Hero tem 5: 56/68/78/88/104).

| Token | `clamp()` (fluido) | ~px | Uso | Substitui hoje |
|---|---|---|---|---|
| `display` | `clamp(2.75rem, 1.4rem + 6vw, 6.5rem)` | 44→104 | Hero H1 | 56/68/78/88/104 |
| `h2` | `clamp(2.25rem, 1.2rem + 4.2vw, 4.5rem)` | 36→72 | **Todos** os títulos de secção | 38/44/54/60/64/76/80 |
| `h3` | `clamp(1.5rem, 1.1rem + 1.4vw, 2rem)` | 24→32 | Títulos de cartão (Blog, projetos) | 26/28/30/32/36 |
| `h4` | `1.25rem` | 20 | Pergunta FAQ, sub-cabeçalhos | 19/22 |
| `body-lg` | `1.125rem` · leading 1.7 | 18 | Parágrafos do funil | 17/18 |
| `body` | `1rem` · leading 1.65 | 16 | Descrições padrão | 15/16 |
| `small` | `0.875rem` | 14 | Metadados, links de footer | 13/14 |
| `caption` | `0.6875rem` · tracking 0.18em | 11 | Eyebrows/labels | 10/11/12 |

**Regras de acompanhamento:**
- Títulos (`display`/`h2`/`h3`): `tracking-[-0.03em]`, `text-balance`, `leading` 0.98–1.05.
- Corpo: medida máxima de leitura ~**70ch** (`max-w-[65ch]`) — hoje varia de `max-w-md` a full-width.
- Uma só família por papel: títulos → Instrument Serif; corpo → Inter; labels → JetBrains Mono.

> Nota rem vs px: propor **rem** dentro do `clamp()` (respeita o zoom de fonte do utilizador = acessibilidade). O código usa px arbitrário; a migração unifica em rem.

---

## 4. Design tokens (P1) — fonte única de verdade

Hoje as cores (`#534AB7`, `#02C39A`, `#0F0E1A`, `#f3ede4`, `#fafafa`) e as fontes estão **hardcoded** em dezenas de sítios, e o `tailwind.config.ts` está vazio. Boas práticas 2026: centralizar em tokens.

Mover para `tailwind.config.ts › theme.extend`:
- **colors:** `brand` (#534AB7), `brand-deep` (#433aa1), `accent` (#02C39A), `ink` (#0F0E1A), `cream` (#f3ede4), `paper` (#fafafa).
- **fontFamily:** `display` (Instrument Serif), `sans` (Inter), `mono` (JetBrains Mono).
- **fontSize:** a escala da §3.

Ganhos: trocar a paleta/fonte num sítio; base pronta para **dark/light mode**; classes semânticas (`text-brand`, `font-display`, `text-h2`) em vez de hex mágico.

---

## 5. Ritmo e espaçamento (P2)

- **Bom:** todas as secções já usam `py-24 md:py-32` e agora o contentor `max-w-[1200px]` (uniforme).
- **A padronizar:** o espaçamento interno varia (eyebrow→título `mb-2`/`mb-5`; título→corpo `mt-7`/`mt-8`/`mt-9`; blocos `mb-12`/`mb-16`/`mb-24`). Propor 3 degraus fixos: `mb-5` (eyebrow), `mt-8` (título→corpo), `gap-10 lg:gap-14` (grelha) — já é o padrão das secções novas; alinhar as antigas.

---

## 6. Componentes e consistência (P2)

- **Botões:** padding varia (`px-5/px-6/px-7 · py-3/py-3.5`). Definir 2 variantes: **primário** (fundo roxo) e **secundário** (contorno), com padding e `rounded-full` fixos. Aplicar em Hero, Sobre, Footer, FAQ.
- **Eyebrows:** unificar num só padrão (`caption` + `font-mono-tech` + `tracking-[0.18em]` + peso + opacidade por fundo). Hoje uns têm `font-semibold`, outros não; uns `tracking-[0.18em]`, outros `tracking-wider`.
- **Cartões:** Blog e Trabalho usam raios/bordas ligeiramente diferentes (`rounded-2xl` vs `rounded-xl`, `border-white/10`). Fixar um estilo de cartão.
- **Imagens de stock (Pexels)** repetidas no Sobre/Processo/Blog — substituir por reais quando existirem (ligado ao `05`/`06`: nada de prova fictícia).

---

## 6.1 Migração de cores → tokens — ✅ FEITA (2026-07-24)

Todas as cores da marca nas classes passaram de hex arbitrário para tokens do `tailwind.config`:
`[#534AB7]`→`brand`, `[#433aa1]`→`brand-deep`, `[#7F77DD]`→`brand-soft`, `[#9D8EFF]`→`brand-light`, `[#02C39A]`→`accent`, `[#0F0E1A]`→`ink`, `[#f3ede4]`→`cream`, `[#fafafa]`→`paper`. Aplica-se a `bg-`, `text-`, `border-`, `from-/via-`, `hover:` e variantes de opacidade (`bg-brand/15` etc.).

- **Deixados como arbitrário** (sem token): `#0a0a0a` (fundo near-black do hero) e `#02b38e` (1 hover). Os `rgba(...)` em shadows e o `style` inline do Sobre também ficam.
- **Gotcha encontrado:** cores **nomeadas** só aceitam opacidades da escala do Tailwind — `bg-brand/12` **não gera** (ao contrário do `bg-[#hex]/12` arbitrário). Corrigido para `/10`. Ao usar opacidades, ficar pelos valores da escala (…/10, /15, /20, /30, /35, /40…).
- Verificado no browser: cores renderizam idênticas ao anterior. `tsc` + `vite build` limpos.

## 7. O que já está bom (manter)

- Direção de arte coesa (serifada + mono + roxo/menta) e uso de `text-balance`.
- Secções com `py` e contentor uniformes; grelha editorial título/corpo consistente.
- Animações `fade-up` escalonadas com bom easing.
- Deep-links de WhatsApp e i18n trilingue.

---

## 8. Roadmap sugerido

**P0 — correção (o olho nota já) — ✅ FEITO (2026-07-24):**
1. ✅ Fontes corrigidas globalmente via `tailwind.config.ts › fontFamily` (`serif` → Instrument Serif, `mono` → JetBrains Mono, `sans` → Inter). Sem editar 11 ficheiros. Verificado no browser: `h2.font-serif` passou de Georgia/Times → Instrument Serif; `.font-mono` → JetBrains Mono.
2. ✅ Eyebrows resolvidos pela mesma mudança (`font-mono` agora = JetBrains). `font-mono-tech` continua válido.
3. ✅ `.text-shimmer` (index.css) com base branca + brilho lilás (#c9c2ff) para fundo escuro. "built by hand" agora legível.
4. ✅ Contraste subido no Footer (`white/40→60`, `white/50→65`) e Blog (meta `white/40→60`, `white/50→65`). Marquee decorativo grande do Trabalho mantido. `tsc` + `vite build` limpos.

**P1 — sistema — ✅ FEITO (2026-07-24):**
5. ✅ Escala tipográfica única de 8 papéis no `tailwind.config.ts › fontSize`, títulos **fluidos com `clamp()`**. Aplicada a todas as secções (`text-display`/`text-h2`/`text-h3`/`text-h4`/`text-body-lg`/`text-body`/`text-small`/`text-caption`), substituindo ~30 tamanhos avulsos. Numéricos (stats), ícones e o marquee decorativo mantidos.
6. ✅ Tokens de cor da marca definidos no config (`brand`/`accent`/`ink`/`cream`/`paper`) para adoção gradual (migração hex→token fica como follow-up incremental).
7. ✅ `prefers-reduced-motion` (desliga shimmer/marquee/font-cycle/float e encurta transições) + `:focus-visible` (anel roxo) no `index.css`.

**Afinação pós-feedback (2026-07-24):** títulos estavam pequenos no desktop e labels/navbar demasiado espaçados → `h2` 72→80px máx, `h3` 32→36px, `display` 104→108px; `caption` letter-spacing 0.18→**0.1em** (mais minimal); `small` 14→**13px** (navbar/rodapé).

**Recalibração best-practice (2026-07-24):** 108/80px era escala editorial, grande demais para landing page (prejudica leitura e conversão). Ancorada numa escala modular restrained, valores desktop dentro da norma de sites bem desenhados (hero 56–72, secções 36–48, h3 24–30):

| Papel | Mobile → Desktop | clamp |
|---|---|---|
| `display` (hero) | 40 → **72px** | `clamp(2.5rem, 1.5rem + 4.4vw, 4.5rem)` |
| `h2` (secções) | 32 → **48px** | `clamp(2rem, 1.45rem + 2.4vw, 3rem)` |
| `h3` (cartões) | 24 → **30px** | `clamp(1.5rem, 1.25rem + 1.1vw, 1.875rem)` |
| `h4` | 19 → 22px | `clamp(1.1875rem, 1.05rem + 0.55vw, 1.375rem)` |
| `body-lg` / `body` | 18 / 16px | — |
| `small` / `caption` | 13 / 11px | — |

Verificado no browser (1536px): hero 72, h2 48, h3 30. Hierarquia limpa (72›48›30›16), hero cabe no ecrã, headlines longas do funil em 2 linhas.

**Nota de verificação:** mudanças ao `tailwind.config.ts` exigem **reiniciar** o dev server (o Vite não faz HMR fiável da config) — confirmar sempre com um servidor fresco.

**P2 — polish:**
8. Ritmo de espaçamento padrão (§5).
9. Variantes de botão + eyebrow único (§6).

## Changelog
- v1 (2026-07-24) — Auditoria UX/UI: 3 bugs de fonte/legibilidade verificados, 4 pontos de a11y, escala tipográfica de 8 papéis, plano de design tokens, roadmap P0–P2.
