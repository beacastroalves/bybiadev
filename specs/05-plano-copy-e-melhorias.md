# Plano de Copy e Pontos de Melhoria — ByBia.dev

**Versão v1 — 2026-07-23** | Base: código atual (`src/i18n`, `src/pages/home`) + `product-marketing.md` + `04-copy-site-e-abordagens.md`

---

## 0. O achado central: há duas copies em conflito

Neste momento coexistem **dois posicionamentos incompatíveis**:

| | **Site atual** (i18n + componentes) | **Specs 04** (estratégia nova) |
|---|---|---|
| Quem | "Empresas e profissionais autónomos portugueses" (amplo) | Dono de negócio local, 35–65, Trás-os-Montes (específico) |
| Voz | Estúdio de design, aspiracional, abstrata | Plana, concreta, resultado primeiro |
| Herói | "Ideias que crescem, no digital" | "O seu negócio existe. No Google, quase não." |
| Preço | Escondido (nenhum) | À vista (€590 / €990 / €1.900) |
| Tratamento | **tu** ("entre ti e o código") | **formal** ("Sr. [Nome]", "Diga-me") |
| Oferta | "Iniciar um projeto" / orçamento | Demo grátis antes de decidir |
| Palavras | usa "soluções", "à medida" | proíbe "soluções", "otimizar", "inovador" |

A copy dos specs 04 é claramente a mais forte e mais orientada à conversão (concreta, com preço, com prova antes/depois, com objeções tratadas). A do site é copy de agência genérica que "podia ser de qualquer um".

**Recomendação:** adotar o *método* e a *voz* dos specs 04 como base do site — mas resolver a tensão com a i18n (secção 3), porque os specs 04 são hiper-locais (Bragança) e o pedido é servir PT-PT, PT-BR e EN.

> **Boa notícia de timing:** `src/pages/home/page.tsx` tem `isPrelaunch = true`. A landing completa (Trabalho, Sobre, Processo, Blog) ainda **não está no ar** — só o herói "Em breve". Dá para reescrever tudo antes de lançar, sem custo de "mudar algo que já circula".

---

## 1. Pontos de melhoria (por tipo de problema)

### 1.1 Concreto vs. vago — a regra nº1 dos specs, violada logo no herói

- **Herói PT-PT** (`hero.title` + `hero.description`): "Ideias que crescem, no digital" / "...soluções digitais à medida para empresas e profissionais autónomos portugueses que decidiram estar no digital a sério."
  - Vago ("ideias que crescem", "no digital a sério"), usa **"soluções"** (palavra proibida nos specs), e não diz o resultado.
  - **Proposta (PT-PT):** título *"O seu negócio existe. No Google, quase não."* / descrição *"Faço sites para pequenos negócios que aparecem nas pesquisas, funcionam no telemóvel e dão para ligar ou reservar num toque. No ar em [X] dias, a partir de €590."*
- **Footer PT-PT** (`footer.brand.description`): "...soluções sólidas e código à medida para o ecossistema digital português." — outra vez **"soluções"** + "ecossistema digital" (abstrato). Reescrever para benefício concreto.

### 1.2 Preço escondido

Os specs são explícitos: *"Preço à vista. Quem esconde o preço parece caro e desconfia-se."* O site não tem **nenhum** preço nem secção de pacotes. O CTA universal é "Iniciar um projeto" (pedir orçamento) — exatamente o que os specs dizem para **não** fazer.

- **Falta:** a Secção 5 (Pacotes: €590/€990/€1.900 + manutenção) e a página de preços dos specs 04. É o maior buraco de conversão.

### 1.3 Prova inventada (risco de credibilidade)

- `Hero.tsx` (modo completo): **"12"** projetos, **"5★"** avaliação — hardcoded.
- `Sobre.tsx` stats: **"12"** projetos robustos, **"100%"**, **"48h"**.
- `hero.stat.rating` = "Avaliação de clientes" / "Avaliação média".

Mas `product-marketing.md` diz que as métricas estão por recolher e o Instagram **começa do zero**; os specs 04 avisam: *"Nunca invente resultados."* Números como "5★" e "12 projetos" sem casos reais associados são o tipo de coisa que destrói confiança num público desconfiado 35–65.

- **Proposta:** ou (a) substituir por prova real e verificável (Benedi/Benedito, Natural Talking, Amanda Lopes) com o formato antes/depois dos specs, ou (b) trocar os números por afirmações honestas e não-numéricas ("Projetos reais, do briefing à entrega", "Resposta em 48h" só se for verdade). Enquanto não houver casos, usar as demos identificadas: *"Exemplo construído para [tipo de negócio]"*.

