# About Page — Mobile Responsive Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add mobile-responsive styles to all 9 about-page components so they match the Figma mobile design (429px viewport) without breaking the desktop layout.

**Architecture:** Mobile-first Tailwind — every component gains a mobile default and `md:` prefix for the existing desktop values. PillarCard replaces the inline `offsetLeft` with a `desktopOffsetClass` string + `mobileAlign` prop so responsive card staggering works without JS breakpoint detection.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS v4, `cn()` from `src/lib/utils.ts`, next-intl

**Figma reference (mobile):** `https://www.figma.com/design/nphWq5KdcLEEDvwGeMyO89/Untitled?node-id=2113-182`
Mobile canvas: 429px wide. Breakpoint: `md` (768px+) = desktop.

---

## File Map

| File | Change |
|---|---|
| `src/components/about/AboutHero.tsx` | Responsive padding + font-size |
| `src/components/about/PillarCard.tsx` | Replace `offsetLeft` prop with `desktopOffsetClass` + `mobileAlign`; responsive icon/text |
| `src/components/about/PillarsSection.tsx` | Pass new PillarCard props; responsive title |
| `src/components/about/FilterChip.tsx` | Responsive font-size |
| `src/components/about/InvestCard.tsx` | Responsive height/padding/font-sizes |
| `src/components/about/WhyInvestSection.tsx` | Responsive title/subtitle/padding; chips stack vertically on mobile; grid 1-col on mobile |
| `src/components/about/ProsperumAdvantage.tsx` | Stack vertically on mobile; responsive font-sizes |
| `src/components/about/PartnersSection.tsx` | Responsive title; swiper full-width on mobile; tighter padding |
| `src/components/about/PartnerCard.tsx` | Flex-col on mobile; responsive logo/text; center-aligned text |

---

## Task 1: AboutHero — responsive padding and typography

**Files:**
- Modify: `src/components/about/AboutHero.tsx`

**Figma mobile values:**
- Padding: `px-[43px] pt-[177px]`
- Title: `text-[40px]`, no max-width constraint

- [ ] **Step 1: Edit `AboutHero.tsx`**

Replace the content div and heading:

```tsx
"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function AboutHero() {
  const t = useTranslations("about.hero");

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "625px" }}
    >
      <Image
        src="/images/about/abou.png"
        alt=""
        fill
        sizes="100vw"
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#042311] to-transparent" />

      <div className="relative z-10 px-[43px] md:px-[148px] pt-[177px] md:pt-[262px] pb-24">
        <h1 className="text-[40px] md:text-[80px] font-medium text-white leading-tight md:max-w-[892px]">
          {t("title_line1")}
          <br />
          {t("title_line2")}
        </h1>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Start dev server and verify at 429px viewport**

```bash
npm run dev
```

Open `http://localhost:3000/en/about` in browser, resize to 429px width.

Expected: Title fits, padding is ~43px from edges, no horizontal scroll.

---

## Task 2: PillarCard + PillarsSection — staggered mobile cards

**Files:**
- Modify: `src/components/about/PillarCard.tsx`
- Modify: `src/components/about/PillarsSection.tsx`

**Figma mobile values:**
- Card heights: `226px` on mobile, `241px` on desktop
- Card stagger:
  - `"left"`: `ml-[-53px] w-[calc(100%+53px)]` — clips left, extends across full viewport
  - `"right"`: `ml-[45px] w-[calc(100%-45px)]` — indented from left
- Icon: `38×38px` on mobile, `167×141px` on desktop
- Title: `text-[30px]` on mobile, `text-[40px]` on desktop
- Description: `text-[16px]` on mobile, `text-[24px]` on desktop

- [ ] **Step 1: Edit `PillarCard.tsx`**

