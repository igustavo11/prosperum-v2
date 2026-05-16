# Portfolio Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `/portfolio` page with Hero, PortfolioGrid, and Disclaimer sections, fed by mocked property data, each card linking to a per-property stub route.

**Architecture:** Three standalone components (`PortfolioHero`, `PortfolioGrid` + `PortfolioCard`, `Disclaimer`) assembled in the portfolio page route. Mock data lives in `src/data/properties.ts` and is typed as `Property[]`. The Navbar already supports a white variant — we just extend it to include `/portfolio`.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, next-intl v4, lucide-react, Next.js `Image` and `Link`.

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Modify | `src/messages/pt.json` | Add `portfolio` i18n namespace (PT) |
| Modify | `src/messages/en.json` | Add `portfolio` i18n namespace (EN) |
| Create | `src/data/properties.ts` | Typed mock property array |
| Modify | `src/components/layout/Navbar.tsx` | Add `/portfolio` to `isWhiteVariant` |
| Create | `src/components/portfolio/PortfolioHero.tsx` | Hero section with background + heading |
| Create | `src/components/portfolio/PortfolioCard.tsx` | Single card: image, title, location, button |
| Create | `src/components/portfolio/PortfolioGrid.tsx` | 3-col grid driven by `properties` data |
| Create | `src/components/portfolio/Disclaimer.tsx` | Dark CTA section with emblem |
| Download | `public/images/portfolio/hero.jpg` | Hero background image |
| Download | `public/images/portfolio/property-placeholder.jpg` | Card placeholder image |
| Download | `public/images/emblem-circle.png` | Gold circle emblem (Disclaimer) |
| Download | `public/images/emblem-logo.png` | Logo mark on emblem (Disclaimer) |
| Create | `src/app/[locale]/portfolio/page.tsx` | Portfolio index page |
| Create | `src/app/[locale]/portfolio/[id]/page.tsx` | Property detail stub |

---

## Task 1: Add i18n keys

**Files:**
- Modify: `src/messages/pt.json`
- Modify: `src/messages/en.json`

- [ ] **Step 1: Add `portfolio` namespace to `pt.json`**

Open `src/messages/pt.json` and add after the `"about"` block:

```json
"portfolio": {
  "viewProject": "Ver projeto",
  "hero": {
    "title": "Portfolio"
  },
  "disclaimer": {
    "title": "Quer ver oportunidades antes de serem públicas?",
    "subtitle": "Investidores credenciados em nossa lista veem novas oportunidades primeiro, com documentos completos de underwriting.",
    "cta": "Acesso antecipado"
  }
}
```

- [ ] **Step 2: Add `portfolio` namespace to `en.json`**

Open `src/messages/en.json` and add after the `"about"` block:

```json
"portfolio": {
  "viewProject": "View project",
  "hero": {
    "title": "Portfolio"
  },
  "disclaimer": {
    "title": "Want to see deals before they're public?",
    "subtitle": "Accredited investors on our list see new opportunities first, with full underwriting documents.",
    "cta": "Get early access"
  }
}
```

- [ ] **Step 3: Verify lint passes**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/messages/pt.json src/messages/en.json
git commit -m "feat: add portfolio i18n keys (pt + en)"
```

---

## Task 2: Create mock property data

**Files:**
- Create: `src/data/properties.ts`

- [ ] **Step 1: Create the file**

```ts
export type Property = {
  id: string;
  title: string;
  location: string;
  image: string;
};

export const properties: Property[] = [
  {
    id: "essex-residence-1",
    title: "The Essex Residence",
    location: "6 Schubert Ln, Paramus, NJ 07652",
    image: "/images/portfolio/property-placeholder.jpg",
  },
  {
    id: "essex-residence-2",
    title: "The Essex Residence",
    location: "6 Schubert Ln, Paramus, NJ 07652",
    image: "/images/portfolio/property-placeholder.jpg",
  },
  {
    id: "essex-residence-3",
    title: "The Essex Residence",
    location: "6 Schubert Ln, Paramus, NJ 07652",
    image: "/images/portfolio/property-placeholder.jpg",
  },
  {
    id: "essex-residence-4",
    title: "The Essex Residence",
    location: "6 Schubert Ln, Paramus, NJ 07652",
    image: "/images/portfolio/property-placeholder.jpg",
  },
  {
    id: "essex-residence-5",
    title: "The Essex Residence",
    location: "6 Schubert Ln, Paramus, NJ 07652",
    image: "/images/portfolio/property-placeholder.jpg",
  },
  {
    id: "essex-residence-6",
    title: "The Essex Residence",
    location: "6 Schubert Ln, Paramus, NJ 07652",
    image: "/images/portfolio/property-placeholder.jpg",
  },
  {
    id: "essex-residence-7",
    title: "The Essex Residence",
    location: "6 Schubert Ln, Paramus, NJ 07652",
    image: "/images/portfolio/property-placeholder.jpg",
  },
  {
    id: "essex-residence-8",
    title: "The Essex Residence",
    location: "6 Schubert Ln, Paramus, NJ 07652",
    image: "/images/portfolio/property-placeholder.jpg",
  },
];
```

- [ ] **Step 2: Verify lint**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/properties.ts
git commit -m "feat: add mock properties data"
```

