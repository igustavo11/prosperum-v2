# Portfolio Page — Design Spec

**Date:** 2026-05-16  
**Figma:** `nphWq5KdcLEEDvwGeMyO89` node `2045:262`

---

## Overview

New `/portfolio` page composed of three main sections: Hero, PortfolioGrid, and Disclaimer. The grid is fed by a mocked JSON data file. Each card links to an individual property page (`/portfolio/[id]`) that will receive full content in a future implementation.

---

## Navbar

The existing `Navbar.tsx` already handles a white variant based on pathname. Add `/portfolio` to the `isWhiteVariant` array alongside `/about`:

```ts
const isWhiteVariant = ["/about", "/portfolio"].includes(pathname);
```

This makes the logo, links, and language toggle render in white on the portfolio hero background.

---

## Section 1 — PortfolioHero

**File:** `src/components/portfolio/PortfolioHero.tsx`

- Full-width hero, height ~800px
- Background: full-bleed property image with a dark-to-light gradient overlay (`from rgba(0,0,0,0.79)` top to `rgba(0,0,0,0.25)` bottom)
- Text: `"Portfolio"` label in Urbanist Medium, 130px, white, positioned bottom-left (~148px from left, ~287px from top)
- No additional elements beyond the Navbar (rendered separately in the layout) and the heading

---

## Section 2 — PortfolioGrid

**Files:**
- `src/components/portfolio/PortfolioGrid.tsx` — grid container
- `src/components/portfolio/PortfolioCard.tsx` — individual card

### Layout

- Background: the Figma uses a background image for this section; implement with a light gray/off-white CSS color (`#f5f5f5` or similar) and top corners rounded (large radius, ~40px) as a faithful approximation — no background image asset needed
- 3-column CSS grid with consistent gap between cards
- Cards render in row-major order; the last row may be incomplete (fewer than 3 cards)

### PortfolioCard props

```ts
type Property = {
  id: string;
  title: string;
  location: string;
  image: string;
};
```

### Card anatomy (top to bottom)

1. **Image** — rectangular, full card width, fixed aspect ratio (~4:3). Clicking the image navigates to `/portfolio/[id]`
2. **Title** — property name in Urbanist SemiBold, 40px, color `#0c7e41` (green)
3. **Location row** — pin icon (lucide `MapPin`) + address text in `#101010`, 20px, Urbanist Medium
4. **"VIEW PROJECT →" button** — pill-shaped border button (`border border-[#212121]`, `rounded-[50px]`, height 48px, width 195px), Urbanist Medium 20px, color `#212121`. Clicking navigates to `/portfolio/[id]`. Arrow icon (lucide `ArrowRight` or inline SVG) at the right of the text.

### Mock data

**File:** `src/data/properties.ts`

Exports a typed array of `Property[]`. Seed with ~8 entries (matching the Figma). Image paths point to `/images/properties/` (placeholder images reused from Figma assets or a single placeholder).

```ts
export const properties: Property[] = [
  { id: "essex-residence", title: "The Essex Residence", location: "6 Schubert Ln, Paramus, NJ 07652", image: "/images/properties/essex.jpg" },
  // ... more entries
];
```

---

## Section 3 — Disclaimer

**File:** `src/components/portfolio/Disclaimer.tsx`

- Background: dark `#101010`, full-width
- **Separator emblem**: centered circular badge (~203px) sitting at the boundary between PortfolioGrid and Disclaimer. The Figma uses two image assets: a gold circle (`imgEllipse1`) and the Prosperium logo mark on top (`imgAsset21`). Download and save these as `/public/images/emblem-circle.png` and `/public/images/emblem-logo.png` during implementation, then compose them with absolute positioning.
- **Heading**: `"Want to see deals before they're public?"` — Urbanist Medium, 60px, color `#efefef`, multi-line
- **Subtext**: paragraph about accredited investors, Urbanist Medium, 24px, color `#efefef`, max-width ~613px
- **CTA button**: pill shape (`rounded-[50px]`), gradient background `from-[#be9339] to-[#e4d488]`, height 62px, width ~259px, text `"Get early access →"` in black, Urbanist Medium 24px. Button is non-functional for now (no link/action defined yet).

All text content goes through `next-intl`. Keys:

| Key | PT | EN |
|---|---|---|
| `portfolio.disclaimer.title` | `"Quer ver oportunidades antes de serem públicas?"` | `"Want to see deals before they're public?"` |
| `portfolio.disclaimer.subtitle` | `"Investidores credenciados em nossa lista veem novas oportunidades primeiro, com documentos completos de underwriting."` | `"Accredited investors on our list see new opportunities first, with full underwriting documents."` |
| `portfolio.disclaimer.cta` | `"Acesso antecipado"` | `"Get early access"` |
| `portfolio.viewProject` | `"Ver projeto"` | `"View project"` |

---

## Routing

### Portfolio index

**File:** `src/app/[locale]/portfolio/page.tsx`

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

### Property detail (stub)

**File:** `src/app/[locale]/portfolio/[id]/page.tsx`

Renders a minimal placeholder: property title + "Coming soon" message. Uses `params.id` to look up the property from `src/data/properties.ts` and shows its title. No 404 handling needed for now.

---

## i18n

Add to `src/messages/pt.json` and `src/messages/en.json` under a `"portfolio"` namespace. No other namespaces are affected.

---

## Constraints

- All components are `"use client"` (project convention)
- No new dependencies — use `lucide-react` for the pin icon, Next.js `Link` for navigation, `next-intl` for translations
- Images in the mock data: reuse the same placeholder path for all cards (real images to be provided later)
- The Disclaimer CTA button has no action yet — render as a static styled element
- Do not add 404 handling for unknown property IDs (future concern)
- Do not commit during the brainstorming/planning phase