### 1.4 Tratamento inconsistente — **tu** onde devia ser formal

- PT-PT usa **tu**: "entre ti e o código" (`about.text`), "no teu mundo" (`process.step1`), "o teu negócio", "Fala comigo".
- Mas `product-marketing.md` pede tom "profissional mas próximo" e os specs 04 usam tratamento **formal** ("Sr. [Nome]", "Diga-me", "Ligue-me", sem tratar por tu).
- Falar por "tu" a um dono de restaurante de 55 anos em Bragança soa demasiado familiar e tira autoridade.
- **Decisão a fixar (ver matriz na secção 3.2):** PT-PT → formal/evitar pronome; PT-BR → "você"; EN → "you".

### 1.5 Termos PT-PT/PT-BR misturados

- PT-PT `process.step4.summary`: *"...**hospedamos** o site juntos na tua própria conta de **alojamento**"* — mistura o verbo "hospedar" (que o `product-marketing.md` manda evitar em PT-PT) com o nome correto "alojamento". Usar *"alojamos"* / *"colocamos no ar no seu próprio alojamento"*.
- Confirmar em todo o PT-PT: **alojamento** (não hospedagem), **planear** (não planejar — já correto), **contacto**, **telemóvel**, **ecrã**, **ficheiro**, **ligação**. Ver glossário completo em `04-copy-site-e-abordagens.md §2`.

### 1.6 Blog fora da i18n e com conteúdo fictício

- `Blog.tsx` está **totalmente hardcoded em PT-PT** (0 usos de `t()`), com 3 posts inventados (datas futuras "Jul 2026", imagens de stock do Pexels) e filtros em português fixo.
- Quebra em PT-BR e EN (aparece sempre em PT-PT) e mostra artigos que não existem.
- **Proposta:** ou esconder o Blog até haver 1 artigo real (como já se esconde no pré-launch), ou migrar para i18n + marcar claramente como "em breve". Não publicar posts falsos.

### 1.7 Duas versões do herói a conviver (prelaunch vs. final)

Existe `prelaunch.*` e `hero.*`. Quando `isPrelaunch` passar a `false`, o herói final entra com a copy vaga da secção 1.1. Aproveitar a transição para **substituir a copy final** pela versão concreta, não só desligar o flag.

### 1.8 CTA fraco e sem oferta

- CTA em todo o lado: "Iniciar um projeto" / "Start a project" — pede compromisso antes de dar valor.
- Os specs desenham a oferta que converte: **demo grátis primeiro** ("Ver o meu site antes de decidir" → formulário curto nome/negócio/telefone).
- **Proposta:** CTA primário = *"Quero ver o meu site"* (leva a formulário curto que gera demo); CTA secundário = WhatsApp. O deep-link de WhatsApp pré-preenchido (`whatsapp.link`) já está bem feito — manter e reutilizar.

---

## 2. Leitura pelos Sete Sweeps (resumo executivo)

| Sweep | Estado | Ação principal |
|---|---|---|
| 1. Clareza | ⚠️ | Trocar abstrato ("ideias que crescem") por concreto ("aparecer no Google") |
| 2. Voz e tom | ❌ | Fixar tratamento formal em PT-PT; matar "tu"; remover "soluções/à medida" |
| 3. So What | ⚠️ | Ligar cada feature ao resultado (reservas, chamadas, encomendas) |
| 4. Prove It | ❌ | Remover números inventados; pôr casos reais antes/depois ou demos honestas |
| 5. Especificidade | ⚠️ | Preços à vista, prazos em dias, concelhos, formato "40 chamadas/mês" |
| 6. Emoção | ⚠️ | Usar o "antes" vívido dos specs ("o turista já escolheu antes de chegar cá") |
| 7. Zero risco | ❌ | Demo grátis, "leva o site consigo", manutenção explicada, FAQ de objeções |

---

## 3. Arquitetura trilingue — "termos para facilitar todas as línguas"

O pedido tem uma tensão real: os specs 04 dizem *"dois domínios, duas vozes, nunca copiar texto de um para o outro"* (máxima conversão, hiper-local) — o oposto de "facilitar todas as línguas". A solução não é uma copy única traduzida à letra; é um **esqueleto partilhado com espaços variáveis por locale**.

### 3.1 Princípio: 1 estrutura, 3 vozes, slots variáveis

Toda a copy partilha a **mesma ordem de secções, os mesmos conceitos e o mesmo argumento**. Só variam:

1. **Vocabulário** (glossário PT-PT vs PT-BR vs EN)
2. **Geografia** (não hardcoded — ver 3.3)
3. **Moeda e prova social** (€ / R$ / €; casos e comissões locais)
4. **Tratamento** (matriz 3.2)

