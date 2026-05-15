# About Page — Design Spec

**Data:** 2026-05-14  
**Referência Figma:** `nphWq5KdcLEEDvwGeMyO89`, node `2036:142`  
**Rota:** `/[locale]/about`

---

## Visão Geral

Página About composta por seções independentes, cada uma como um componente isolado. O layout global (Navbar + Footer) já existe em `src/app/[locale]/layout.tsx` — nenhum layout novo será criado. Todo conteúdo de texto é **hardcoded** diretamente nos componentes — sem `next-intl`, sem chamadas a API, sem props de dados vindos de fora. Todos os componentes são `"use client"`.

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
      ProsperumAdvantage.tsx
      PartnersSection.tsx
      PartnerCard.tsx
```

Nenhum arquivo fora da pasta `about/` é alterado (exceto `page.tsx` da rota).

---

## Seção 1 — Hero (`AboutHero`)

**Arquivo:** `src/components/about/AboutHero.tsx`

**Design (Figma node `2057:310`):**
- Altura: `625px`, `position: relative`, `overflow: hidden`
- Background: imagem `about-bg` com máscara `about-mask` (CSS `mask-image`); por cima gradiente `bg-gradient-to-t from-[#042311] to-transparent`
- Título hardcoded: `"Transforming Real Estate Investments"` — 80px, Urbanist Medium, branco, `max-w-[892px]`, `pt-[262px] pl-[148px]`
- Nenhum navbar próprio — já injetado pelo layout

**Assets:**
- `imgAbout1` → `/public/images/about/about-mask.png`
- `imgAbout2` → `/public/images/about/about-bg.jpg`

**Implementação:**  
`"use client"`. `<Image fill>` do Next.js para a foto de fundo. Overlay de gradiente como `<div>` absoluto. Máscara CSS via `style={{ maskImage: "url(...)" }}`.

---

## Seção 2 — Pilares (`PillarsSection` + `PillarCard`)

**Arquivos:** `PillarsSection.tsx`, `PillarCard.tsx`

**Design (Figma nodes `2036:201`, `2036:202`, `2036:203`):**
- Background da seção: gradiente radial dark de `#767676` → `#101010`
- Título hardcoded: `"Our Pillars"` — 80px, branco, centralizado
- 3 cards em cascata horizontal (offset crescente à direita):

| # | Título | Cor de fundo | Ícone | Offset esquerdo |
|---|--------|-------------|-------|-----------------|
| 1 | Mission | `#0b9a4d` (80% op.) | `pillar-mission.png` | `143px` |
| 2 | Strategy | `#4ede72` (80% op.) | `pillar-strategy.png` | `303px` |
| 3 | Principles | `#9fffb7` (80% op.) | `pillar-principles.png` | `505px` |

- Cada card: `rounded-[30px]`, `h-[241px]`, largura ~`1357px`
- Ícone à esquerda, título 40px branco, descrição 24px `#efefef`
- `PillarCard` recebe props: `title`, `description`, `iconSrc`, `bgColor`, `offsetLeft` — todos os valores hardcoded em `PillarsSection`

**Assets:**
- `imgMissao1` → `/public/images/about/pillar-mission.png`
- `imgEstrategia1` → `/public/images/about/pillar-strategy.png`
- `imgJustica1` → `/public/images/about/pillar-principles.png`

**Implementação:**  
`"use client"`. `PillarCard` é componente simples com `"use client"`. Nenhuma prop opcional — tudo tipado com `type PillarCardProps`.

---

## Seção 3 — Por Que Investir (`WhyInvestSection` + `FilterChip` + `InvestCard`)

**Arquivos:** `WhyInvestSection.tsx`, `FilterChip.tsx`, `InvestCard.tsx`

**Design (Figma nodes `2038:208` – `2084:7`):**

### Cabeçalho (hardcoded)
- Título: `"Why Invest with Prosperum?"` — 60px, branco, centralizado
- Subtítulo: 24px, `#efefef`, centralizado, `max-w-[940px]`

### Filtros/Pills — `FilterChip`
- 3 chips hardcoded: `"Proven Results"`, `"Sustainable Growth"`, `"Secure Investments"`
- Cada chip tem um ícone (`icon-check.png`, `icon-growth.png`, `icon-shield.png`)
- **Ativo:** gradiente dourado `from-[#be9339] to-[#e4d488]`, `rounded-[50px]`
- **Inativo:** `border border-white`, sem fill
- **Hover em inativo:** aplica gradiente dourado via CSS (`hover:` classes ou `group`)
- Estado do chip ativo gerenciado com `useState` em `WhyInvestSection`
- `FilterChip` recebe: `label`, `iconSrc`, `isActive`, `onClick`

### Grid de Cards (2×2) — `InvestCard`
- Background: `bg-[rgba(217,217,217,0.2)]`, `rounded-[50px]`, `h-[324px]`, `w-[594px]`
- **Hover:** `border border-[#bd9238]` com transição suave
- 4 cards hardcoded:
  1. **Expertise and Experience** — tem linha de destaque dourada `#bd9238`: *"Be a reference by doing the right thing the right way!"*
  2. **Proven Track Record**
  3. **Commitment to Quality**
  4. **Transparent and Open Communication**
- `InvestCard` recebe: `title`, `description`, `highlight?: string`

**Assets:**
- `imgMarcaDeVerificacao1` → `/public/images/about/icon-check.png`
- `imgElevacao1` → `/public/images/about/icon-growth.png`
- `imgVerificacaoDeEscudo1` → `/public/images/about/icon-shield.png`

**Implementação:**  
`"use client"` em `WhyInvestSection` (useState). `FilterChip` e `InvestCard` também `"use client"` — recebem handlers como props.

---

## Seção 4 — Prosperum Advantage com Vídeo (`ProsperumAdvantage`)

**Arquivo:** `src/components/about/ProsperumAdvantage.tsx`

**Design (Figma node `2036:157`):**
- Background: `<video autoPlay muted loop playsInline>` em `absolute inset-0 object-cover w-full h-full`
- Overlay: `bg-black/50` por cima do vídeo
- Layout lado a lado (`flex gap-16 px-[148px] py-24`):
  - Esquerda: título hardcoded `"The Prosperum"` / `"Advantage"` — 60px, Urbanist Medium, branco
  - Direita: parágrafo hardcoded — 24px, `#efefef`, `max-w-[706px]`
- Vídeo esperado em `/public/videos/advantage.mp4` — hardcoded no `src`

**Implementação:**  
`"use client"`. Sem fallback de gradient — o `<video>` fica visível mesmo sem src (background preto).

---

## Seção 5 — Parceiros (`PartnersSection` + `PartnerCard`)

**Arquivos:** `PartnersSection.tsx`, `PartnerCard.tsx`

**Design (Figma node `2057:248`):**
- Background da seção: `bg-[#d9d9d9]`
- Título hardcoded: `"Our Partners"` — 80px, preto, centralizado
- Container do carrossel: `rounded-[50px]`, `bg-[rgba(217,217,217,0.2)]`, `w-[1009px]`, `h-[518px]`, centralizado
- Setas de navegação: ícones `arrow-next.png` e `arrow-prev.png` nos lados do container
- Lista de parceiros hardcoded em array dentro de `PartnersSection`

**`PartnerCard` (componente isolado):**
- Logo à esquerda (`~301×238px`)
- Direita: nome bold 35px preto, descrição 20px `#212121`, botão `"Visit Website"` com gradiente dourado `from-[#be9339] to-[#e4d488]`
- Props: `logoSrc`, `name`, `description`, `websiteUrl`

**Carrossel:**
- Estado `activeIndex` com `useState` em `PartnersSection`
- Seta esquerda: `activeIndex = Math.max(0, activeIndex - 1)`
- Seta direita: `activeIndex = Math.min(partners.length - 1, activeIndex + 1)`

**Assets:**
- `imgLogoforcabuilders1` → `/public/images/about/partner-forca-builders.png`
- `imgArrow4` → `/public/images/about/arrow-next.png`
- `imgArrow5` → `/public/images/about/arrow-prev.png`

**Implementação:**  
`"use client"` em `PartnersSection`. `PartnerCard` também `"use client"`. Parceiros hardcoded como array de objetos dentro do componente.

---

## Assembly — `page.tsx`

```tsx
// src/app/[locale]/about/page.tsx
import AboutHero from '@/components/about/AboutHero'
import PillarsSection from '@/components/about/PillarsSection'
import WhyInvestSection from '@/components/about/WhyInvestSection'
import ProsperumAdvantage from '@/components/about/ProsperumAdvantage'
import PartnersSection from '@/components/about/PartnersSection'

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <PillarsSection />
      <WhyInvestSection />
      <ProsperumAdvantage />
      <PartnersSection />
    </>
  )
}
```

---

## Assets — Download Completo

Todos salvos em `/public/images/about/`:

| Variável Figma | URL MCP | Arquivo local |
|---|---|---|
| `imgAbout2` | `figma.com/api/mcp/asset/b1a34e7d-...` | `about-bg.jpg` |
| `imgAbout1` | `figma.com/api/mcp/asset/969a84fa-...` | `about-mask.png` |
| `imgMissao1` | `figma.com/api/mcp/asset/92479bd4-...` | `pillar-mission.png` |
| `imgEstrategia1` | `figma.com/api/mcp/asset/8cda0f86-...` | `pillar-strategy.png` |
| `imgJustica1` | `figma.com/api/mcp/asset/caf96012-...` | `pillar-principles.png` |
| `imgMarcaDeVerificacao1` | `figma.com/api/mcp/asset/1e16a1c1-...` | `icon-check.png` |
| `imgElevacao1` | `figma.com/api/mcp/asset/afd29f55-...` | `icon-growth.png` |
| `imgVerificacaoDeEscudo1` | `figma.com/api/mcp/asset/0905c14f-...` | `icon-shield.png` |
| `imgLogoforcabuilders1` | `figma.com/api/mcp/asset/3b4cd985-...` | `partner-forca-builders.png` |
| `imgArrow4` | `figma.com/api/mcp/asset/0b366b4c-...` | `arrow-next.png` |
| `imgArrow5` | `figma.com/api/mcp/asset/8a67d03d-...` | `arrow-prev.png` |

---

## Restrições e Decisões

- **Todo conteúdo hardcoded** — sem `next-intl`, sem API, sem props externas de dados
- **Todos `"use client"`** — sem Server Components nesta página
- **Sem novo layout** — `about/page.tsx` herda o `[locale]/layout.tsx` existente
- **Sem novas dependências** — carrossel com `useState` nativo
- **Vídeo em `/public/videos/advantage.mp4`** — src hardcoded no componente
- **Sem refactor de código existente** — zero alteração em arquivos fora de `about/`
