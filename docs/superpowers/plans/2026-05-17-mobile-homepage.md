# Mobile Support — Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add responsive mobile layout (< lg breakpoint, 390px target) to all 5 homepage components without breaking the existing desktop layout.

**Architecture:** Mobile-first Tailwind classes replace fixed-pixel inline styles where possible. `ServicesSection` renders a Swiper carousel on mobile (Swiper already installed) and the existing multi-card list on desktop (hidden/visible via `lg:hidden` / `hidden lg:block`). Each component is updated independently and committed separately.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Swiper v12, next-intl

---

### Task 1: `Hero.tsx` — mobile layout

**Files:**
- Modify: `src/components/home/Hero.tsx`

**What changes:**
- Mobile: building photo renders in a block `<div>` at the top (not absolute). Desktop absolute positioning stays via `hidden lg:block`.
- Padding: `px-6 pt-10 pb-16` on mobile → `lg:px-[148px] lg:pt-[307px] lg:pb-0`
- Title: `text-[40px]` mobile → `lg:text-[60px]`
- Button: green gradient on mobile (Figma), gray on desktop. Use `lg:bg-none` to clear the gradient at lg+.
- Remove fixed `minHeight: "1059px"` on mobile; apply only on `lg:min-h-[1059px]`.

- [ ] **Step 1: Replace `src/components/home/Hero.tsx`**

```tsx
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#d9d9d9] lg:min-h-[1059px]"
    >
      {/* Full-width background at 10% opacity */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-10"
          priority
        />
      </div>

      {/* Mobile: building image as block element at top */}
      <div className="relative w-full h-[260px] z-10 lg:hidden">
        <Image
          src="/images/hero-building.png"
          alt="Modern apartment building"
          fill
          sizes="100vw"
          className="object-cover object-left-top"
          priority
        />
      </div>

      {/* Desktop: building image — positioned at 41.6% from left, bleeds right */}
      <div
        className="absolute hidden lg:block z-0"
        style={{
          left: "41.6%",
          top: "138px",
          width: "1112px",
          height: "878px",
        }}
      >
        <Image
          src="/images/hero-building.png"
          alt="Modern apartment building"
          fill
          sizes="(max-width: 1024px) 0px, 50vw"
          className="object-cover object-left-top"
          priority
        />
      </div>

      {/* Text content */}
      <div className="relative z-10 px-6 pt-10 pb-16 lg:px-[148px] lg:pt-[307px] lg:pb-0">
        <h1 className="text-[40px] lg:text-[60px] font-medium leading-tight text-[#212121] max-w-[487px]">
          {t("heading_1")}{" "}
          <span className="font-bold text-[#0e8944]">
            {t("heading_highlight")}
          </span>
          <br />
          <span className="font-bold text-[#0e8944]">{t("heading_2")}</span>
        </h1>

        <p className="text-[20px] font-medium text-[#212121] mt-3">
          {t("subtitle_1")}
          <br />
          {t("subtitle_2")}
        </p>

        <a
          href="#services"
          className="inline-flex items-center justify-center w-[171px] h-[62px] rounded-[50px] text-2xl font-medium shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:opacity-90 transition-opacity mt-6 bg-gradient-to-r from-[#0c7e41] to-[#16e476] text-white lg:bg-none lg:bg-[#efefef] lg:text-[#0e8944] lg:hover:bg-[#e0e0e0]"
        >
          {t("cta")}
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build**

```bash
cd /home/gustavo/www/prosprerumv2/prosprerum && npm run build
```
Expected: exits 0, no TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/home/Hero.tsx
git commit -m "feat: add mobile layout to Hero section"
```

---

### Task 2: `PremiumExperience.tsx` — mobile stacked layout

**Files:**
- Modify: `src/components/home/PremiumExperience.tsx`

**What changes:**
- Layout: `flex-col gap-8` on mobile → `lg:flex-row lg:items-start lg:gap-16`
- Padding: `px-6 py-16` on mobile → `lg:px-[148px] lg:py-24`
- Title: `text-[40px]` mobile → `lg:text-[55px]`
- Description: `text-xl` mobile → `lg:text-2xl`

- [ ] **Step 1: Update the text content `<div>` inside `PremiumExperience.tsx`**

Find this line:
```tsx
<div className="relative z-10 max-w-[1440px] mx-auto px-[148px] py-24 flex items-start gap-16">
```

Replace with:
```tsx
<div className="relative z-10 max-w-[1440px] mx-auto px-6 py-16 flex flex-col gap-8 lg:px-[148px] lg:py-24 lg:flex-row lg:items-start lg:gap-16">
```

