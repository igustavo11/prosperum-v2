# Portfolio Mobile Responsive Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add mobile responsive styles to all 7 portfolio components using `md:` breakpoint (768px), keeping desktop pixel-perfect.

**Architecture:** Mobile-first approach — base Tailwind classes define mobile styles, `md:` prefix restores existing desktop values. No new dependencies, no logic changes.

**Tech Stack:** Next.js, Tailwind CSS, lucide-react, swiper

---

### Task 1: PortfolioHero — Mobile Responsive

**Files:**
- Modify: `src/components/portfolio/PortfolioHero.tsx`

- [ ] **Step 1: Update PortfolioHero with mobile breakpoints**

Replace the entire return block with:

```tsx
return (
  <section
    className="relative overflow-hidden min-h-[300px] md:min-h-[800px]"
  >
    <Image
      src="/images/portfolio/hero.jpg"
      alt=""
      fill
      sizes="100vw"
      priority
      className="object-cover object-center"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.25)] to-[rgba(0,0,0,0.79)]" />
    <div className="relative z-10 px-6 pt-[180px] md:px-[148px] md:pt-[287px] flex justify-center md:justify-start">
      <h1 className="font-['Urbanist'] font-medium text-[48px] md:text-[130px] text-white leading-none">
        {t("title")}
      </h1>
    </div>
  </section>
);
```

Changes:
- `minHeight: "800px"` → `min-h-[300px] md:min-h-[800px]`
- `px-[148px] pt-[287px]` → `px-6 pt-[180px] md:px-[148px] md:pt-[287px]`
- Title `text-[130px]` → `text-[48px] md:text-[130px]`
- Added `flex justify-center md:justify-start` for centered title on mobile

---

### Task 2: PortfolioGrid — Mobile Responsive

**Files:**
- Modify: `src/components/portfolio/PortfolioGrid.tsx`

- [ ] **Step 1: Update PortfolioGrid with mobile breakpoints**

Replace the entire return block with:

```tsx
return (
  <section className="bg-[#f2f2f0] rounded-t-[20px] md:rounded-t-[40px] px-6 md:px-[83px] py-8 md:py-[167px] -mt-[60px] md:-mt-[257px] relative z-10">
    <div className="flex flex-col gap-8 md:grid md:grid-cols-3 md:gap-x-[37px] md:gap-y-[65px]">
      {properties.map((property) => (
        <PortfolioCard
          key={property.id}
          id={property.id}
          title={property.title}
          location={property.location}
          images={property.images}
        />
      ))}
    </div>
  </section>
);
```

Changes:
- Grid → `flex flex-col gap-8 md:grid md:grid-cols-3 md:gap-x-[37px] md:gap-y-[65px]`
- Padding: `px-6 md:px-[83px] py-8 md:py-[167px]`
- Overlap: `-mt-[60px] md:-mt-[257px]`
- Border radius: `rounded-t-[20px] md:rounded-t-[40px]`

---

### Task 3: PortfolioCard — Mobile Responsive

**Files:**
- Modify: `src/components/portfolio/PortfolioCard.tsx`

- [ ] **Step 1: Update PortfolioCard with mobile breakpoints**

Replace the entire return block with:

```tsx
return (
  <div className="flex flex-col gap-3 md:gap-4">
    <Link
      href={`/portfolio/${id}`}
      className="block relative w-full aspect-[4/3] overflow-hidden rounded-none md:rounded-sm"
    >
      <Image
        src={images[0]}
        alt={title}
        fill
        className="object-cover hover:scale-105 transition-transform duration-300"
      />
    </Link>

    <p className="font-['Urbanist'] font-semibold text-[24px] md:text-[40px] text-[#0c7e41] leading-tight">
      {title}
    </p>

    <div className="flex items-center gap-2">
      <MapPin size={16} className="text-[#101010] flex-shrink-0 md:hidden" />
      <MapPin size={20} className="text-[#101010] flex-shrink-0 hidden md:block" />
      <p className="font-['Urbanist'] font-medium text-[14px] md:text-[20px] text-[#101010]">
        {location}
      </p>
    </div>

    <Link
      href={`/portfolio/${id}`}
      className="inline-flex items-center gap-3 border border-[#212121] rounded-[50px] h-[40px] md:h-[48px] px-4 md:px-6 w-fit font-['Urbanist'] font-medium text-[14px] md:text-[20px] text-[#212121] hover:bg-[#21212110] transition-colors"
    >
      {t("viewProject")}
      <ArrowRight size={14} className="md:hidden" />
      <ArrowRight size={16} className="hidden md:block" />
    </Link>
  </div>
);
```