---

## Task 3: Update Navbar white variant

**Files:**
- Modify: `src/components/layout/Navbar.tsx:16`

- [ ] **Step 1: Add `/portfolio` to `isWhiteVariant`**

Find line 16 in `src/components/layout/Navbar.tsx`:

```ts
// before
const isWhiteVariant = ["/about"].includes(pathname);

// after
const isWhiteVariant = ["/about", "/portfolio"].includes(pathname);
```

- [ ] **Step 2: Verify lint**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat: add /portfolio to navbar white variant"
```

---

## Task 4: Download image assets

**Files:**
- Download to: `public/images/portfolio/`
- Download to: `public/images/`

The Figma asset URLs below expire in 7 days. If they return 403/404, re-run the Figma MCP tool (`get_design_context` on node `2045:262`, file `nphWq5KdcLEEDvwGeMyO89`) to get fresh URLs.

- [ ] **Step 1: Create portfolio images directory**

```bash
mkdir -p public/images/portfolio
```

- [ ] **Step 2: Download hero background**

```bash
curl -L "https://www.figma.com/api/mcp/asset/595c75fc-39a4-4cb5-82c1-ef8e550a0452" \
  -o public/images/portfolio/hero.jpg
```

- [ ] **Step 3: Download property placeholder image**

```bash
curl -L "https://www.figma.com/api/mcp/asset/5daf3bba-5d8e-40ef-b530-c831ed83cc50" \
  -o public/images/portfolio/property-placeholder.jpg
```

- [ ] **Step 4: Download emblem circle**

```bash
curl -L "https://www.figma.com/api/mcp/asset/ad589fb4-7196-4ec2-b137-d06737ae240a" \
  -o public/images/emblem-circle.png
```

- [ ] **Step 5: Download emblem logo mark**

```bash
curl -L "https://www.figma.com/api/mcp/asset/38e396a9-d210-479f-8ae1-97e6891cfbce" \
  -o public/images/emblem-logo.png
```

- [ ] **Step 6: Verify files exist and are non-empty**

```bash
ls -lh public/images/portfolio/ public/images/emblem-*.png
```

Expected: all four files present with size > 0.

- [ ] **Step 7: Commit**

```bash
git add public/images/portfolio/ public/images/emblem-circle.png public/images/emblem-logo.png
git commit -m "feat: add portfolio image assets"
```

---

## Task 5: Create PortfolioHero

**Files:**
- Create: `src/components/portfolio/PortfolioHero.tsx`

- [ ] **Step 1: Create the component**

```tsx
"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function PortfolioHero() {
  const t = useTranslations("portfolio.hero");

  return (
    <section className="relative overflow-hidden" style={{ minHeight: "800px" }}>
      <Image
        src="/images/portfolio/hero.jpg"
        alt=""
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.25)] to-[rgba(0,0,0,0.79)]" />
      <div className="relative z-10 px-[148px] pt-[287px]">
        <h1 className="font-['Urbanist'] font-medium text-[130px] text-white leading-none">
          {t("title")}
        </h1>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify lint**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/portfolio/PortfolioHero.tsx
git commit -m "feat: add PortfolioHero component"
```

---

## Task 6: Create PortfolioCard

**Files:**
- Create: `src/components/portfolio/PortfolioCard.tsx`

- [ ] **Step 1: Create the component**

```tsx
"use client";

import Image from "next/image";
import { Link } from "@/navigation";
import { MapPin, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Property } from "@/data/properties";

type PortfolioCardProps = Pick<Property, "id" | "title" | "location" | "image">;

