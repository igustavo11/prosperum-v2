# About Page — Design Spec

**Data:** 2026-05-14  
**Referência Figma:** `nphWq5KdcLEEDvwGeMyO89`, node `2036:142`  
**Rota:** `/[locale]/about`

---

## Visão Geral

Página About composta por seções independentes, cada uma como um componente isolado. O layout global (Navbar + Footer) já existe em `src/app/[locale]/layout.tsx` — nenhum layout novo será criado. Todas as strings de UI passam pelo sistema `next-intl` (`namespace: "about"`).

---

## Estrutura de Arquivos

```
src/
  app/
    [locale]/
      about/
        page.tsx                  ← monta as seções em ordem
  components/
    about/
      AboutHero.tsx
      PillarsSection.tsx
      PillarCard.tsx
      WhyInvestSection.tsx
      FilterChip.tsx
      InvestCard.tsx
      ProspererumAdvantage.tsx
      PartnersSection.tsx
      PartnerCard.tsx
  messages/
    pt.json                       ← adicionar namespace "about"
    en.json                       ← adicionar namespace "about"
```

---

## Seção 1 — Hero (`AboutHero`)

**Arquivo:** `src/components/about/AboutHero.tsx`

**Design (Figma node `2057:310`):**
- Altura: `625px`
- Background: imagem `about2` com máscara `about1` (mask-image); por cima gradiente preto-para-verde-escuro (`#042311` → transparente, `bg-gradient-to-t`)
- Título: `"Transforming Real Estate Investments"` — 80px, Urbanist Medium, branco, `max-w-[892px]`, posição absoluta a `262px` do topo, `148px` da esquerda
- Nenhum navbar próprio — já injetado pelo layout

**Assets a baixar:**
- `imgAbout1` (máscara PNG)
- `imgAbout2` (foto de fundo)

**Implementação:**  
Server Component. Usa `<Image fill>` do Next.js para a foto. A máscara CSS (`mask-image`) é aplicada via `style`. Overlay de gradiente como `<div>` absoluto.

---

## Seção 2 — Pilares (`PillarsSection` + `PillarCard`)

**Arquivos:** `PillarsSection.tsx`, `PillarCard.tsx`

**Design (Figma nodes `2036:201`, `2036:202`, `2036:203`):**
- Background da seção: gradiente radial dark de `#767676` → `#101010` (rectangle `2036:200`)
- Título centralizado: `"Our Pillars"` — 80px, branco
- 3 cards em cascata horizontal (cada um deslocado ~160px à direita em relação ao anterior):

| # | Título | Cor de fundo | Ícone | Offset esquerdo |
|---|--------|-------------|-------|-----------------|
| 1 | Mission | `#0b9a4d` (80% opacidade) | `missao.png` | `143px` |
| 2 | Strategy | `#4ede72` (80% opacidade) | `estrategia.png` | `303px` |
| 3 | Principles | `#9fffb7` (80% opacidade) | `justica.png` | `505px` |

- Cada card: `rounded-[30px]`, altura `241px`, largura `~1357px`
- Ícone à esquerda (~167×141px), título (40px branco), descrição (24px `#efefef`)
- Cards são **componentes isolados** (`PillarCard`) — recebem via props: `title`, `description`, `icon`, `bgColor`, `offsetLeft`

**Implementação:**  
`PillarsSection` é Server Component. `PillarCard` é Server Component. Props tipadas com `type`. Strings via `next-intl`.

---

## Seção 3 — Por Que Investir (`WhyInvestSection` + `FilterChip` + `InvestCard`)

**Arquivos:** `WhyInvestSection.tsx`, `FilterChip.tsx`, `InvestCard.tsx`

**Design (Figma nodes `2038:208` – `2084:7`):**

### Cabeçalho
- Título: `"Why Invest with Prosperum?"` — 60px, branco, centralizado
- Subtítulo: 24px, `#efefef`, centralizado, `max-w-[940px]`

### Filtros/Pills (3 chips)
- `"Proven Results"` — estado ativo: gradiente dourado (`#be9339` → `#e4d488`), ícone de check
- `"Sustainable Growth"` — inativo: borda branca, sem fill
- `"Secure Investments"` — inativo: borda branca, sem fill
- **Hover:** ao passar o mouse em qualquer chip inativo → aplica gradiente dourado (mesma aparência do ativo)
- **Click:** chip clicado vira ativo, os outros voltam a inativo (estado gerenciado localmente no `WhyInvestSection` com `useState` — único `"use client"` desta seção)

### Grid de Cards (2×2)
- Background por card: `rgba(217,217,217,0.2)`, `rounded-[50px]`, `324px` de altura, `594px` de largura
- Conteúdo:
  1. **Expertise and Experience** — destaque dourado `#bd9238` na primeira linha ("Be a reference…")
  2. **Proven Track Record**
  3. **Commitment to Quality**
  4. **Transparent and Open Communication**
- **Hover dos cards:** borda dourada animada (`border-[#bd9238]`)
- `InvestCard` recebe: `title`, `highlight?`, `description` como props

**Implementação:**  
`WhyInvestSection` é `"use client"` (controla o chip ativo). `FilterChip` e `InvestCard` são subcomponentes do mesmo arquivo ou arquivos separados — separados conforme pedido do usuário.

---

## Seção 4 — Prosperum Advantage com Vídeo (`ProspererumAdvantage`)