Changes:
- Image: `rounded-none md:rounded-sm`
- Title: `text-[24px] md:text-[40px]`
- Location: `text-[14px] md:text-[20px]`, icon `size={16}` mobile / `size={20}` desktop
- Button: `h-[40px] md:h-[48px] px-4 md:px-6 text-[14px] md:text-[20px]`
- Arrow icon: `size={14}` mobile / `size={16}` desktop
- Gap: `gap-3 md:gap-4`

---

### Task 4: Property Detail Page — Mobile Layout

**Files:**
- Modify: `src/app/[locale]/portfolio/[id]/page.tsx`

- [ ] **Step 1: Update property detail page with mobile layout**

Replace the entire return block with:

```tsx
return (
  <div className="min-h-screen bg-[#d9d9d9]">
    <div className="max-w-[1440px] mx-auto px-4 md:px-[86px] pt-4 md:pt-[190px] pb-8 md:pb-[80px]">
      {/* Desktop: Back button above image. Mobile: hidden above, shown below card */}
      <div className="mb-6 hidden md:block">
        <PropertyBackButton />
      </div>

      {/* Image container */}
      <div className="relative">
        <PropertyImageSwiper
          images={property.images}
          title={property.title}
        />

        {/* Card: overlaps bottom of image */}
        <div className="relative -mt-[40px] md:-mt-[120px] flex justify-center">
          <div className="w-full max-w-full md:max-w-[938px]">
            <PropertyInfoCard property={property} />
          </div>
        </div>
      </div>

      {/* Mobile: Back button below card */}
      <div className="mt-6 md:hidden">
        <PropertyBackButton />
      </div>
    </div>
  </div>
);
```

Changes:
- Container padding: `px-4 md:px-[86px] pt-4 md:pt-[190px] pb-8 md:pb-[80px]`
- Back button above image: `hidden md:block`
- Card overlap: `-mt-[40px] md:-mt-[120px]`
- Card max-width: `max-w-full md:max-w-[938px]`
- Back button below card: new `div` with `md:hidden`

---

### Task 5: PropertyInfoCard — Mobile Responsive

**Files:**
- Modify: `src/components/portfolio/property/PropertyInfoCard.tsx`

- [ ] **Step 1: Update PropertyInfoCard with mobile breakpoints**

Replace the entire return block with:

```tsx
return (
  <div className="bg-[#0e8944] rounded-b-[40px] md:rounded-b-[60px] px-6 md:px-[80px] pt-[80px] md:pt-[140px] pb-8 md:pb-[60px] flex flex-col gap-6">
    {/* Title row */}
    <div className="flex flex-col md:flex-row items-start justify-between gap-4 md:gap-6">
      <h1 className="font-['Urbanist'] font-semibold text-[32px] md:text-[64px] text-white leading-tight">
        {property.title}
      </h1>
      <a
        href={property.googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0 inline-flex items-center gap-2 bg-[#efefef] rounded-[50px] h-[36px] md:h-[56px] px-4 md:px-6 shadow font-['Urbanist'] font-medium text-[14px] md:text-[24px] text-[#0e8944] hover:bg-white transition-colors"
      >
        <MapPin size={16} className="text-[#0e8944] md:hidden" />
        <MapPin size={26} className="text-[#0e8944] hidden md:block" />
        {property.location}
      </a>
    </div>

    {/* Description */}
    <p className="font-['Urbanist'] font-medium text-[14px] md:text-[20px] text-[#efefef] leading-relaxed whitespace-pre-line">
      {description}
    </p>

    {/* Highlights */}
    <div className="flex flex-col gap-2">
      <p className="font-['Urbanist'] font-medium text-[14px] md:text-[20px] text-white">
        {t("highlights")}
      </p>
      <ul className="flex flex-col gap-1">
        {highlights.map((item) => (
          <li
            key={item}
            className="font-['Urbanist'] font-medium text-[14px] md:text-[20px] text-[#efefef]"
          >
            ◆{item}
          </li>
        ))}
      </ul>
    </div>
  </div>
);
```