export default function PortfolioCard({ id, title, location, image }: PortfolioCardProps) {
  const t = useTranslations("portfolio");

  return (
    <div className="flex flex-col gap-4">
      <Link href={`/portfolio/${id}`} className="block relative w-full aspect-[4/3] overflow-hidden rounded-sm">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
      </Link>

      <p className="font-['Urbanist'] font-semibold text-[40px] text-[#0c7e41] leading-tight">
        {title}
      </p>

      <div className="flex items-center gap-2">
        <MapPin size={20} className="text-[#101010] flex-shrink-0" />
        <p className="font-['Urbanist'] font-medium text-[20px] text-[#101010]">
          {location}
        </p>
      </div>

      <Link
        href={`/portfolio/${id}`}
        className="inline-flex items-center gap-3 border border-[#212121] rounded-[50px] h-[48px] px-6 w-fit font-['Urbanist'] font-medium text-[20px] text-[#212121] hover:bg-[#21212110] transition-colors"
      >
        {t("viewProject")}
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
```

- [ ] **Step 2: Verify lint**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/portfolio/PortfolioCard.tsx
git commit -m "feat: add PortfolioCard component"
```

---

## Task 7: Create PortfolioGrid

**Files:**
- Create: `src/components/portfolio/PortfolioGrid.tsx`

- [ ] **Step 1: Create the component**

```tsx
"use client";

import { properties } from "@/data/properties";
import PortfolioCard from "./PortfolioCard";

export default function PortfolioGrid() {
  return (
    <section className="bg-[#f2f2f0] rounded-t-[40px] px-[83px] py-[167px]">
      <div className="grid grid-cols-3 gap-x-[37px] gap-y-[200px]">
        {properties.map((property) => (
          <PortfolioCard
            key={property.id}
            id={property.id}
            title={property.title}
            location={property.location}
            image={property.image}
          />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify lint**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/portfolio/PortfolioGrid.tsx
git commit -m "feat: add PortfolioGrid component"
```

---

## Task 8: Create Disclaimer

**Files:**
- Create: `src/components/portfolio/Disclaimer.tsx`

- [ ] **Step 1: Create the component**

```tsx
"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Disclaimer() {
  const t = useTranslations("portfolio.disclaimer");

  return (
    <section className="bg-[#101010] relative pt-[100px] pb-[120px] px-[168px]">
      {/* Emblem — sits at top edge, half overlapping the grid above */}
      <div className="absolute -top-[101px] left-1/2 -translate-x-1/2 w-[203px] h-[203px]">
        <Image
          src="/images/emblem-circle.png"
          alt=""
          fill
          className="object-contain"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[130px] h-[128px]">
            <Image
              src="/images/emblem-logo.png"
              alt="Prosperium"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <h2 className="font-['Urbanist'] font-medium text-[60px] text-[#efefef] leading-tight max-w-[800px] whitespace-pre-line">
        {t("title")}
      </h2>

      <p className="font-['Urbanist'] font-medium text-[24px] text-[#efefef] max-w-[613px] mt-8">
        {t("subtitle")}
      </p>

      <button
        type="button"
        className="mt-12 inline-flex items-center gap-3 bg-gradient-to-r from-[#be9339] to-[#e4d488] rounded-[50px] h-[62px] px-8 font-['Urbanist'] font-medium text-[24px] text-black"
      >
        {t("cta")}
        <ArrowRight size={20} />
      </button>
    </section>
  );
}
```

- [ ] **Step 2: Verify lint**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/portfolio/Disclaimer.tsx
git commit -m "feat: add Disclaimer component"
```

---

## Task 9: Create portfolio index page

**Files:**
- Create: `src/app/[locale]/portfolio/page.tsx`

- [ ] **Step 1: Create the page**

```tsx
import PortfolioHero from "@/components/portfolio/PortfolioHero";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import Disclaimer from "@/components/portfolio/Disclaimer";

export default function PortfolioPage() {
  return (
    <div>
      <PortfolioHero />
      <PortfolioGrid />
      <Disclaimer />
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: build succeeds with no errors. Ignore size warnings.

- [ ] **Step 3: Commit**

```bash
git add src/app/[locale]/portfolio/page.tsx
git commit -m "feat: add portfolio index page"
```

---

## Task 10: Create property detail stub

**Files:**
- Create: `src/app/[locale]/portfolio/[id]/page.tsx`

- [ ] **Step 1: Create the stub page**

```tsx
import { properties } from "@/data/properties";

type Props = {
  params: Promise<{ id: string; locale: string }>;
};

export default async function PropertyPage({ params }: Props) {
  const { id } = await params;
  const property = properties.find((p) => p.id === id);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="font-['Urbanist'] font-semibold text-[48px] text-[#0c7e41]">
          {property?.title ?? id}
        </h1>
        <p className="font-['Urbanist'] text-[20px] text-[#101010] mt-4">
          Coming soon
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: build succeeds with no errors.

- [ ] **Step 3: Smoke test in dev**

```bash
npm run dev
```

Visit:
- `http://localhost:3000/en/portfolio` — should show Hero + Grid + Disclaimer, white Navbar
- `http://localhost:3000/pt/portfolio` — same in PT
- `http://localhost:3000/en/portfolio/essex-residence-1` — should show "The Essex Residence / Coming soon"
- `http://localhost:3000/pt/portfolio` — Navbar links, logo, and language toggle should be white

- [ ] **Step 4: Commit**

```bash
git add src/app/[locale]/portfolio/[id]/page.tsx
git commit -m "feat: add property detail stub page"
```

---

## Done

All tasks complete. The `/portfolio` route is live with:
- White navbar
- Full-screen hero with background image and "Portfolio" heading
- 3-column property grid with mock data, each card linking to `/portfolio/[id]`
- Disclaimer CTA section with gold emblem separator
- Individual property stub pages at `/portfolio/[id]`
