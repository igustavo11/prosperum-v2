# About Page Fixes — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Corrigir 4 problemas visuais na página `/about` para que corresponda ao design do Figma (node `2036:142`).

**Architecture:** Cada task é um fix isolado em seu próprio componente. Sem mudanças em rotas, layout, i18n ou outros componentes. A ordem é da mudança mais simples para a mais complexa. Sem testes automatizados (projeto não tem setup de testes).

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, next-intl, Swiper (a instalar na Task 4)

---

## File Map

| Arquivo | O que muda |
|---|---|
| `src/components/about/ProsperumAdvantage.tsx` | Corrigir `src` do `<video>` |
| `src/components/about/AboutHero.tsx` | Remover CSS mask, usar image fill simples |
| `src/components/about/FilterChip.tsx` | Remover props `isActive`/`onClickAction`, hover-only |
| `src/components/about/WhyInvestSection.tsx` | Remover `useState` de chips |
| `src/components/about/PartnersSection.tsx` | Reescrever com Swiper |
| `package.json` | Adicionar `swiper` |

---

## Task 1: Corrigir vídeo de fundo em ProsperumAdvantage

**Files:**
- Modify: `src/components/about/ProsperumAdvantage.tsx`

- [ ] **Step 1: Abrir o componente e localizar o `<video>`**

Em `src/components/about/ProsperumAdvantage.tsx`, linha 17, o `src` está errado:

```tsx
src="/videos/advantage.mp4"
```

O arquivo real está em `/public/images/about/green gradiente.mp4` (8 MB). O diretório `/public/videos/` não existe.

- [ ] **Step 2: Corrigir o atributo `src`**

Substituir o `src` com o caminho correto, encodando o espaço:

```tsx
// antes
src="/videos/advantage.mp4"

// depois
src="/images/about/green%20gradiente.mp4"
```

O componente completo atualizado:

