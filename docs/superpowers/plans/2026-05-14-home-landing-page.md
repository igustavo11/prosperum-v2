# Home Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the Prosperium home landing page from Figma with Navbar + Footer in the global layout, and Hero, PremiumExperience, ServicesSection, and CTASection as composable page components.

**Architecture:** All layout-level elements (Navbar, Footer) live in `src/components/layout/` and are mounted in `src/app/[locale]/layout.tsx`. Page-level sections live in `src/components/home/` and are composed in `src/app/[locale]/page.tsx`. Parallax is implemented client-side with a scroll event listener and no external libraries.

**Tech Stack:** Next.js 16 App Router, next-intl v4, Tailwind CSS v4, TypeScript, Urbanist font

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `public/images/logo.png` | Navbar logo (from Figma) |
| Create | `public/images/flag-en.png` | Language toggle flag (from Figma) |
| Create | `public/images/hero-building.png` | Hero right-side building photo |
| Create | `public/images/hero-bg.png` | Hero full-width background (10% opacity) |
| Create | `public/images/services-icon.png` | Icon above "Our Services" title |
| Create | `public/images/premium-photo.jpg` | Premium Experience parallax background |
| Create | `src/navigation.ts` | next-intl typed navigation utilities |
| Modify | `src/messages/en.json` | All English strings |
| Modify | `src/messages/pt.json` | All Portuguese strings |
| Create | `src/components/layout/Footer.tsx` | © 2026 Prosperium strip |
| Create | `src/components/layout/Navbar.tsx` | Logo + nav links + EN/PT toggle |
| Modify | `src/app/[locale]/layout.tsx` | Mount Navbar + Footer |
| Create | `src/components/home/Hero.tsx` | Hero section (Server Component) |
| Create | `src/components/home/PremiumExperience.tsx` | Parallax photo section ("use client") |
| Create | `src/components/home/ServiceCard.tsx` | Reusable card (title left, body right) |
| Create | `src/components/home/ServicesSection.tsx` | Dark gradient wrapper with 3 ServiceCards |
| Create | `src/components/home/CTASection.tsx` | "Ready to invest" section + gold button |
| Modify | `src/app/[locale]/page.tsx` | Compose all home sections |

---

### Task 1: Download Figma assets to public/images/

**Files:**
- Create: `public/images/logo.png`
- Create: `public/images/flag-en.png`
- Create: `public/images/hero-building.png`
- Create: `public/images/hero-bg.png`
- Create: `public/images/services-icon.png`
- Create: `public/images/premium-photo.jpg`

- [ ] **Step 1: Create the images directory**

```bash
mkdir -p /home/gustavo/www/prosprerumv2/prosprerum/public/images
```

- [ ] **Step 2: Download all assets**

```bash
cd /home/gustavo/www/prosprerumv2/prosprerum/public/images

curl -o logo.png "https://www.figma.com/api/mcp/asset/ee90ceb0-6446-4fc1-9fd7-02307ecb7b7e"
curl -o flag-en.png "https://www.figma.com/api/mcp/asset/21126f1c-8418-47c4-91b4-3d8a4b994389"
curl -o hero-building.png "https://www.figma.com/api/mcp/asset/fde0b95f-48f4-4290-8132-14555609c29d"
curl -o hero-bg.png "https://www.figma.com/api/mcp/asset/88acdaef-85be-4aa6-a8aa-6c4aea666029"
curl -o services-icon.png "https://www.figma.com/api/mcp/asset/3cef88a6-fc87-4e39-b2f4-ea2ccfcca392"
curl -o premium-photo.jpg "https://www.figma.com/api/mcp/asset/9383565e-e8a1-433a-9df7-95a2dc55763b"
```

- [ ] **Step 3: Verify all 6 files exist and are non-empty**

```bash
ls -lh /home/gustavo/www/prosprerumv2/prosprerum/public/images/
```

Expected: 6 files each > 1KB.

- [ ] **Step 4: Commit**

```bash
git add public/images/
git commit -m "feat: add figma design assets to public/images"
```

---

### Task 2: Create next-intl navigation utilities

**Files:**
- Create: `src/navigation.ts`

- [ ] **Step 1: Create `src/navigation.ts`**