Isto mantém a força concreta dos specs em cada idioma sem escrever 3 sites do zero, e sem o erro clássico de traduzir "telemóvel" → "celular" à mão.

### 3.2 Matriz de tratamento (fixar já)

| | Tratamento | Regra prática |
|---|---|---|
| PT-PT | Formal / evitar pronome | Preferir formas verbais ("Diga-me", "O seu negócio"). Nunca "tu/teu/ti". Ênclise: "Ligue-me", não "Me ligue". |
| PT-BR | "você" | Natural e padrão. Próclise: "Me manda o nome". "Estou fazendo", não "a fazer". |
| EN | "you" | Neutro, direto, sem formalidade excessiva. |

> Ação de código: hoje o PT-PT usa "tu" em `about.text`, `process.*` e botões. Reescrever para formas verbais/`o seu`.

### 3.3 Geografia como variável, não como texto fixo

Os specs 04 são Bragança/Vila Real. Para servir 3 mercados sem perder a especificidade (que é o que converte), tratar o lugar como **slot**:

- `region.name`, `region.cities`, `region.proof` por locale:
  - **PT-PT:** "Trás-os-Montes" · "Bragança, Vinhais, Mirandela, Macedo de Cavaleiros, Chaves" · comissões Booking 15–18%
  - **PT-BR:** região do cliente-alvo BR (ex.: "Goiânia e região") · prova local BR
  - **EN:** "your area" / global · prova em €/$ genérica
- Assim a frase "Faço sites para negócios de **{region.name}**..." mantém-se concreta em cada idioma.

### 3.4 Tabela de termos neutros (reduz o fork PT-PT/PT-BR)

Onde for possível **sem soar errado**, escolher palavras partilhadas para o esqueleto, deixando o fork só onde é mesmo necessário:

| Conceito | PT-PT | PT-BR | EN | Neutro possível? |
|---|---|---|---|---|
| dispositivo | telemóvel | celular | phone | ❌ forçar fork ("no telemóvel"/"no celular") |
| alojamento web | alojamento | hospedagem | hosting | ❌ fork |
| contacto | contacto | contato | contact | ⚠️ fork pequeno |
| site | site | site | website/site | ✅ partilhado |
| reservas | reservas | reservas | bookings | ✅ (PT partilhado) |
| encomendas | encomendas | pedidos | orders | ⚠️ fork |
| ficheiros | ficheiros | arquivos | files | ❌ fork |
| Google (ficha) | ficha do Google | perfil do Google | Google Business Profile | ⚠️ |

Regra: preferir substantivos de resultado partilhados (**site, reservas, Google, WhatsApp, mapa, formulário**) na espinha da frase; localizar só os termos-denúncia. Ver lista completa em `04 §2`.

### 3.5 Palavras banidas (aplicar aos 3 idiomas)

Dos specs: **nada de** "soluções/solutions", "otimizar" (fora do sentido técnico SEO), "inovador/innovative", "digitalizar", pontos de exclamação. **A palavra "IA/AI" não aparece.** (O site atual não usa "IA" — bom; mas usa "soluções" em PT-PT: corrigir.)

---

## 4. Plano de copy por secção (esqueleto trilingue)

Adotar a estrutura dos specs 04 §1, com slots. Ordem recomendada da landing:

1. **Herói** — dor concreta + o que faz + prazo + preço-âncora + CTA demo. *(reescrever `hero.*`)*
2. **Barra de credibilidade** — tipos de negócio servidos em `{region.cities}`. *(nova)*
3. **O problema, nas palavras dele** — "o turista/cliente já escolheu antes de chegar". *(nova)*
4. **O que faz diferente** — "não precisa de escrever nada" (copy+design+código na mesma pessoa = diferenciador do `product-marketing.md`). *(adaptar `about`/`process`)*
5. **Como funciona** — 4 passos (já existe em `process.*`, bom — só afinar voz/termos e prazos reais). *(editar)*
6. **Pacotes + preços** — tabela €590/€990/€1.900 + manutenção. *(nova — prioridade máxima)*
7. **Prova** — casos antes/depois reais ou demos honestas. *(reescrever `Trabalho`/stats)*
8. **Objeções (FAQ)** — as 6 dos specs ("já tenho Facebook", "é caro", "o meu sobrinho"...). *(nova)*
9. **Fecho** — "Deixe-me mostrar-lhe primeiro" + CTA demo + contacto. *(reescrever footer CTA)*
10. **Blog** — esconder até ter 1 artigo real, ou i18n + "em breve". *(corrigir)*