Changes:
- Card radius: `rounded-b-[40px] md:rounded-b-[60px]`
- Card padding: `px-6 md:px-[80px] pt-[80px] md:pt-[140px] pb-8 md:pb-[60px]`
- Title row: `flex-col md:flex-row gap-4 md:gap-6`
- Title: `text-[32px] md:text-[64px]`
- Address pill: `h-[36px] md:h-[56px] px-4 md:px-6 text-[14px] md:text-[24px]`
- Address icon: `size={16}` mobile / `size={26}` desktop
- Description: `text-[14px] md:text-[20px]`
- Highlights label: `text-[14px] md:text-[20px]`
- Highlights items: `text-[14px] md:text-[20px]`

---

### Task 6: PropertyBackButton — Mobile Responsive

**Files:**
- Modify: `src/components/portfolio/property/PropertyBackButton.tsx`

- [ ] **Step 1: Update PropertyBackButton with mobile breakpoints**

Replace the entire return block with:

```tsx
return (
  <Link
    href="/portfolio"
    className="inline-flex items-center gap-3 bg-[#0e8944] rounded-[50px] h-[44px] md:h-[45px] px-4 md:px-6 w-full md:w-fit justify-center md:justify-start font-['Urbanist'] font-medium text-[16px] md:text-[20px] text-white hover:bg-[#0a6e37] transition-colors"
  >
    <ArrowLeft size={16} className="md:hidden" />
    <ArrowLeft size={17} className="hidden md:block" />
    {t("backToPortfolio")}
  </Link>
);
```

Changes:
- Width: `w-full md:w-fit`
- Justify: `justify-center md:justify-start`
- Height: `h-[44px] md:h-[45px]`
- Padding: `px-4 md:px-6`
- Font: `text-[16px] md:text-[20px]`
- Icon: `size={16}` mobile / `size={17}` desktop

---

### Task 7: Disclaimer — Mobile Responsive

**Files:**
- Modify: `src/components/portfolio/Disclaimer.tsx`

- [ ] **Step 1: Update Disclaimer with mobile breakpoints**

Replace the entire return block with:

```tsx
return (
  <section className="bg-[#101010] relative z-20 pt-16 md:pt-[100px] pb-12 md:pb-[120px] px-6 md:px-[168px]">
    <div className="absolute -top-[40px] md:-top-[101px] left-1/2 -translate-x-1/2 w-[80px] h-[80px] md:w-[203px] md:h-[203px]">
      <Image
        src="/images/eclipes.svg"
        alt=""
        fill
        className="object-contain"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[50px] h-[50px] md:w-[130px] md:h-[128px]">
          <Image
            src="/images/emblem-logo.png"
            alt="Prosperium"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>

    <h2 className="font-['Urbanist'] font-medium text-[28px] md:text-[60px] text-[#efefef] leading-tight max-w-[800px] whitespace-pre-line">
      {t("title")}
    </h2>

    <p className="font-['Urbanist'] font-medium text-[14px] md:text-[24px] text-[#efefef] max-w-[613px] mt-8">
      {t("subtitle")}
    </p>

    <button
      type="button"
      className="mt-12 inline-flex items-center gap-3 bg-gradient-to-r from-[#be9339] to-[#e4d488] rounded-[50px] h-[44px] md:h-[62px] px-6 md:px-8 font-['Urbanist'] font-medium text-[16px] md:text-[24px] text-black"
    >
      {t("cta")}
      <ArrowRight size={16} className="md:hidden" />
      <ArrowRight size={20} className="hidden md:block" />
    </button>
  </section>
);
```

Changes:
- Padding: `pt-16 md:pt-[100px] pb-12 md:pb-[120px] px-6 md:px-[168px]`
- Eclipse: `w-[80px] h-[80px] md:w-[203px] md:h-[203px]`, `-top-[40px] md:-top-[101px]`
- Logo: `w-[50px] h-[50px] md:w-[130px] md:h-[128px]`
- Title: `text-[28px] md:text-[60px]`
- Subtitle: `text-[14px] md:text-[24px]`
- CTA: `h-[44px] md:h-[62px] px-6 md:px-8 text-[16px] md:text-[24px]`
- CTA icon: `size={16}` mobile / `size={20}` desktop

---

### Task 8: Verify Build

- [ ] **Step 1: Run build to verify no errors**

Run: `npm run build`
Expected: Build succeeds with no errors