```ts
import { createNavigation } from 'next-intl/navigation'
import { routing } from './proxy'

export const { Link, useRouter, usePathname, redirect } = createNavigation(routing)
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add src/navigation.ts
git commit -m "feat: add next-intl navigation utilities"
```

---

### Task 3: Update translation files with all home page strings

**Files:**
- Modify: `src/messages/en.json`
- Modify: `src/messages/pt.json`

- [ ] **Step 1: Replace `src/messages/en.json` entirely**

```json
{
  "nav": {
    "home": "HOME",
    "about": "ABOUT",
    "portfolio": "PORTFOLIO",
    "contact": "CONTACT",
    "language": "PT"
  },
  "hero": {
    "heading_1": "Our passion for real estate is the secret to your",
    "heading_highlight": "success",
    "heading_2": "Investments",
    "subtitle_1": "Transforming investments into",
    "subtitle_2": "real opportunities",
    "cta": "Learn more"
  },
  "premium": {
    "title_1": "Premium",
    "title_2": "Experience",
    "description": "Exclusivity with the human touch you need. Count on a Carbon Partner and an investment advisor dedicated to your financial success."
  },
  "services": {
    "title": "Our Services",
    "subtitle": "Discover our solutions to enhance your investments",
    "core_strategy": {
      "title": "Core Strategy",
      "intro": "Our strategy addresses the demands of the real estate market. We reimagine the development and management of multi-family residential buildings in the U.S. by focusing on:",
      "point_1_title": "Collaboration with Experts:",
      "point_1_body": "Top-tier architects, engineers, and contractors focused on innovation and quality.",
      "point_2_title": "Efficient Project Management:",
      "point_2_body": "Management techniques to optimize timelines, control costs, and ensure excellence.",
      "point_3_title": "Strategic Resource Allocation:",
      "point_3_body": "Executing each project with balanced budgeting, resources, and timelines to guarantee quality standards and financial returns."
    },
    "investment_options": {
      "title": "Investment Options",
      "intro": "We offer flexible investment opportunities:",
      "point_1_title": "Equity Investment:",
      "point_1_body": "Ownership in projects, with gains from appreciation, rental income, and future sales profits.",
      "point_2_title": "Debt Investment:",
      "point_2_body": "For those seeking fixed returns, offering predictable income backed by real estate assets.",
      "point_3_title": "Project-Specific Investments:",
      "point_3_body": "Focus on individual opportunities with detailed updates and reports for informed decisions."
    },
    "performance_goals": {
      "title": "Performance Goals",
      "point_1_title": "Target Return:",
      "point_1_body": "We aim for a 20%+ IRR on all investments, ensuring significant growth.",
      "point_2_title": "Project Duration:",
      "point_2_body": "Timelines of 24 to 36 months, depending on complexity, with adherence to deadlines and quality.",
      "point_3_title": "Risk Mitigation:",
      "point_3_body": "Strategic planning and active oversight for predictable outcomes and investor capital protection."
    }
  },
  "cta": {
    "heading": "Ready to invest in your future?",
    "subtitle": "Contact us and discover how we can help transform your goals into reality.",
    "button": "Contact us"
  },
  "footer": {
    "copyright": "© 2026 Prosperium"
  }
}
```

- [ ] **Step 2: Replace `src/messages/pt.json` entirely**