Find this line:
```tsx
<h2 className="text-[55px] font-medium text-[#efefef] leading-tight">
```

Replace with:
```tsx
<h2 className="text-[40px] lg:text-[55px] font-medium text-[#efefef] leading-tight">
```

Find this line:
```tsx
<p className="text-2xl font-medium text-[#efefef] max-w-[706px] mt-2">
```

Replace with:
```tsx
<p className="text-xl lg:text-2xl font-medium text-[#efefef] lg:max-w-[706px] lg:mt-2">
```

- [ ] **Step 2: Build**

```bash
cd /home/gustavo/www/prosprerumv2/prosprerum && npm run build
```
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/home/PremiumExperience.tsx
git commit -m "feat: add mobile stacked layout to PremiumExperience"
```

---

### Task 3: `ServiceCard.tsx` — mobile stacked layout

**Files:**
- Modify: `src/components/home/ServiceCard.tsx`

**What changes:**
- Remove inline `style` with `gridTemplateColumns`, `paddingLeft`, `paddingRight` — replace with Tailwind v4 arbitrary properties.
- Mobile: `flex flex-col px-6 py-8`
- Desktop: `lg:grid lg:[grid-template-columns:381px_1fr] lg:py-12 lg:[padding-left:105px] lg:[padding-right:95px]`
- Title: `text-[40px] mb-4 lg:text-[55px] lg:mb-0`
- Body text: `text-base lg:text-2xl`
- Divider: full-width on mobile `w-full`, fixed on desktop `lg:w-[1148px]`

- [ ] **Step 1: Replace `src/components/home/ServiceCard.tsx`**

```tsx
type Point = {
  title: string;
  body: string;
};

type ServiceCardProps = {
  title: string;
  intro?: string;
  points: Point[];
  isFirst?: boolean;
};