O `Processo` atual (4 etapas) é o que está mais perto dos specs e pode ser mantido com edições ligeiras. O grande trabalho novo é **Pacotes/Preços** e **Objeções/FAQ**.

---

## 5. Prioridades (ordem de execução sugerida)

**P0 — antes de sair do pré-launch**
1. Reescrever herói (`hero.title`/`hero.description`) concreto + preço-âncora, nos 3 locales.
2. Decidir e aplicar tratamento formal em PT-PT (matar "tu").
3. Remover/pôr honestos os números de prova ("12", "5★", "100%").
4. Corrigir "hospedamos"→"alojamos" e varrer glossário PT-PT/PT-BR.
5. Esconder Blog fictício (ou marcar "em breve").

**P1 — para a landing completa converter**
6. Criar secção **Pacotes + preços** (i18n, com slot de moeda).
7. Criar secção **Objeções/FAQ** (6 perguntas dos specs).
8. Trocar CTA "Iniciar projeto" → oferta de **demo grátis** ("Quero ver o meu site").
9. Reescrever Prova com casos antes/depois reais.

**P2 — escala trilingue**
10. Extrair geografia para slots `{region.*}` por locale.
11. Migrar Blog para i18n com 1º artigo real.
12. Página de preços dedicada (texto de apoio dos specs §4).

---

## 6. Decisão que precisa de ti

O único ponto que muda o plano e é mesmo teu: **âmbito do posicionamento.**

- **(A) Hiper-local puro** (specs 04 tal como está): PT-PT = Trás-os-Montes, máxima conversão local, e PT-BR/EN ficam como variantes secundárias/genéricas.
- **(B) Trilingue com geografia variável** (recomendado, secção 3.3): mesma força concreta, mas o lugar é um slot — PT-PT aponta a Trás-os-Montes, PT-BR ao mercado brasileiro, EN ao global.

Sem essa decisão, a secção 4 fica igual; muda só quanto se hardcoda a geografia. A recomendação é **(B)**, por ser o que honra o teu pedido de "facilitar todas as línguas" sem perder o que faz a copy converter.

---

## 7. Estado de execução — P0 concluído (opção B)

Aplicado a 2026-07-23, com **geografia neutra** (mudança para Figueira da Foz em ~2 meses → nada fixo em Bragança) e **sem preço fixo** (em revalidação):

- ✅ Herói reescrito nos 3 locales (`hero.title`/`hero.description`), **centrado no serviço (construção de sites), não em "aparecer no Google"**: "Um site à altura do seu negócio, feito à mão." / "A website worthy of your business, built by hand." A descrição lidera com os três serviços — **websites, landing pages e sites institucionais** — com o SEO como atributo de qualidade ("com SEO ao detalhe"), não como promessa central; resultado = confiança + transformar visitas em contactos. Geografia neutra, **sem preço** e sem prazo fechado.
  - *Nota de direção: a Bea faz sites (não marketing/anúncios). O ângulo "aparecer no Google/pesquisas" dos specs 04 fá-la soar a marketing digital — usar SEO só como detalhe de craft, nunca como manchete.*
- ✅ Tratamento **formal** em PT-PT: removido todo o "tu/teu/ti/contigo" em `about.text`, `process.*` e footer ("Tens"→"Tem", "Fala comigo"→"Fale comigo", "contigo"→"consigo", "na tua conta"→"na sua conta").
- ✅ Prova honesta: removidos os números inventados **"12 projetos"** e **"5★"**. Herói passa a `100% · 2024 · 48h`; Sobre troca "12 projetos" por "3 idiomas de trabalho". *(Se tiveres nº real de projetos entregues e avaliações reais, repõe.)*
- ✅ Glossário PT-PT: `hospedamos`→`alojamos`; palavra proibida **"soluções/solutions"** removida dos 3 footers e das descrições de pré-launch.
- ✅ Blog fictício oculto (`page.tsx`, `blogReady = false`) até haver artigos reais.
- ✅ `tsc` limpo, sem chaves i18n órfãs.

**Ainda por decidir (bloqueiam P1):** preço final (€ dos pacotes) e prazo real de entrega — assim que fecharem, entra a secção **Pacotes + preços** e o **prazo-âncora** no herói.

## Changelog
- v1 (2026-07-23) — Diagnóstico inicial (site atual vs. specs 04), 8 pontos de melhoria, arquitetura trilingue e roadmap P0–P2.
- v1.1 (2026-07-23) — P0 executado (opção B, geografia neutra, sem preço). Restrições novas: mudança para Figueira da Foz (~set/2026), preço em revalidação.
