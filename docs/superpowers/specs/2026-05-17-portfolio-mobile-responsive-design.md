# Design: Portfolio Mobile Responsive

**Date:** 2026-05-17
**Status:** Approved

## Overview

Add mobile responsive styles to all portfolio components using `md:` breakpoint (768px). Desktop layout remains untouched — all changes are mobile-only via Tailwind's default-first approach.

## Breakpoint Strategy

- **Mobile-first**: base classes = mobile styles
- **Desktop override**: `md:` prefix restores existing desktop values
- **Breakpoint**: `md` = 768px (consistent with Navbar)

## Components

### 1. PortfolioHero (`src/components/portfolio/PortfolioHero.tsx`)

| Property | Mobile (default) | Desktop (`md:`) |
|----------|-----------------|-----------------|
| minHeight | `min-h-[300px]` | `min-h-[800px]` |
| Title font | `text-[48px]` | `text-[130px]` |
| Padding | `px-6 pt-[180px]` | `px-[148px] pt-[287px]` |
| Title alignment | centered | left |

### 2. PortfolioGrid (`src/components/portfolio/PortfolioGrid.tsx`)

| Property | Mobile (default) | Desktop (`md:`) |
|----------|-----------------|-----------------|
| Layout | `flex flex-col gap-8` | `grid grid-cols-3 gap-x-[37px] gap-y-[65px]` |
| Padding | `px-6 py-8` | `px-[83px] py-[167px]` |
| Overlap | `-mt-[60px]` | `-mt-[257px]` |
| Border radius | `rounded-t-[20px]` | `rounded-t-[40px]` |

### 3. PortfolioCard (`src/components/portfolio/PortfolioCard.tsx`)

| Property | Mobile (default) | Desktop (`md:`) |
|----------|-----------------|-----------------|
| Image radius | `rounded-none` | `rounded-sm` |
| Title font | `text-[24px]` | `text-[40px]` |
| Location font | `text-[14px]` | `text-[20px]` |
| Location icon | `size={16}` | `size={20}` |
| Button height | `h-[40px]` | `h-[48px]` |
| Button font | `text-[14px]` | `text-[20px]` |
| Button padding | `px-4` | `px-6` |
| Gap | `gap-3` | `gap-4` |

### 4. Property Detail Page (`src/app/[locale]/portfolio/[id]/page.tsx`)

**Mobile layout changes:**
- Container: `px-4 pt-4 pb-8` (desktop: `px-[86px] pt-[190px] pb-[80px]`)
- Image: `rounded-t-[30px]` (desktop: `rounded-[20px]`)
- Card overlap: `-mt-[40px]` (desktop: `-mt-[120px]`)
- Card max-width: `max-w-full` (desktop: `max-w-[938px]`)
- Back button: moved **below** the card on mobile, full-width centered

### 5. PropertyInfoCard (`src/components/portfolio/property/PropertyInfoCard.tsx`)

| Property | Mobile (default) | Desktop (`md:`) |
|----------|-----------------|-----------------|
| Card radius | `rounded-b-[40px]` | `rounded-b-[60px]` |
| Card padding | `px-6 pt-[80px] pb-8` | `px-[80px] pt-[140px] pb-[60px]` |
| Title font | `text-[32px]` | `text-[64px]` |
| Title layout | `flex-col gap-4` | `flex-row` (items-start justify-between) |
| Address pill | `h-[36px] text-[14px] px-4` | `h-[56px] text-[24px] px-6` |
| Address icon | `size={16}` | `size={26}` |
| Description font | `text-[14px]` | `text-[20px]` |
| Highlights font | `text-[14px]` | `text-[20px]` |
| Highlights label font | `text-[14px]` | `text-[20px]` |

### 6. PropertyBackButton (`src/components/portfolio/property/PropertyBackButton.tsx`)

| Property | Mobile (default) | Desktop (`md:`) |
|----------|-----------------|-----------------|
| Width | `w-full justify-center` | `w-fit` |
| Height | `h-[44px]` | `h-[45px]` |
| Font | `text-[16px]` | `text-[20px]` |
| Padding | `px-4` | `px-6` |
| Icon size | `size={16}` | `size={17}` |

### 7. Disclaimer (`src/components/portfolio/Disclaimer.tsx`)

| Property | Mobile (default) | Desktop (`md:`) |
|----------|-----------------|-----------------|
| Padding | `px-6 pt-16 pb-12` | `px-[168px] pt-[100px] pb-[120px]` |
| Eclipse size | `w-[80px] h-[80px]` | `w-[203px] h-[203px]` |
| Eclipse offset | `-top-[40px]` | `-top-[101px]` |
| Logo size | `w-[50px] h-[50px]` | `w-[130px] h-[128px]` |
| Title font | `text-[28px]` | `text-[60px]` |
| Subtitle font | `text-[14px]` | `text-[24px]` |
| CTA height | `h-[44px]` | `h-[62px]` |
| CTA font | `text-[16px]` | `text-[24px]` |
| CTA padding | `px-6` | `px-8` |
| CTA icon | `size={16}` | `size={20}` |

## Files to Modify

1. `src/components/portfolio/PortfolioHero.tsx`
2. `src/components/portfolio/PortfolioGrid.tsx`
3. `src/components/portfolio/PortfolioCard.tsx`
4. `src/app/[locale]/portfolio/[id]/page.tsx`
5. `src/components/portfolio/property/PropertyInfoCard.tsx`
6. `src/components/portfolio/property/PropertyBackButton.tsx`
7. `src/components/portfolio/Disclaimer.tsx`

## Constraints

- **Desktop must remain pixel-perfect** — all existing desktop values preserved via `md:` prefix
- No changes to data, routing, or business logic
- No new dependencies
- Tailwind classes only (no custom CSS)