export default function ServiceCard({
  title,
  intro,
  points,
  isFirst = false,
}: ServiceCardProps) {
  return (
    <div>
      {!isFirst && (
        <div className="flex justify-center">
          <div className="w-full lg:w-[1148px] h-px bg-[#c0c0c0]" />
        </div>
      )}
      <div className="flex flex-col py-8 px-6 lg:grid lg:py-12 lg:px-0 lg:[grid-template-columns:381px_1fr] lg:[padding-left:105px] lg:[padding-right:95px]">
        {/* Title */}
        <h3 className="text-[40px] lg:text-[55px] font-medium text-[#212121] leading-[1.05] mb-4 lg:mb-0">
          {title.split(" ").map((word, i, arr) => (
            <span key={i}>
              {word}
              {i < arr.length - 1 && <br />}
            </span>
          ))}
        </h3>

        {/* Body */}
        <div className="text-base lg:text-2xl font-medium text-[#212121] space-y-4">
          {intro && <p>{intro}</p>}
          {points.map((point) => (
            <div key={point.title}>
              <p className="font-bold">{point.title}</p>
              <p>{point.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Build**

```bash
cd /home/gustavo/www/prosprerumv2/prosprerum && npm run build
```
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/home/ServiceCard.tsx
git commit -m "feat: add mobile stacked layout to ServiceCard"
```

---

### Task 4: `ServicesSection.tsx` — Swiper carousel on mobile + responsive header

**Files:**
- Modify: `src/components/home/ServicesSection.tsx`

**What changes:**
- Add `"use client"` directive (required for Swiper React hooks).
- Border radius: `rounded-[60px] lg:rounded-[150px]`
- Padding: `py-16 lg:py-24`
- Header icon: `w-16 h-16 lg:w-24 lg:h-24`
- Header title: `text-[40px] lg:text-[80px]`, subtitle: `text-base lg:text-2xl`
- Mobile: Swiper carousel with `Pagination` dots, `slidesPerView={1}`, each card in a slide. All cards pass `isFirst={true}` (no internal dividers inside carousel slides).
- Desktop: existing `hidden lg:block` list with luminosity blend background (unchanged).

- [ ] **Step 1: Replace `src/components/home/ServicesSection.tsx`**

```tsx
"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import ServiceCard from "./ServiceCard";

export default function ServicesSection() {
  const t = useTranslations("services");

  const cards = [
    {
      title: t("core_strategy.title"),
      intro: t("core_strategy.intro"),
      points: [
        { title: t("core_strategy.point_1_title"), body: t("core_strategy.point_1_body") },
        { title: t("core_strategy.point_2_title"), body: t("core_strategy.point_2_body") },
        { title: t("core_strategy.point_3_title"), body: t("core_strategy.point_3_body") },
      ],
    },
    {
      title: t("investment_options.title"),
      intro: t("investment_options.intro"),
      points: [
        { title: t("investment_options.point_1_title"), body: t("investment_options.point_1_body") },
        { title: t("investment_options.point_2_title"), body: t("investment_options.point_2_body") },
        { title: t("investment_options.point_3_title"), body: t("investment_options.point_3_body") },
      ],
    },
    {
      title: t("performance_goals.title"),
      intro: undefined,
      points: [
        { title: t("performance_goals.point_1_title"), body: t("performance_goals.point_1_body") },
        { title: t("performance_goals.point_2_title"), body: t("performance_goals.point_2_body") },
        { title: t("performance_goals.point_3_title"), body: t("performance_goals.point_3_body") },
      ],
    },
  ];

  return (
    <section
      id="services"
      className="relative overflow-hidden rounded-[60px] lg:rounded-[150px] py-16 lg:py-24"
    >
      {/* Background gradient image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bg-gradiente.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Header */}
      <div className="relative z-10 flex flex-col items-center mb-10 lg:mb-16">
        <div className="relative w-16 h-16 lg:w-24 lg:h-24">
          <Image
            src="/images/services-icon.png"
            alt=""
            fill
            sizes="96px"
            className="object-contain"
          />
        </div>
        <h2 className="text-[40px] lg:text-[80px] font-medium text-white leading-tight">
          {t("title")}
        </h2>
        <p className="text-base lg:text-2xl font-medium text-white text-center max-w-[329px]">
          {t("subtitle")}
        </p>
      </div>

      {/* Mobile: Swiper carousel */}
      <div className="relative z-10 lg:hidden pb-10">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          slidesPerView={1}
          spaceBetween={16}
        >
          {cards.map((card) => (
            <SwiperSlide key={card.title}>
              <div className="bg-[#d9d9d9]/20 rounded-[40px] mx-4 mb-8">
                <ServiceCard
                  title={card.title}
                  intro={card.intro}
                  points={card.points}
                  isFirst={true}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop: multi-card list */}
      <div className="hidden lg:block relative mx-auto" style={{ maxWidth: "1350px" }}>
        {/* Luminosity-blended gray background */}
        <div
          className="absolute inset-0 rounded-[143px] pointer-events-none"
          style={{ background: "#d9d9d9", mixBlendMode: "luminosity" }}
        />
        <div className="relative">
          {cards.map((card, i) => (
            <ServiceCard
              key={card.title}
              title={card.title}
              intro={card.intro}
              points={card.points}
              isFirst={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build**

```bash
cd /home/gustavo/www/prosprerumv2/prosprerum && npm run build
```
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/home/ServicesSection.tsx
git commit -m "feat: add Swiper mobile carousel to ServicesSection"
```

---

### Task 5: `CTASection.tsx` — responsive font sizes and spacing

**Files:**
- Modify: `src/components/home/CTASection.tsx`

**What changes:**
- Heading: `text-[40px] lg:text-[80px]`
- Subtitle: `text-base lg:text-2xl`
- Padding: `py-16 lg:py-32`
- Min-height: `476px` (Figma mobile) applied via inline style (same value as before works for both, desktop gets more via `py-32`)
- Margin below heading: `mb-6 lg:mb-8`; below subtitle: `mb-7 lg:mb-9`

- [ ] **Step 1: Replace `src/components/home/CTASection.tsx`**

```tsx
import { useTranslations } from "next-intl";

export default function CTASection() {
  const t = useTranslations("cta");

  return (
    <section
      className="relative py-16 lg:py-32 flex flex-col items-center justify-center text-center px-8"
      style={{
        background:
          "radial-gradient(ellipse at 50% 100%, #212121 0%, #111111 40%, #000000 100%)",
        minHeight: "476px",
      }}
    >
      <h2 className="text-[40px] lg:text-[80px] font-medium text-white leading-tight max-w-[604px] mb-6 lg:mb-8">
        {t("heading")}
      </h2>

      <p className="text-base lg:text-2xl font-medium text-[#efefef] max-w-[537px] mb-7 lg:mb-9">
        {t("subtitle")}
      </p>

      <a
        href="#contact"
        className="inline-flex items-center justify-center h-[62px] px-10 rounded-[50px] text-2xl font-medium text-white hover:opacity-90 transition-opacity"
        style={{
          background: "linear-gradient(to right, #be9339 19%, #e4d488 84%)",
          minWidth: "216px",
        }}
      >
        {t("button")}
      </a>
    </section>
  );
}
```

- [ ] **Step 2: Build**

```bash
cd /home/gustavo/www/prosprerumv2/prosprerum && npm run build
```
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/home/CTASection.tsx
git commit -m "feat: add mobile responsive styles to CTASection"
```
