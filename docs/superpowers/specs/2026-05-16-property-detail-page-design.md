# Property Detail Page — Design Spec

**Date:** 2026-05-16
**Figma:** https://www.figma.com/design/nphWq5KdcLEEDvwGeMyO89/Untitled?node-id=2045-316

---

## Overview

Each portfolio card links to a dedicated property detail page (`/portfolio/[id]`). The page displays a photo swiper, a green info card with description and highlights, a Google Maps address button, and a back-to-portfolio button. Content is fully internationalized via next-intl.

---

## Data Model

### `src/data/properties.ts`

Extend `Property` type — `image: string` becomes `images: string[]`, add `googleMapsUrl`:

```ts
export type Property = {
  id: string;
  title: string;
  location: string;
  images: string[];      // first image used as thumbnail in PortfolioCard
  googleMapsUrl: string; // full Google Maps URL, opened in new tab from address button
};
```

`PortfolioCard` is updated minimally: `images[0]` replaces `image` for the thumbnail.

### `src/messages/pt.json` and `en.json`

New keys under `portfolio.properties.{id}`:

```json
"portfolio": {
  "properties": {
    "essex-residence-1": {
      "description": "...",
      "highlights": ["...", "..."]
    }
  }
}
```

`description` is a single paragraph string. `highlights` is an array of strings, each rendered with a `◆` prefix. Both fields are translated in pt.json and en.json.

---

## Routing

- Route: `src/app/[locale]/portfolio/[id]/page.tsx`
- Server component — resolves `params.id`, finds the property in `properties[]`
- If property not found: calls `notFound()` (Next.js 404)
- Passes `property` data as props to child components

---

## Layout

Page background: `bg-[#d9d9d9]` (grey). No hero section — page starts directly with the navbar, then the back button, then the swiper, then the card.

```
┌─────────────────────────────────┐
│  Navbar (dark text variant)     │
├─────────────────────────────────┤
│  [← BACK TO PORTFOLIO]          │  ← PropertyBackButton, top-left, green pill
├─────────────────────────────────┤
│                                 │
│      PropertyImageSwiper        │  ← full-width image, 4:3 aspect, swiper dots
│                                 │
├──────────────────────────────┐  │
│  Green card (rounded-[60px]) │  │  ← PropertyInfoCard
│  Title          [📍 Address] │  │
│  Description text            │  │
│  ◆ Highlight 1               │  │
│  ◆ Highlight 2               │  │
└──────────────────────────────┘  │
└─────────────────────────────────┘
```

---

## Components

All components are `"use client"` per project convention. Placed in `src/components/portfolio/property/`.

### `PropertyBackButton.tsx`

- Green pill: `bg-[#0e8944]`, `rounded-[50px]`, `h-[45px]`, `px-6`
- Left-pointing arrow icon (`ArrowLeft` from lucide-react) + text "BACK TO PORTFOLIO" / "VOLTAR AO PORTFÓLIO"
- Uses `Link` from `@/navigation` → href `/portfolio`
- i18n key: `portfolio.backToPortfolio`
- Positioned above the swiper with `pt-[190px]` top padding (accounts for navbar height)

### `PropertyImageSwiper.tsx`

- Uses the Swiper library already installed in the project
- Accepts `images: string[]`
- Modules: `Navigation`, `Pagination`
- Aspect ratio `4/3`, `overflow-hidden`, uses `next/image` with `fill` + `object-cover`
- If only one image, swiper controls are hidden

### `PropertyInfoCard.tsx`

- Container: `bg-[#0e8944]`, `rounded-[60px]`, `px-[80px] py-[60px]` (approximate from Figma)
- Title row: property `title` (white, `text-[64px]`, `font-semibold`, Urbanist) + address pill button inline/flex
- Address button: `bg-[#efefef]`, `rounded-[50px]`, `h-[56px]`, `px-6`, `shadow`, `MapPin` icon (green), text `location` (green). Opens `googleMapsUrl` in `target="_blank"`
- Description: white, `text-[20px]`, `font-medium`, Urbanist — from `t('portfolio.properties.{id}.description')`
- Highlights heading: "Highlights" (white, medium weight)
- Highlights list: each item prefixed with `◆`, white text — from `t.raw('portfolio.properties.{id}.highlights')` (array)
- Accepts: `property: Property`, locale translations via `useTranslations`

### `page.tsx`

```ts
// src/app/[locale]/portfolio/[id]/page.tsx
import { notFound } from "next/navigation";
import { properties } from "@/data/properties";
import PropertyBackButton from "@/components/portfolio/property/PropertyBackButton";
import PropertyImageSwiper from "@/components/portfolio/property/PropertyImageSwiper";
import PropertyInfoCard from "@/components/portfolio/property/PropertyInfoCard";

export default async function PropertyPage({ params }) {
  const { id } = await params;
  const property = properties.find((p) => p.id === id);
  if (!property) notFound();

  return (
    <div className="min-h-screen bg-[#d9d9d9]">
      <div className="px-[86px] pt-[190px] pb-[60px] flex flex-col gap-6 max-w-[1440px] mx-auto">
        <PropertyBackButton />
        <PropertyImageSwiper images={property.images} title={property.title} />
        <PropertyInfoCard property={property} />
      </div>
    </div>
  );
}
```

---

## Navbar Behavior

`isWhiteVariant` only matches `/about` and `/portfolio` exactly, so `/portfolio/[id]` gets the default variant: `logo-branco.svg` (white logo) + `text-[#212121]` links. Since the page background is grey (`#d9d9d9`), the white logo will be invisible — the Navbar needs a third variant for this route.

**Change required in `Navbar.tsx`:** add a `isPropertyDetail` check (e.g. `pathname.startsWith("/portfolio/")`) that uses `logow.svg` (colored logo) with `text-[#212121]` links — same as the property detail Figma shows.

---

## i18n Keys to Add

**Both `pt.json` and `en.json`:**

```json
"portfolio": {
  "backToPortfolio": "BACK TO PORTFOLIO",   // pt: "VOLTAR AO PORTFÓLIO"
  "highlights": "Highlights",               // pt: "Destaques"
  "properties": {
    "essex-residence-1": {
      "description": "Acquired as a tear-down on a desirable corner lot in Rochelle Park. The original 1950s structure was non-conforming and undersized for the lot. Prosperium demolished and rebuilt to the maximum allowable envelope, delivering a 4,200 sqft transitional-modern home with five bedrooms, four-and-a-half baths, and a walk-out lower level.\n\nThe home was listed within 14 days of certificate of occupancy and went under contract above asking price within the first weekend of showings, validating both the location thesis and the finish-level investment.",
      "highlights": [
        "Five bedrooms, four-and-a-half baths, finished walk-out basement",
        "White oak engineered floors, marble waterfall island, custom millwork",
        "Sold above asking within first weekend of showings",
        "Vertically integrated build under the Prosperium model"
      ]
    }
  }
}
```

(All 8 `essex-residence-*` entries share the same content for now since they are placeholders.)

---

## Out of Scope

- Footer (not shown in Figma for this page)
- Mobile responsive breakpoints (deferred to a later iteration)
- CMS or dynamic content loading
- Animations beyond the existing hover scale on images