```json
{
  "nav": {
    "home": "INÍCIO",
    "about": "SOBRE",
    "portfolio": "PORTFÓLIO",
    "contact": "CONTATO",
    "language": "EN"
  },
  "hero": {
    "heading_1": "Nossa paixão pelo mercado imobiliário é o segredo do seu",
    "heading_highlight": "sucesso",
    "heading_2": "Investimentos",
    "subtitle_1": "Transformando investimentos em",
    "subtitle_2": "oportunidades reais",
    "cta": "Saiba mais"
  },
  "premium": {
    "title_1": "Experiência",
    "title_2": "Premium",
    "description": "Exclusividade com o toque humano que você precisa. Conte com um Carbon Partner e um consultor de investimentos dedicado ao seu sucesso financeiro."
  },
  "services": {
    "title": "Nossos Serviços",
    "subtitle": "Descubra nossas soluções para potencializar seus investimentos",
    "core_strategy": {
      "title": "Estratégia Central",
      "intro": "Nossa estratégia atende às demandas do mercado imobiliário. Reimaginamos o desenvolvimento e gestão de edifícios residenciais multifamiliares nos EUA, focando em:",
      "point_1_title": "Colaboração com Especialistas:",
      "point_1_body": "Arquitetos, engenheiros e empreiteiros de alto nível focados em inovação e qualidade.",
      "point_2_title": "Gestão Eficiente de Projetos:",
      "point_2_body": "Técnicas de gestão para otimizar prazos, controlar custos e garantir excelência.",
      "point_3_title": "Alocação Estratégica de Recursos:",
      "point_3_body": "Execução de cada projeto com orçamento, recursos e prazos equilibrados para garantir padrões de qualidade e retornos financeiros."
    },
    "investment_options": {
      "title": "Opções de Investimento",
      "intro": "Oferecemos oportunidades de investimento flexíveis:",
      "point_1_title": "Investimento em Equity:",
      "point_1_body": "Participação em projetos, com ganhos por valorização, renda de aluguel e lucros de vendas futuras.",
      "point_2_title": "Investimento em Dívida:",
      "point_2_body": "Para quem busca retornos fixos, oferecendo renda previsível garantida por ativos imobiliários.",
      "point_3_title": "Investimentos por Projeto:",
      "point_3_body": "Foco em oportunidades individuais com atualizações e relatórios detalhados para decisões informadas."
    },
    "performance_goals": {
      "title": "Metas de Desempenho",
      "point_1_title": "Retorno Esperado:",
      "point_1_body": "Buscamos uma TIR de 20%+ em todos os investimentos, garantindo crescimento significativo.",
      "point_2_title": "Duração dos Projetos:",
      "point_2_body": "Prazos de 24 a 36 meses, dependendo da complexidade, com cumprimento de prazos e qualidade.",
      "point_3_title": "Mitigação de Riscos:",
      "point_3_body": "Planejamento estratégico e supervisão ativa para resultados previsíveis e proteção do capital do investidor."
    }
  },
  "cta": {
    "heading": "Pronto para investir no seu futuro?",
    "subtitle": "Entre em contato e descubra como podemos transformar seus objetivos em realidade.",
    "button": "Fale conosco"
  },
  "footer": {
    "copyright": "© 2026 Prosperium"
  }
}
```

- [ ] **Step 3: Verify TypeScript (no type errors from message changes)**

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 4: Commit**

```bash
git add src/messages/
git commit -m "feat: add all home page translations for en and pt"
```

---

### Task 4: Create Footer component

**Files:**
- Create: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Create `src/components/layout/Footer.tsx`**

```tsx
import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="bg-[#dadada] py-8 text-center">
      <p className="text-[#212121] text-2xl font-medium">
        {t('copyright')}
      </p>
    </footer>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: add Footer component"
```

---

### Task 5: Create Navbar component

**Files:**
- Create: `src/components/layout/Navbar.tsx`

The Navbar is `"use client"` because it needs `useRouter` and `usePathname` from next-intl for the language toggle, and `useState` for the mobile menu.

- [ ] **Step 1: Create `src/components/layout/Navbar.tsx`**