**Arquivo:** `src/components/about/ProspererumAdvantage.tsx`

**Design (Figma node `2036:157`):**
- Background: gradiente verde (`#042311` → transparente) com máscara `green gradiente 1`
- **Implementação real:** substituir o background estático por um `<video autoPlay muted loop playsInline>` ocupando `inset-0` como background (igual ao padrão parallax da `PremiumExperience`, mas com vídeo)
- Por cima do vídeo: overlay dark semitransparente para legibilidade
- Layout: dois blocos lado a lado
  - Esquerda: título `"The Prosperum Advantage"` (60px, branco, Urbanist Medium)
  - Direita: parágrafo de descrição (24px, `#efefef`, `max-w-[706px]`)
- Espaçamento: `px-[148px] py-24`

**Asset de vídeo:** caminho a definir em `/public/videos/` — o usuário vai fornecer o arquivo; o componente recebe `src` como prop com default para o caminho esperado.

**Implementação:**  
`"use client"` apenas se necessário para controle do vídeo (normalmente atributos HTML nativos bastam — Server Component viável). Strings via `next-intl`.

---

## Seção 5 — Parceiros (`PartnersSection` + `PartnerCard`)

**Arquivos:** `PartnersSection.tsx`, `PartnerCard.tsx`

**Design (Figma node `2057:248`):**
- Background da seção: `#d9d9d9`
- Título: `"Our Partners"` — 80px, preto, centralizado
- Container do carrossel: `rounded-[50px]`, `rgba(217,217,217,0.2)`, `1009px` de largura, `518px` de altura, centralizado
- Navegação: setas esquerda/direita (ícones `Arrow4`, `Arrow5`)
- **`PartnerCard`** (componente isolado, gerenciável individualmente):
  - Logo à esquerda (ex: `logoforcabuilders.png`, ~301×238px)
  - Direita: nome do parceiro (35px bold, preto), descrição (20px, `#212121`), botão `"Visit Website"` com gradiente dourado

**Carrossel:**  
`PartnersSection` é `"use client"` — controla o índice ativo. `PartnerCard` é componente puro (Server ou Client simples) que recebe: `logo`, `name`, `description`, `websiteUrl`.

**Isolamento:** cada parceiro é uma instância de `PartnerCard` gerenciada individualmente — adicionar/remover um parceiro é mexer em um único arquivo/dado.

---

## i18n — Namespace `"about"`

Chaves a adicionar em `pt.json` e `en.json`:

```json
"about": {
  "hero": {
    "title_line1": "Transforming",
    "title_line2": "Real Estate Investments"
  },
  "pillars": {
    "title": "Our Pillars",
    "mission": { "title": "Mission", "description": "..." },
    "strategy": { "title": "Strategy", "description": "..." },
    "principles": { "title": "Principles", "description": "..." }
  },
  "why_invest": {
    "title": "Why Invest with Prosperum?",
    "subtitle": "...",
    "chips": {
      "proven_results": "Proven Results",
      "sustainable_growth": "Sustainable Growth",
      "secure_investments": "Secure Investments"
    },
    "cards": {
      "expertise": { "title": "Expertise and Experience", "highlight": "Be a reference by doing the right thing the right way!", "description": "..." },
      "track_record": { "title": "Proven Track Record", "description": "..." },
      "quality": { "title": "Commitment to Quality", "description": "..." },
      "communication": { "title": "Transparent and Open Communication", "description": "..." }
    }
  },
  "advantage": {
    "title_line1": "The Prosperum",
    "title_line2": "Advantage",
    "description": "..."
  },
  "partners": {
    "title": "Our Partners",
    "forca_builders": {
      "name": "Força Builders",
      "description": "...",
      "cta": "Visit Website"
    }
  }
}
```

---

## Assets

Todos os assets do Figma MCP (URLs `figma.com/api/mcp/asset/...`) devem ser baixados e salvos em `/public/images/about/`:

| Variável Figma | Arquivo local |
|---|---|
| `imgAbout1` | `about-mask.png` |
| `imgAbout2` | `about-bg.jpg` |
| `imgMissao1` | `pillar-mission.png` |
| `imgEstrategia1` | `pillar-strategy.png` |
| `imgJustica1` | `pillar-principles.png` |
| `imgMarcaDeVerificacao1` | `icon-check.png` |
| `imgElevacao1` | `icon-growth.png` |
| `imgVerificacaoDeEscudo1` | `icon-shield.png` |
| `imgLogoforcabuilders1` | `partner-forca-builders.png` |
| `imgGreenGradiente1` | (opcional — substituído por vídeo) |
| `imgArrow4` / `imgArrow5` | `arrow-next.png` / `arrow-prev.png` |

---

## Restrições e Decisões

- **Sem novo layout** — rota `about/page.tsx` usa o layout pai `[locale]/layout.tsx` existente
- **Server Components por padrão** — `"use client"` apenas onde há estado: `WhyInvestSection` (chips) e `PartnersSection` (carrossel)
- **Sem refactor de código existente** — nada fora da pasta `about/` é alterado, exceto os arquivos `messages/*.json`
- **Vídeo da seção verde** — o componente espera `/public/videos/advantage.mp4` por padrão; se o arquivo não existir, renderiza o gradient de fallback
- **Sem nova dependência** — carrossel implementado manualmente com `useState` (sem biblioteca)