```tsx
"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type PillarCardProps = {
  title: string;
  description: string;
  iconSrc: string;
  bgColor: string;
  desktopOffsetClass: string;
  mobileAlign: "left" | "right";
};

export default function PillarCard({
  title,
  description,
  iconSrc,
  bgColor,
  desktopOffsetClass,
  mobileAlign,
}: PillarCardProps) {
  const mobileOffsetClass =
    mobileAlign === "left"
      ? "-ml-[53px] w-[calc(100%+53px)]"
      : "ml-[45px] w-[calc(100%-45px)]";

  return (
    <div
      className={cn(
        "relative rounded-[30px] flex items-center gap-4 md:gap-8 px-6 md:px-8",
        "h-[226px] md:h-[241px]",
        mobileOffsetClass,
        desktopOffsetClass,
      )}
      style={{ backgroundColor: bgColor }}
    >
      <div className="relative flex-shrink-0 w-[38px] h-[38px] md:w-[167px] md:h-[141px]">
        <Image src={iconSrc} alt="" fill className="object-contain" />
      </div>

      <div className="flex flex-col gap-1 md:gap-2">
        <h3 className="text-[30px] md:text-[40px] font-medium text-white leading-tight">
          {title}
        </h3>
        <p className="text-[16px] md:text-[24px] font-medium text-[#efefef] md:max-w-[775px]">
          {description}
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Edit `PillarsSection.tsx`**

```tsx
"use client";

import { useTranslations } from "next-intl";
import PillarCard from "./PillarCard";