```tsx
'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from '@/navigation'

export default function Navbar() {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  function toggleLocale() {
    router.replace(pathname, { locale: t('language').toLowerCase() as 'en' | 'pt' })
  }

  const links = [
    { label: t('home'), href: '#hero' },
    { label: t('about'), href: '#about' },
    { label: t('portfolio'), href: '#portfolio' },
    { label: t('contact'), href: '#contact' },
  ]

  return (
    <header className="absolute top-0 left-0 right-0 z-50 px-[146px] py-[55px] flex items-center justify-between">
      {/* Logo */}
      <a href="#hero" className="relative h-10 w-[191px] flex-shrink-0">
        <Image
          src="/images/logo.png"
          alt="Prosperium"
          fill
          className="object-contain object-left"
          priority
        />
      </a>

      {/* Desktop nav links */}
      <nav className="hidden md:flex items-center gap-8">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-[#212121] text-base font-normal hover:text-primary transition-colors"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Language toggle */}
      <button
        onClick={toggleLocale}
        className="hidden md:flex items-center gap-2 border border-[#212121] rounded-[40px] px-4 h-[41px] text-[#212121] text-[20px] font-normal hover:bg-[#21212110] transition-colors"
        aria-label="Switch language"
      >
        <Image
          src="/images/flag-en.png"
          alt=""
          width={31}
          height={31}
          className="rounded-full object-cover"
        />
        <span>{t('language')}</span>
      </button>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-0.5 bg-[#212121] transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block w-6 h-0.5 bg-[#212121] transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
        <span className={`block w-6 h-0.5 bg-[#212121] transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg flex flex-col items-start px-8 py-6 gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[#212121] text-lg font-normal"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => { toggleLocale(); setMenuOpen(false) }}
            className="flex items-center gap-2 border border-[#212121] rounded-[40px] px-4 h-10 text-[#212121] text-base font-normal"
          >
            <Image src="/images/flag-en.png" alt="" width={24} height={24} className="rounded-full object-cover" />
            <span>{t('language')}</span>
          </button>
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat: add Navbar component with language toggle and mobile menu"
```

---

### Task 6: Mount Navbar and Footer in layout

**Files:**
- Modify: `src/app/[locale]/layout.tsx`

- [ ] **Step 1: Update `src/app/[locale]/layout.tsx`**

Replace the entire file with:

```tsx
import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '../../proxy'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import '../globals.css'

const urbanist = Urbanist({
  variable: '--font-urbanist',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Prosperium',
  description: 'Prosperium – Real estate investments',
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'pt' | 'en')) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} className={`${urbanist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Verify TypeScript and build**

```bash
npx tsc --noEmit && npm run build
```

Expected: build succeeds, no TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/[locale]/layout.tsx
git commit -m "feat: mount Navbar and Footer in locale layout"
```

---

### Task 7: Create Hero section

**Files:**
- Create: `src/components/home/Hero.tsx`

The hero has a background image at 10% opacity, a left column with the headline/CTA, and a right column with the building photo.

- [ ] **Step 1: Create `src/components/home/Hero.tsx`**

```tsx
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function Hero() {
  const t = useTranslations('hero')

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-[#d9d9d9]">
      {/* Full-width background at 10% opacity */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.png"
          alt=""
          fill
          className="object-cover opacity-10"
          priority
        />
      </div>

      {/* Content grid */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-[148px] flex items-center gap-8 py-32">
        {/* Left: text content */}
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-[60px] font-medium leading-tight text-[#212121] max-w-[487px]">
            {t('heading_1')}{' '}
            <span className="font-bold text-[#0e8944]">{t('heading_highlight')}</span>
            <br />
            <span className="font-bold text-[#0e8944]">{t('heading_2')}</span>
          </h1>

          <p className="text-2xl font-medium text-[#212121]">
            {t('subtitle_1')}
            <br />
            {t('subtitle_2')}
          </p>

          <a
            href="#services"
            className="inline-flex items-center justify-center w-[171px] h-[62px] rounded-[50px] bg-[#efefef] text-[#0e8944] text-2xl font-medium shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-[#e0e0e0] transition-colors"
          >
            {t('cta')}
          </a>
        </div>

        {/* Right: building image */}
        <div className="flex-1 relative h-[878px] hidden lg:block">
          <Image
            src="/images/hero-building.png"
            alt="Modern apartment building"
            fill
            className="object-contain object-left"
            priority
          />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/home/Hero.tsx
git commit -m "feat: add Hero section component"
```

---

### Task 8: Create PremiumExperience section with parallax

**Files:**
- Create: `src/components/home/PremiumExperience.tsx`

This is `"use client"` because it uses `useRef` + `useEffect` to drive the parallax scroll effect.

- [ ] **Step 1: Create `src/components/home/PremiumExperience.tsx`**

```tsx
'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function PremiumExperience() {
  const t = useTranslations('premium')
  const imgRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!imgRef.current || !sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const viewHeight = window.innerHeight
      // Only apply when section is in view
      if (rect.bottom < 0 || rect.top > viewHeight) return
      const progress = (viewHeight - rect.top) / (viewHeight + rect.height)
      const offset = (progress - 0.5) * 120
      imgRef.current.style.transform = `translateY(${offset}px)`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black"
      style={{ minHeight: '640px' }}
    >
      {/* Parallax background image */}
      <div
        ref={imgRef}
        className="absolute inset-0 scale-125 will-change-transform"
      >
        <Image
          src="/images/premium-photo.jpg"
          alt=""
          fill
          className="object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Text content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-[148px] py-24 flex items-start gap-16">
        {/* Left: title */}
        <div className="flex-shrink-0">
          <h2 className="text-[55px] font-medium text-[#efefef] leading-tight">
            {t('title_1')}
            <br />
            {t('title_2')}
          </h2>
        </div>

        {/* Right: description */}
        <p className="text-2xl font-medium text-[#efefef] max-w-[706px] mt-2">
          {t('description')}
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/home/PremiumExperience.tsx
git commit -m "feat: add PremiumExperience section with parallax scroll"
```

---

### Task 9: Create ServiceCard component

**Files:**
- Create: `src/components/home/ServiceCard.tsx`

Reusable card: title on the left, content on the right, with a top border separator.

- [ ] **Step 1: Create `src/components/home/ServiceCard.tsx`**

```tsx
type Point = {
  title: string
  body: string
}

type ServiceCardProps = {
  title: string
  intro?: string
  points: Point[]
  isFirst?: boolean
}

export default function ServiceCard({ title, intro, points, isFirst = false }: ServiceCardProps) {
  return (
    <div className={`flex gap-12 py-12 px-8 ${!isFirst ? 'border-t border-[#c0c0c0]' : ''}`}>
      {/* Left: title */}
      <div className="w-[260px] flex-shrink-0">
        <h3 className="text-[55px] font-medium text-[#212121] leading-[1.05]">
          {title.split(' ').map((word, i) => (
            <span key={i}>
              {word}
              {i < title.split(' ').length - 1 && <br />}
            </span>
          ))}
        </h3>
      </div>

      {/* Right: body */}
      <div className="flex-1 text-2xl font-medium text-[#212121] space-y-4 max-w-[767px]">
        {intro && <p>{intro}</p>}
        {points.map((point) => (
          <div key={point.title}>
            <p className="font-bold">{point.title}</p>
            <p>{point.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/home/ServiceCard.tsx
git commit -m "feat: add reusable ServiceCard component"
```

---

### Task 10: Create ServicesSection component

**Files:**
- Create: `src/components/home/ServicesSection.tsx`

Dark gradient wrapper with icon, title, subtitle, and 3 ServiceCards inside a rounded muted container.

- [ ] **Step 1: Create `src/components/home/ServicesSection.tsx`**

```tsx
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import ServiceCard from './ServiceCard'

export default function ServicesSection() {
  const t = useTranslations('services')

  const cards = [
    {
      title: t('core_strategy.title'),
      intro: t('core_strategy.intro'),
      points: [
        { title: t('core_strategy.point_1_title'), body: t('core_strategy.point_1_body') },
        { title: t('core_strategy.point_2_title'), body: t('core_strategy.point_2_body') },
        { title: t('core_strategy.point_3_title'), body: t('core_strategy.point_3_body') },
      ],
    },
    {
      title: t('investment_options.title'),
      intro: t('investment_options.intro'),
      points: [
        { title: t('investment_options.point_1_title'), body: t('investment_options.point_1_body') },
        { title: t('investment_options.point_2_title'), body: t('investment_options.point_2_body') },
        { title: t('investment_options.point_3_title'), body: t('investment_options.point_3_body') },
      ],
    },
    {
      title: t('performance_goals.title'),
      intro: undefined,
      points: [
        { title: t('performance_goals.point_1_title'), body: t('performance_goals.point_1_body') },
        { title: t('performance_goals.point_2_title'), body: t('performance_goals.point_2_body') },
        { title: t('performance_goals.point_3_title'), body: t('performance_goals.point_3_body') },
      ],
    },
  ]

  return (
    <section
      id="services"
      className="relative mx-auto rounded-[150px] py-24 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 130%, #0c7e41 0%, #1a1a1a 45%, #000000 100%)',
      }}
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-6 mb-16">
        <div className="relative w-24 h-24">
          <Image
            src="/images/services-icon.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>
        <h2 className="text-[80px] font-medium text-white leading-tight">
          {t('title')}
        </h2>
        <p className="text-2xl font-medium text-white text-center max-w-[329px]">
          {t('subtitle')}
        </p>
      </div>

      {/* Cards container */}
      <div
        className="mx-auto rounded-[143px] overflow-hidden"
        style={{
          background: 'rgba(217,217,217,0.15)',
          maxWidth: '1350px',
          mixBlendMode: 'luminosity',
        }}
      >
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
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/home/ServicesSection.tsx
git commit -m "feat: add ServicesSection with 3 ServiceCards"
```

---

### Task 11: Create CTASection component

**Files:**
- Create: `src/components/home/CTASection.tsx`

Dark radial gradient background, centered heading, subtitle, and gold gradient button.

- [ ] **Step 1: Create `src/components/home/CTASection.tsx`**

```tsx
import { useTranslations } from 'next-intl'

export default function CTASection() {
  const t = useTranslations('cta')

  return (
    <section
      className="relative py-32 flex flex-col items-center justify-center text-center px-8"
      style={{
        background: 'radial-gradient(ellipse at 50% 100%, #212121 0%, #111111 40%, #000000 100%)',
        minHeight: '722px',
      }}
    >
      <h2 className="text-[80px] font-medium text-white leading-tight max-w-[604px] mb-8">
        {t('heading')}
      </h2>

      <p className="text-2xl font-medium text-[#efefef] max-w-[537px] mb-16">
        {t('subtitle')}
      </p>

      <a
        href="#contact"
        className="inline-flex items-center justify-center h-[62px] px-10 rounded-[50px] text-2xl font-medium text-white hover:opacity-90 transition-opacity"
        style={{
          background: 'linear-gradient(to right, #be9339 19%, #e4d488 84%)',
          minWidth: '216px',
        }}
      >
        {t('button')}
      </a>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/home/CTASection.tsx
git commit -m "feat: add CTASection with gold gradient button"
```

---

### Task 12: Compose page.tsx with all sections

**Files:**
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Replace `src/app/[locale]/page.tsx` entirely**

```tsx
import Hero from '@/components/home/Hero'
import PremiumExperience from '@/components/home/PremiumExperience'
import ServicesSection from '@/components/home/ServicesSection'
import CTASection from '@/components/home/CTASection'

export default function Home() {
  return (
    <>
      <Hero />
      <PremiumExperience />
      <ServicesSection />
      <CTASection />
    </>
  )
}
```

- [ ] **Step 2: Verify TypeScript and build**

```bash
npx tsc --noEmit && npm run build
```

Expected: build succeeds, routes `/pt` and `/en` listed, no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/[locale]/page.tsx
git commit -m "feat: compose home page with all sections"
```

---

### Task 13: Visual verification

**Files:** none

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

- [ ] **Step 2: Verify `/pt` route**

Open `http://localhost:3000/pt`. Check:
- Navbar visible with links in Portuguese (INÍCIO, SOBRE, etc.)
- Language toggle shows "EN" (to switch to English)
- Hero has heading with "Investimentos" in green
- Hero building image visible on desktop
- PremiumExperience section visible with photo background
- Parallax: scroll slowly and confirm background image moves slower than text
- "Nossos Serviços" section with gradient background
- 3 cards (Estratégia Central, Opções de Investimento, Metas de Desempenho)
- CTA section "Pronto para investir no seu futuro?"
- Footer "© 2026 Prosperium"

- [ ] **Step 3: Verify `/en` route**

Open `http://localhost:3000/en`. Check same sections in English.

- [ ] **Step 4: Verify language toggle**

On `/pt`, click the language button — should navigate to `/en` and vice-versa.

- [ ] **Step 5: Verify mobile layout**

Resize to 375px width. Check:
- Hamburger menu appears
- Nav links hidden
- Menu opens/closes on tap
- Hero text readable, image hidden on mobile

- [ ] **Step 6: Kill dev server and verify production build**

```bash
npm run build
```

Expected: clean build, no warnings.