```tsx
"use client";

import { useTranslations } from "next-intl";

export default function ProsperumAdvantage() {
  const t = useTranslations("about.advantage");

  return (
    <section className="relative overflow-hidden" style={{ minHeight: "474px" }}>
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/images/about/green%20gradiente.mp4"
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-[148px] py-24 flex items-start gap-16">
        <div className="flex-shrink-0">
          <h2 className="text-[60px] font-medium text-white leading-tight">
            {t("title_line1")}
            <br />
            {t("title_line2")}
          </h2>
        </div>

        <p className="text-[24px] font-medium text-[#efefef] max-w-[706px] mt-2">
          {t("description")}
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verificar visualmente**

Rodar `npm run dev` e navegar para `/about`. A seção "The Prosperum Advantage" deve exibir o vídeo com gradiente verde em loop no fundo.

- [ ] **Step 4: Commit**

```bash
git add src/components/about/ProsperumAdvantage.tsx
git commit -m "fix: correct video src path in ProsperumAdvantage"
```

---

## Task 2: Corrigir hero image em AboutHero

**Files:**
- Modify: `src/components/about/AboutHero.tsx`

**Contexto:** `about-mask.png` é um SVG renomeado como `.png`. CSS `mask-image` não processa SVG com extensão `.png`, então a imagem `abou.png` fica completamente oculta. A seção já tem `overflow-hidden`, então não é necessário nenhum mask — basta posicionar a imagem como `fill` + gradient overlay.

- [ ] **Step 1: Reescrever o componente sem o CSS mask**

Substituir o conteúdo de `src/components/about/AboutHero.tsx` por:

```tsx
"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function AboutHero() {
  const t = useTranslations("about.hero");

  return (
    <section className="relative overflow-hidden" style={{ minHeight: "625px" }}>
      {/* Photo */}
      <Image
        src="/images/about/abou.png"
        alt=""
        fill
        priority
        className="object-cover"
      />

      {/* Dark green gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#042311] to-transparent" />

      {/* Content */}
      <div className="relative z-10 px-[148px] pt-[262px] pb-24">
        <h1 className="text-[80px] font-medium text-white leading-tight max-w-[892px]">
          {t("title_line1")}
          <br />
          {t("title_line2")}
        </h1>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar visualmente**

No browser em `/about`: a foto `abou.png` deve preencher o topo da página com o gradient verde escuro emergindo da base e o texto branco "Transforming / Real Estate Investments" posicionado na parte inferior esquerda.

- [ ] **Step 3: Commit**

```bash
git add src/components/about/AboutHero.tsx
git commit -m "fix: remove broken css mask from AboutHero, use image fill directly"
```

---

## Task 3: Corrigir FilterChip — dourado apenas no hover

**Files:**
- Modify: `src/components/about/FilterChip.tsx`
- Modify: `src/components/about/WhyInvestSection.tsx`

**Contexto:** `WhyInvestSection` tem `useState(0)` que mantém "Proven Results" sempre com fundo dourado. Os chips não controlam nenhum conteúdo (os 4 cards são sempre exibidos), então o estado é desnecessário. O efeito dourado deve ser apenas hover CSS.

- [ ] **Step 1: Simplificar `FilterChip` — remover props de estado**

Substituir o conteúdo de `src/components/about/FilterChip.tsx` por:

```tsx
"use client";

import Image from "next/image";

type FilterChipProps = {
  label: string;
  iconSrc: string;
};

export default function FilterChip({ label, iconSrc }: FilterChipProps) {
  return (
    <div
      className="
        flex items-center gap-3 px-6 py-4 rounded-[50px] transition-all duration-200
        border border-white bg-transparent
        hover:bg-gradient-to-r hover:from-[#be9339] hover:to-[#e4d488] hover:border-transparent
        cursor-default
      "
    >
      <div className="relative w-8 h-8 flex-shrink-0">
        <Image src={iconSrc} alt="" fill className="object-contain" />
      </div>
      <span className="text-[24px] font-medium text-white whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}
```

- [ ] **Step 2: Atualizar `WhyInvestSection` — remover useState e props de chip**

Substituir o conteúdo de `src/components/about/WhyInvestSection.tsx` por:

```tsx
"use client";

import { useTranslations } from "next-intl";
import FilterChip from "./FilterChip";
import InvestCard from "./InvestCard";

export default function WhyInvestSection() {
  const t = useTranslations("about.why_invest");

  const chips = [
    {
      label: t("chip_proven_results"),
      iconSrc: "/images/about/icon-check.png",
    },
    {
      label: t("chip_sustainable_growth"),
      iconSrc: "/images/about/icon-growth.png",
    },
    {
      label: t("chip_secure_investments"),
      iconSrc: "/images/about/icon-shield.png",
    },
  ];

  const cards = [
    {
      title: t("expertise_title"),
      highlight: t("expertise_highlight"),
      description: t("expertise_description"),
    },
    {
      title: t("track_record_title"),
      description: t("track_record_description"),
    },
    {
      title: t("quality_title"),
      description: t("quality_description"),
    },
    {
      title: t("communication_title"),
      description: t("communication_description"),
    },
  ];

  return (
    <section className="py-24 px-[148px]">
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-[60px] font-medium text-white text-center mb-6">
          {t("title")}
        </h2>
        <p className="text-[24px] font-medium text-[#efefef] text-center max-w-[940px]">
          {t("subtitle")}
        </p>
      </div>

      <div className="flex items-center justify-center gap-6 mb-16">
        {chips.map((chip) => (
          <FilterChip
            key={chip.label}
            label={chip.label}
            iconSrc={chip.iconSrc}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-8 max-w-[1200px] mx-auto">
        {cards.map((card) => (
          <InvestCard
            key={card.title}
            title={card.title}
            description={card.description}
            highlight={card.highlight}
          />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verificar visualmente**

Em `/about` na seção "Why Invest with Prosperum?":
- Os 3 chips devem aparecer com borda branca e fundo transparente por padrão
- Ao passar o mouse em qualquer chip, deve aparecer o fundo dourado
- Ao sair do hover, volta ao estado sem dourado

- [ ] **Step 4: Commit**

```bash
git add src/components/about/FilterChip.tsx src/components/about/WhyInvestSection.tsx
git commit -m "fix: make filter chips hover-only, remove persistent active state"
```

---

## Task 4: Implementar Swiper na PartnersSection

**Files:**
- Modify: `package.json` (via npm install)
- Modify: `src/components/about/PartnersSection.tsx`

**Contexto:** A implementação atual usa `useState` com troca instantânea de card sem animação e sem auto-play. Com apenas 1 parceiro, os botões ficam sempre desabilitados. Swiper resolve com loop infinito, autoplay de 4s e transição suave.

- [ ] **Step 1: Instalar Swiper**

```bash
npm install swiper
```

Confirmar que `package.json` agora lista `"swiper"` em `dependencies`.

- [ ] **Step 2: Reescrever `PartnersSection` com Swiper**

Substituir o conteúdo de `src/components/about/PartnersSection.tsx` por:

```tsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { SwiperRef } from "swiper/react";
import "swiper/css";
import PartnerCard from "./PartnerCard";

type Partner = {
  logoSrc: string;
  name: string;
  description: string;
  websiteUrl: string;
};

export default function PartnersSection() {
  const t = useTranslations("about.partners");
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperRef>(null);

  const partners: Partner[] = [
    {
      logoSrc: "/images/about/partner-forca-builders.png",
      name: t("forca_builders_name"),
      description: t("forca_builders_description"),
      websiteUrl: "#",
    },
  ];

  const visitLabel = t("visit_website");

  return (
    <section className="bg-[#d9d9d9] py-24">
      <h2 className="text-[80px] font-medium text-black text-center mb-12">
        {t("title")}
      </h2>

      <div className="relative flex items-center justify-center gap-6 px-[148px]">
        {/* Prev arrow */}
        <button
          ref={prevRef}
          className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
          aria-label={t("prev")}
        >
          <div className="relative w-[37px] h-[37px]">
            <Image
              src="/images/about/arrow-prev.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>
        </button>

        {/* Swiper */}
        <div className="w-[1009px]">
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Autoplay]}
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            onSwiper={(swiper) => {
              // bind refs after mount so navigation works
              // @ts-expect-error swiper internal navigation typing
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-expect-error swiper internal navigation typing
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            className="rounded-[50px] overflow-hidden bg-[rgba(217,217,217,0.2)] h-[518px]"
          >
            {partners.map((partner) => (
              <SwiperSlide key={partner.name}>
                <PartnerCard {...partner} visitLabel={visitLabel} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Next arrow */}
        <button
          ref={nextRef}
          className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
          aria-label={t("next")}
        >
          <div className="relative w-[37px] h-[37px]">
            <Image
              src="/images/about/arrow-next.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>
        </button>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verificar build (TypeScript)**

```bash
npm run build
```

Esperado: build sem erros de TypeScript. Se houver erros de tipos do Swiper, instalar types:

```bash
npm install --save-dev @types/swiper 2>/dev/null || echo "types built-in"
```

(Swiper v9+ inclui tipos nativamente, não precisa de `@types/swiper`.)

- [ ] **Step 4: Verificar visualmente**

Rodar `npm run dev` e navegar para `/about`:
- A seção "Our Partnes" deve exibir o card de Força Builders
- As setas prev/next devem funcionar ao clicar (mesmo com 1 card, por causa do `loop={true}`)
- O card deve transicionar automaticamente a cada 4 segundos com animação de slide

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json src/components/about/PartnersSection.tsx
git commit -m "feat: implement Swiper carousel with autoplay in PartnersSection"
```