export default function PillarsSection() {
  const t = useTranslations("about.pillars");

  const pillars = [
    {
      title: t("mission_title"),
      description: t("mission_description"),
      iconSrc: "/images/about/pillar-mission.png",
      bgColor: "rgba(11, 154, 77, 0.8)",
      desktopOffsetClass: "md:ml-[143px] md:w-[calc(100%-143px)]",
      mobileAlign: "left" as const,
    },
    {
      title: t("strategy_title"),
      description: t("strategy_description"),
      iconSrc: "/images/about/pillar-strategy.png",
      bgColor: "rgba(78, 222, 114, 0.8)",
      desktopOffsetClass: "md:ml-[303px] md:w-[calc(100%-303px)]",
      mobileAlign: "right" as const,
    },
    {
      title: t("principles_title"),
      description: t("principles_description"),
      iconSrc: "/images/about/pillar-principles.png",
      bgColor: "rgba(159, 255, 183, 0.8)",
      desktopOffsetClass: "md:ml-[505px] md:w-[calc(100%-505px)]",
      mobileAlign: "left" as const,
    },
  ];

  return (
    <section
      className="relative overflow-hidden py-16 md:py-24"
      style={{
        background:
          "radial-gradient(ellipse at 50% 100%, #767676 0%, #5d5d5d 25%, #434343 50%, #2a2a2a 75%, #1d1d1d 87.5%, #101010 100%)",
      }}
    >
      <h2 className="text-[40px] md:text-[80px] font-medium text-white text-center mb-8 md:mb-16">
        {t("title")}
      </h2>

      <div className="flex flex-col gap-8">
        {pillars.map((pillar) => (
          <PillarCard key={pillar.title} {...pillar} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify at 429px viewport**

Open `http://localhost:3000/en/about`, resize to 429px.

Expected:
- Card 1 (Mission): rounded corner slightly clipped on the left, card fills right portion of screen
- Card 2 (Strategy): card indented ~45px from left, right edge clipped
- Card 3 (Principles): same as Card 1
- Desktop (1280px): cards stagger left-to-right at 143px / 303px / 505px as before

---

## Task 3: FilterChip + InvestCard + WhyInvestSection — mobile layout

**Files:**
- Modify: `src/components/about/FilterChip.tsx`
- Modify: `src/components/about/InvestCard.tsx`
- Modify: `src/components/about/WhyInvestSection.tsx`

**Figma mobile values:**
- Title: `text-[40px]`, wraps at ~298px
- Subtitle: `text-[16px]`
- Chips: stacked vertically (`flex-col`), text `text-[18px]`
- Cards: single column, auto height

- [ ] **Step 1: Edit `FilterChip.tsx`**

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
        cursor-default select-none
      "
    >
      <div className="relative w-8 h-8 flex-shrink-0">
        <Image src={iconSrc} alt="" fill className="object-contain" />
      </div>
      <span className="text-[18px] md:text-[24px] font-medium text-white whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}
```

- [ ] **Step 2: Edit `InvestCard.tsx`**

```tsx
"use client";

type InvestCardProps = {
  title: string;
  description: string;
  highlight?: string;
};

export default function InvestCard({
  title,
  description,
  highlight,
}: InvestCardProps) {
  return (
    <div
      className="
        min-h-[200px] md:h-[324px] w-full rounded-[50px] p-8 md:p-12
        bg-[rgba(217,217,217,0.2)]
        border border-transparent
        hover:border-[#bd9238] transition-colors duration-200
        flex flex-col justify-center
      "
    >
      <h3 className="text-[24px] md:text-[35px] font-bold text-white mb-3 md:mb-4 leading-tight">
        {title}
      </h3>
      {highlight && (
        <p className="text-[14px] md:text-[20px] font-medium text-[#bd9238] mb-2 md:mb-3">
          {highlight}
        </p>
      )}
      <p className="text-[14px] md:text-[20px] font-medium text-[#efefef] leading-snug">
        {description}
      </p>
    </div>
  );
}
```

- [ ] **Step 3: Edit `WhyInvestSection.tsx`**

```tsx
"use client";

import { useTranslations } from "next-intl";
import FilterChip from "./FilterChip";
import InvestCard from "./InvestCard";

export default function WhyInvestSection() {
  const t = useTranslations("about.why_invest");
  const tAdv = useTranslations("about.advantage");

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
      title: tAdv("items.expertise.title"),
      highlight: tAdv("items.expertise.highlight"),
      description: tAdv("items.expertise.description"),
    },
    {
      title: tAdv("items.track_record.title"),
      highlight: tAdv("items.track_record.highlight"),
      description: tAdv("items.track_record.description"),
    },
    {
      title: tAdv("items.quality.title"),
      highlight: tAdv("items.quality.highlight"),
      description: tAdv("items.quality.description"),
    },
    {
      title: tAdv("items.communication.title"),
      highlight: tAdv("items.communication.highlight"),
      description: tAdv("items.communication.description"),
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="flex flex-col items-center mb-8 md:mb-12 px-6 md:px-[148px]">
        <h2 className="text-[40px] md:text-[60px] font-medium text-white text-center mb-4 md:mb-6">
          {t("title")}
        </h2>
        <p className="text-[16px] md:text-[24px] font-medium text-[#efefef] text-center md:max-w-[940px]">
          {t("subtitle")}
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-3 md:gap-6 mb-10 md:mb-16 px-6 md:px-[148px]">
        {chips.map((chip) => (
          <FilterChip
            key={chip.label}
            label={chip.label}
            iconSrc={chip.iconSrc}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-[26px] max-w-[1220px] mx-auto px-6 md:px-0">
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

- [ ] **Step 4: Verify at 429px viewport**

Open `http://localhost:3000/en/about`, resize to 429px.

Expected:
- Title wraps naturally, `text-[40px]`
- Chips stack vertically, each full-width row
- Cards stack in a single column

---

## Task 4: ProsperumAdvantage — stack vertically on mobile

**Files:**
- Modify: `src/components/about/ProsperumAdvantage.tsx`

**Figma mobile values:**
- Layout: title above, description below (flex-col)
- Padding: `px-6`
- Title: `text-[40px]`
- Description: `text-[16px]`

- [ ] **Step 1: Edit `ProsperumAdvantage.tsx`**

```tsx
"use client";

import { useTranslations } from "next-intl";

export default function ProsperumAdvantage() {
  const t = useTranslations("about.advantage");

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "474px" }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/images/about/gradiente.mp4"
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-[148px] py-16 md:py-24 flex flex-col md:flex-row items-start gap-8 md:gap-16">
        <div className="shrink-0">
          <h2 className="text-[40px] md:text-[60px] mt-4 md:mt-8 font-medium text-white leading-tight">
            {t("title_line1")}
            <br />
            {t("title_line2")}
          </h2>
        </div>

        <p className="text-[16px] md:text-[24px] font-medium text-[#efefef] md:max-w-[706px] md:mt-2">
          {t("description")}
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify at 429px viewport**

Open `http://localhost:3000/en/about`, resize to 429px.

Expected: Title stacked above description, no horizontal overflow, video plays behind.

---

## Task 5: PartnersSection + PartnerCard — full-width swiper, vertical card

**Files:**
- Modify: `src/components/about/PartnersSection.tsx`
- Modify: `src/components/about/PartnerCard.tsx`

**Figma mobile values:**
- Title: `text-[40px]`
- Card: `315px` wide (handled by making swiper full-width on mobile)
- Card layout: logo on top (centered, `189×150px`), name + description + button below (centered)

- [ ] **Step 1: Edit `PartnerCard.tsx`**

```tsx
"use client";

import Image from "next/image";

type PartnerCardProps = {
  logoSrc: string;
  name: string;
  description: string;
  websiteUrl: string;
  visitLabel: string;
};

export default function PartnerCard({
  logoSrc,
  name,
  description,
  websiteUrl,
  visitLabel,
}: PartnerCardProps) {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 h-full px-6 md:px-12 py-8 md:py-0 justify-center">
      <div className="relative flex-shrink-0 w-[189px] md:w-[301px] h-[150px] md:h-[238px]">
        <Image src={logoSrc} alt={name} fill className="object-contain" />
      </div>

      <div className="flex flex-col gap-4 items-center md:items-start">
        <h3 className="text-[20px] md:text-[35px] font-bold text-black text-center md:text-left">
          {name}
        </h3>
        <p className="text-[16px] md:text-[20px] font-medium text-[#212121] text-center md:text-left md:max-w-[534px]">
          {description}
        </p>
        <a
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-[216px] h-[62px] rounded-[50px] bg-gradient-to-r from-[#be9339] to-[#e4d488] text-[24px] font-bold text-white mt-2"
        >
          {visitLabel}
        </a>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Edit `PartnersSection.tsx`**

```tsx
"use client";

import { useTranslations } from "next-intl";
import { useRef } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
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

  const partners: Partner[] = [
    {
      logoSrc: "/images/about/partner-forca-builders.png",
      name: t("forca_builders_name"),
      description: t("forca_builders_description"),
      websiteUrl: "#",
    },
    {
      logoSrc: "/images/fernandespartens.webp",
      name: t("fernandes_equity_name"),
      description: t("fernandes_equity_description"),
      websiteUrl: "https://fernandesequity.com/",
    },
    {
      logoSrc: "/images/elasdesignslogo.webp",
      name: t("elardesigns_name"),
      description: t("elardesigns_description"),
      websiteUrl: "https://www.elardesigns.com/",
    },
  ];

  const visitLabel = t("visit_website");

  return (
    <section className="bg-[#d9d9d9] py-16 md:py-24">
      <h2 className="text-[40px] md:text-[80px] font-medium text-black text-center mb-8 md:mb-12">
        {t("title")}
      </h2>

      <div className="relative flex items-center justify-center gap-2 md:gap-6 px-4 md:px-[148px]">
        <button
          ref={prevRef}
          className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
          aria-label={t("prev")}
        >
          <svg
            width="20"
            height="37"
            viewBox="0 0 20 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 2L2 18.5L18 35"
              stroke="#be9339"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="w-full md:w-[1009px]">
          <Swiper
            modules={[Navigation, Autoplay]}
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            onSwiper={(swiper) => {
              // @ts-expect-error swiper internal navigation typing
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-expect-error swiper internal navigation typing
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            className="rounded-[50px] overflow-hidden bg-[rgba(217,217,217,0.2)] border border-black/10 md:h-[518px]"
          >
            {partners.map((partner) => (
              <SwiperSlide key={partner.name}>
                <PartnerCard {...partner} visitLabel={visitLabel} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <button
          ref={nextRef}
          className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
          aria-label={t("next")}
        >
          <svg
            width="20"
            height="37"
            viewBox="0 0 20 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 2L18 18.5L2 35"
              stroke="#be9339"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify at 429px and 1280px viewport**

Open `http://localhost:3000/en/about`, verify:
- 429px: Card stacks vertically (logo top, text below, button centered), swiper fills width, arrows visible at sides
- 1280px: Card is horizontal, swiper is 1009px wide, arrows have larger gap

---

## Final Check

- [ ] Run `npm run build` — must pass with no TypeScript errors
- [ ] Open `http://localhost:3000/en/about` at 429px — scroll through all sections, compare to Figma screenshot
- [ ] Open at 1280px — confirm desktop layout is unchanged
- [ ] No horizontal scroll at any mobile width
