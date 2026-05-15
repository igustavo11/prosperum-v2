# About Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar a página `/about` com 5 seções isoladas — Hero, Pilares, Por Que Investir, Vantagem (vídeo), Parceiros — todas `"use client"`, todas com traduções via `next-intl`.

**Architecture:** Cada seção é um componente independente em `src/components/about/`. Sub-componentes (`PillarCard`, `FilterChip`, `InvestCard`, `PartnerCard`) recebem strings já traduzidas como props. Estado interativo (`useState`) fica nos componentes pai de cada seção. O `page.tsx` da rota apenas monta as seções em sequência.

**Tech Stack:** Next.js (App Router), TypeScript, Tailwind CSS, next-intl (`useTranslations`), Next.js `<Image>`.

---

## Mapa de Arquivos

| Ação | Arquivo |
|------|---------|
| Criar | `public/images/about/` (diretório + 11 assets) |
| Modificar | `src/messages/pt.json` — adicionar namespace `"about"` |
| Modificar | `src/messages/en.json` — adicionar namespace `"about"` |
| Criar | `src/components/about/AboutHero.tsx` |
| Criar | `src/components/about/PillarCard.tsx` |
| Criar | `src/components/about/PillarsSection.tsx` |
| Criar | `src/components/about/FilterChip.tsx` |
| Criar | `src/components/about/InvestCard.tsx` |
| Criar | `src/components/about/WhyInvestSection.tsx` |
| Criar | `src/components/about/ProsperumAdvantage.tsx` |
| Criar | `src/components/about/PartnerCard.tsx` |
| Criar | `src/components/about/PartnersSection.tsx` |
| Criar | `src/app/[locale]/about/page.tsx` |

---

## Task 1: Download dos Assets do Figma

**Files:**
- Create: `public/images/about/` (diretório com 11 arquivos)

- [ ] **Step 1: Criar diretório**

```bash
mkdir -p public/images/about
```

- [ ] **Step 2: Baixar todos os assets**

```bash
curl -L "https://www.figma.com/api/mcp/asset/969a84fa-1526-46b4-81cc-0b02806a6745" -o public/images/about/about-mask.png
curl -L "https://www.figma.com/api/mcp/asset/b1a34e7d-ef8a-49fb-b4db-87a716024940" -o public/images/about/about-bg.jpg
curl -L "https://www.figma.com/api/mcp/asset/92479bd4-8202-45a8-be82-5dc8859aa2a7" -o public/images/about/pillar-mission.png
curl -L "https://www.figma.com/api/mcp/asset/8cda0f86-308e-4bac-beab-921453aa4f79" -o public/images/about/pillar-strategy.png
curl -L "https://www.figma.com/api/mcp/asset/caf96012-aefc-4608-9602-eafbbaeb8124" -o public/images/about/pillar-principles.png
curl -L "https://www.figma.com/api/mcp/asset/1e16a1c1-ec0c-4293-b6f8-ca4f1c84c8b6" -o public/images/about/icon-check.png
curl -L "https://www.figma.com/api/mcp/asset/afd29f55-b08c-4d6d-9563-9fcac26b9486" -o public/images/about/icon-growth.png
curl -L "https://www.figma.com/api/mcp/asset/0905c14f-af87-4d45-a3cb-18a7cbeea783" -o public/images/about/icon-shield.png
curl -L "https://www.figma.com/api/mcp/asset/3b4cd985-0e5f-4667-a38e-130cd86ca369" -o public/images/about/partner-forca-builders.png
curl -L "https://www.figma.com/api/mcp/asset/0b366b4c-ed2f-4b51-a96c-dd397a8ae02e" -o public/images/about/arrow-next.png
curl -L "https://www.figma.com/api/mcp/asset/8a67d03d-2812-4d05-991f-9ec9e48885d3" -o public/images/about/arrow-prev.png
```

- [ ] **Step 3: Verificar que os arquivos existem**

```bash
ls -lh public/images/about/
```

Esperado: 11 arquivos, nenhum com 0 bytes.

- [ ] **Step 4: Commit**

```bash
git add public/images/about/
git commit -m "feat: add about page image assets"
```

---

## Task 2: Strings i18n — `pt.json` e `en.json`

**Files:**
- Modify: `src/messages/pt.json`
- Modify: `src/messages/en.json`

- [ ] **Step 1: Adicionar namespace `"about"` em `pt.json`**

Abrir `src/messages/pt.json` e adicionar antes do `}` final:

```json
,
  "about": {
    "hero": {
      "title_line1": "Transformando",
      "title_line2": "Investimentos Imobiliários"
    },
    "pillars": {
      "title": "Nossos Pilares",
      "mission_title": "Missão",
      "mission_description": "O que nos diferencia é nossa capacidade de combinar inovação com precisão. Na Prosperium, somos dedicados não apenas ao desenvolvimento de propriedades imobiliárias excepcionais, mas também à criação de parcerias duradouras com nossos investidores.",
      "strategy_title": "Estratégia",
      "strategy_description": "O que nos diferencia é nossa capacidade de combinar inovação com precisão. Na Prosperium, somos dedicados não apenas ao desenvolvimento de propriedades imobiliárias excepcionais, mas também à criação de parcerias duradouras com nossos investidores.",
      "principles_title": "Princípios",
      "principles_description": "O que nos diferencia é nossa capacidade de combinar inovação com precisão. Na Prosperium, somos dedicados não apenas ao desenvolvimento de propriedades imobiliárias excepcionais, mas também à criação de parcerias duradouras com nossos investidores."
    },
    "why_invest": {
      "title": "Por Que Investir com a Prosperium?",
      "subtitle": "Investir com a Prosperium oferece mais do que retornos financeiros — oferece acesso a uma equipe de especialistas apaixonados pelo desenvolvimento imobiliário e comprometidos em criar valor de longo prazo para os investidores.",
      "chip_proven_results": "Resultados Comprovados",
      "chip_sustainable_growth": "Crescimento Sustentável",
      "chip_secure_investments": "Investimentos Seguros",
      "expertise_title": "Expertise e Experiência",
      "expertise_highlight": "Seja uma referência fazendo a coisa certa do jeito certo!",
      "expertise_description": "Nossa equipe é formada por veteranos do setor com décadas de experiência em investimento, desenvolvimento e construção imobiliária. Trazemos conhecimento profundo e um histórico de sucesso para cada projeto.",
      "track_record_title": "Histórico Comprovado",
      "track_record_description": "Com múltiplos projetos concluídos com sucesso e em andamento, a Prosperium cumpriu consistentemente suas promessas, alcançando retornos sólidos para seus investidores.",
      "quality_title": "Compromisso com a Qualidade",
      "quality_description": "Do design à execução, garantimos que cada projeto atenda aos mais altos padrões de qualidade, durabilidade e sustentabilidade. Esse compromisso aumenta o valor das nossas propriedades e garante lucratividade de longo prazo.",
      "communication_title": "Comunicação Transparente e Aberta",
      "communication_description": "Fornecemos relatórios regulares e detalhados de cada projeto, garantindo que nossos investidores estejam sempre informados e possam tomar decisões com confiança."
    },
    "advantage": {
      "title_line1": "A Vantagem",
      "title_line2": "Prosperium",
      "description": "O que realmente nos diferencia é nossa capacidade de combinar inovação com precisão. Na Prosperium, somos dedicados não apenas ao desenvolvimento de propriedades imobiliárias excepcionais, mas também à criação de parcerias duradouras com nossos investidores. Nosso foco em sustentabilidade, impacto comunitário e execução superior de projetos impulsiona nosso sucesso."
    },
    "partners": {
      "title": "Nossos Parceiros",
      "visit_website": "Visitar Site",
      "forca_builders_name": "Força Builders",
      "forca_builders_description": "Investir com a Prosperium oferece mais do que retornos financeiros — oferece acesso a uma equipe de especialistas apaixonados pelo desenvolvimento imobiliário e comprometidos em criar valor de longo prazo para os investidores."
    }
  }
```

- [ ] **Step 2: Adicionar namespace `"about"` em `en.json`**

Abrir `src/messages/en.json` e adicionar antes do `}` final:

```json
,
  "about": {
    "hero": {
      "title_line1": "Transforming",
      "title_line2": "Real Estate Investments"
    },
    "pillars": {
      "title": "Our Pillars",
      "mission_title": "Mission",
      "mission_description": "What truly sets us apart is our ability to combine innovation with precision. At Prosperium, we are dedicated to not only developing exceptional real estate properties but also creating lasting partnerships with our investors.",
      "strategy_title": "Strategy",
      "strategy_description": "What truly sets us apart is our ability to combine innovation with precision. At Prosperium, we are dedicated to not only developing exceptional real estate properties but also creating lasting partnerships with our investors.",
      "principles_title": "Principles",
      "principles_description": "What truly sets us apart is our ability to combine innovation with precision. At Prosperium, we are dedicated to not only developing exceptional real estate properties but also creating lasting partnerships with our investors."
    },
    "why_invest": {
      "title": "Why Invest with Prosperum?",
      "subtitle": "Investing with Prosperum offers more than just financial returns—it offers access to a team of experts who are passionate about real estate development and committed to creating long-term value for investors. Here's why we stand out:",
      "chip_proven_results": "Proven Results",
      "chip_sustainable_growth": "Sustainable Growth",
      "chip_secure_investments": "Secure Investments",
      "expertise_title": "Expertise and Experience",
      "expertise_highlight": "Be a reference by doing the right thing the right way!",
      "expertise_description": "Our team consists of industry veterans with decades of experience in real estate investment, development, and construction. We bring a wealth of knowledge and a track record of success to every project.",
      "track_record_title": "Proven Track Record",
      "track_record_description": "With multiple successful projects completed and in the pipeline, Prosperum has consistently delivered on its promises, achieving strong returns for its investors.",
      "quality_title": "Commitment to Quality",
      "quality_description": "From design to execution, we ensure that every project meets the highest standards of quality, durability, and sustainability. This commitment enhances the value of our properties and ensures long-term profitability for our investors.",
      "communication_title": "Transparent and Open Communication",
      "communication_description": "We provide regular, detailed reports and updates on each project, ensuring that our investors are always informed and can make decisions with confidence."
    },
    "advantage": {
      "title_line1": "The Prosperum",
      "title_line2": "Advantage",
      "description": "What truly sets us apart is our ability to combine innovation with precision. At Prosperium, we are dedicated to not only developing exceptional real estate properties but also creating lasting partnerships with our investors. Our focus on sustainability, community impact, and superior project execution drives our success and ensures that we continue to outperform the market."
    },
    "partners": {
      "title": "Our Partners",
      "visit_website": "Visit Website",
      "forca_builders_name": "Força Builders",
      "forca_builders_description": "Investing with Prosperum offers more than just financial returns—it offers access to a team of experts who are passionate about real estate development and committed to creating long-term value for investors. Here's why we stand out:"
    }
  }
```

- [ ] **Step 3: Verificar JSON válido**

```bash
node -e "require('./src/messages/pt.json'); require('./src/messages/en.json'); console.log('JSON válido')"
```

Esperado: `JSON válido`

- [ ] **Step 4: Commit**

```bash
git add src/messages/pt.json src/messages/en.json
git commit -m "feat: add about page i18n strings (pt + en)"
```

---

## Task 3: Hero — `AboutHero.tsx`

**Files:**
- Create: `src/components/about/AboutHero.tsx`

- [ ] **Step 1: Criar o componente**

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
      {/* Foto de fundo com máscara */}
      <div
        className="absolute inset-0"
        style={{
          maskImage: "url('/images/about/about-mask.png')",
          maskSize: "cover",
          maskRepeat: "no-repeat",
          maskPosition: "center",
        }}
      >
        <Image
          src="/images/about/about-bg.jpg"
          alt=""
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Overlay gradiente verde-escuro */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#042311] to-transparent" />

      {/* Conteúdo */}
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

- [ ] **Step 2: Commit**

```bash
git add src/components/about/AboutHero.tsx
git commit -m "feat: add AboutHero component"
```

---

## Task 4: Sub-componente de Pilar — `PillarCard.tsx`

**Files:**
- Create: `src/components/about/PillarCard.tsx`

- [ ] **Step 1: Criar o componente**

```tsx
"use client";

import Image from "next/image";

type PillarCardProps = {
  title: string;
  description: string;
  iconSrc: string;
  bgColor: string;
  offsetLeft: string;
};

export default function PillarCard({
  title,
  description,
  iconSrc,
  bgColor,
  offsetLeft,
}: PillarCardProps) {
  return (
    <div
      className="relative h-[241px] rounded-[30px] flex items-center gap-8 px-8"
      style={{
        backgroundColor: bgColor,
        marginLeft: offsetLeft,
        width: `calc(100% - ${offsetLeft})`,
      }}
    >
      {/* Ícone */}
      <div className="relative flex-shrink-0 w-[167px] h-[141px]">
        <Image src={iconSrc} alt="" fill className="object-contain" />
      </div>

      {/* Texto */}
      <div className="flex flex-col gap-2">
        <h3 className="text-[40px] font-medium text-white leading-tight">
          {title}
        </h3>
        <p className="text-[24px] font-medium text-[#efefef] max-w-[775px]">
          {description}
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/about/PillarCard.tsx
git commit -m "feat: add PillarCard component"
```

---

## Task 5: Seção de Pilares — `PillarsSection.tsx`

**Files:**
- Create: `src/components/about/PillarsSection.tsx`

- [ ] **Step 1: Criar o componente**

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
      offsetLeft: "143px",
    },
    {
      title: t("strategy_title"),
      description: t("strategy_description"),
      iconSrc: "/images/about/pillar-strategy.png",
      bgColor: "rgba(78, 222, 114, 0.8)",
      offsetLeft: "303px",
    },
    {
      title: t("principles_title"),
      description: t("principles_description"),
      iconSrc: "/images/about/pillar-principles.png",
      bgColor: "rgba(159, 255, 183, 0.8)",
      offsetLeft: "505px",
    },
  ];

  return (
    <section
      className="relative overflow-hidden py-24"
      style={{
        background:
          "radial-gradient(ellipse at 50% 100%, #767676 0%, #5d5d5d 25%, #434343 50%, #2a2a2a 75%, #1d1d1d 87.5%, #101010 100%)",
      }}
    >
      <h2 className="text-[80px] font-medium text-white text-center mb-16">
        {t("title")}
      </h2>

      <div className="flex flex-col gap-8 pr-0">
        {pillars.map((pillar) => (
          <PillarCard key={pillar.title} {...pillar} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/about/PillarsSection.tsx
git commit -m "feat: add PillarsSection with staggered PillarCard layout"
```

---

## Task 6: Chip de Filtro — `FilterChip.tsx`

**Files:**
- Create: `src/components/about/FilterChip.tsx`

- [ ] **Step 1: Criar o componente**

```tsx
"use client";

import Image from "next/image";

type FilterChipProps = {
  label: string;
  iconSrc: string;
  isActive: boolean;
  onClick: () => void;
};

export default function FilterChip({
  label,
  iconSrc,
  isActive,
  onClick,
}: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={`
        group relative flex items-center gap-3 px-6 py-4 rounded-[50px] transition-all duration-200 cursor-pointer
        ${isActive
          ? "bg-gradient-to-r from-[#be9339] to-[#e4d488] border-transparent"
          : "border border-white bg-transparent hover:bg-gradient-to-r hover:from-[#be9339] hover:to-[#e4d488] hover:border-transparent"
        }
      `}
    >
      <div className="relative w-8 h-8 flex-shrink-0">
        <Image src={iconSrc} alt="" fill className="object-contain" />
      </div>
      <span className="text-[24px] font-medium text-white whitespace-nowrap">
        {label}
      </span>
    </button>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/about/FilterChip.tsx
git commit -m "feat: add FilterChip with active/hover golden gradient"
```

---

## Task 7: Card de Investimento — `InvestCard.tsx`

**Files:**
- Create: `src/components/about/InvestCard.tsx`

- [ ] **Step 1: Criar o componente**

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
        relative h-[324px] w-[594px] rounded-[50px] p-12
        bg-[rgba(217,217,217,0.2)]
        border border-transparent
        hover:border-[#bd9238] transition-colors duration-200
      "
    >
      <h3 className="text-[35px] font-bold text-white mb-4 leading-tight">
        {title}
      </h3>
      {highlight && (
        <p className="text-[20px] font-medium text-[#bd9238] mb-3">
          {highlight}
        </p>
      )}
      <p className="text-[20px] font-medium text-[#efefef] leading-snug">
        {description}
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/about/InvestCard.tsx
git commit -m "feat: add InvestCard with golden hover border"
```

---

## Task 8: Seção Por Que Investir — `WhyInvestSection.tsx`

**Files:**
- Create: `src/components/about/WhyInvestSection.tsx`

- [ ] **Step 1: Criar o componente**

```tsx
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import FilterChip from "./FilterChip";
import InvestCard from "./InvestCard";

export default function WhyInvestSection() {
  const t = useTranslations("about.why_invest");
  const [activeChip, setActiveChip] = useState(0);

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
      {/* Cabeçalho */}
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-[60px] font-medium text-white text-center mb-6">
          {t("title")}
        </h2>
        <p className="text-[24px] font-medium text-[#efefef] text-center max-w-[940px]">
          {t("subtitle")}
        </p>
      </div>

      {/* Chips */}
      <div className="flex items-center justify-center gap-6 mb-16">
        {chips.map((chip, i) => (
          <FilterChip
            key={chip.label}
            label={chip.label}
            iconSrc={chip.iconSrc}
            isActive={activeChip === i}
            onClick={() => setActiveChip(i)}
          />
        ))}
      </div>

      {/* Grid 2x2 */}
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

- [ ] **Step 2: Commit**

```bash
git add src/components/about/WhyInvestSection.tsx
git commit -m "feat: add WhyInvestSection with interactive FilterChips and InvestCard grid"
```

---

## Task 9: Seção Vantagem com Vídeo — `ProsperumAdvantage.tsx`

**Files:**
- Create: `src/components/about/ProsperumAdvantage.tsx`

- [ ] **Step 1: Criar o componente**

```tsx
"use client";

import { useTranslations } from "next-intl";

export default function ProsperumAdvantage() {
  const t = useTranslations("about.advantage");

  return (
    <section className="relative overflow-hidden" style={{ minHeight: "474px" }}>
      {/* Vídeo em loop como background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/advantage.mp4"
      />

      {/* Overlay escuro para legibilidade */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Conteúdo */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-[148px] py-24 flex items-start gap-16">
        {/* Esquerda: título */}
        <div className="flex-shrink-0">
          <h2 className="text-[60px] font-medium text-white leading-tight">
            {t("title_line1")}
            <br />
            {t("title_line2")}
          </h2>
        </div>

        {/* Direita: descrição */}
        <p className="text-[24px] font-medium text-[#efefef] max-w-[706px] mt-2">
          {t("description")}
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/about/ProsperumAdvantage.tsx
git commit -m "feat: add ProsperumAdvantage section with looping video background"
```

---

## Task 10: Sub-componente de Parceiro — `PartnerCard.tsx`

**Files:**
- Create: `src/components/about/PartnerCard.tsx`

- [ ] **Step 1: Criar o componente**

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
    <div className="flex items-center gap-12 h-full px-12">
      {/* Logo */}
      <div className="relative flex-shrink-0 w-[301px] h-[238px]">
        <Image src={logoSrc} alt={name} fill className="object-contain" />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-4">
        <h3 className="text-[35px] font-bold text-black">{name}</h3>
        <p className="text-[20px] font-medium text-[#212121] max-w-[534px]">
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

- [ ] **Step 2: Commit**

```bash
git add src/components/about/PartnerCard.tsx
git commit -m "feat: add PartnerCard component"
```

---

## Task 11: Seção de Parceiros — `PartnersSection.tsx`

**Files:**
- Create: `src/components/about/PartnersSection.tsx`

- [ ] **Step 1: Criar o componente**

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import PartnerCard from "./PartnerCard";

type Partner = {
  logoSrc: string;
  name: string;
  description: string;
  websiteUrl: string;
};

export default function PartnersSection() {
  const t = useTranslations("about.partners");
  const [activeIndex, setActiveIndex] = useState(0);

  const partners: Partner[] = [
    {
      logoSrc: "/images/about/partner-forca-builders.png",
      name: t("forca_builders_name"),
      description: t("forca_builders_description"),
      websiteUrl: "#",
    },
  ];

  const visitLabel = t("visit_website");

  const prev = () => setActiveIndex((i) => Math.max(0, i - 1));
  const next = () => setActiveIndex((i) => Math.min(partners.length - 1, i + 1));

  return (
    <section className="bg-[#d9d9d9] py-24">
      <h2 className="text-[80px] font-medium text-black text-center mb-12">
        {t("title")}
      </h2>

      {/* Carrossel */}
      <div className="relative flex items-center justify-center gap-6 px-[148px]">
        {/* Seta esquerda */}
        <button
          onClick={prev}
          disabled={activeIndex === 0}
          className="flex-shrink-0 opacity-60 hover:opacity-100 disabled:opacity-20 transition-opacity"
          aria-label="Anterior"
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

        {/* Card do parceiro ativo */}
        <div className="bg-[rgba(217,217,217,0.2)] rounded-[50px] w-[1009px] h-[518px] overflow-hidden">
          <PartnerCard
            {...partners[activeIndex]}
            visitLabel={visitLabel}
          />
        </div>

        {/* Seta direita */}
        <button
          onClick={next}
          disabled={activeIndex === partners.length - 1}
          className="flex-shrink-0 opacity-60 hover:opacity-100 disabled:opacity-20 transition-opacity"
          aria-label="Próximo"
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

- [ ] **Step 2: Commit**

```bash
git add src/components/about/PartnersSection.tsx
git commit -m "feat: add PartnersSection with carousel navigation"
```

---

## Task 12: Rota — `page.tsx`

**Files:**
- Create: `src/app/[locale]/about/page.tsx`

- [ ] **Step 1: Criar a página**

```tsx
import AboutHero from "@/components/about/AboutHero";
import PillarsSection from "@/components/about/PillarsSection";
import WhyInvestSection from "@/components/about/WhyInvestSection";
import ProsperumAdvantage from "@/components/about/ProsperumAdvantage";
import PartnersSection from "@/components/about/PartnersSection";

export default function AboutPage() {
  return (
    <div className="bg-black">
      <AboutHero />
      <PillarsSection />
      <WhyInvestSection />
      <ProsperumAdvantage />
      <PartnersSection />
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/[locale]/about/page.tsx
git commit -m "feat: add about page route assembling all sections"
```

---

## Task 13: Verificação Visual

- [ ] **Step 1: Iniciar o servidor de desenvolvimento**

```bash
npm run dev
```

- [ ] **Step 2: Navegar para a página about**

Abrir `http://localhost:3000/pt/about` e `http://localhost:3000/en/about`.

- [ ] **Step 3: Checklist visual**

| Item | PT | EN |
|------|----|----|
| Hero: imagem + gradiente verde | ☐ | ☐ |
| Pilares: 3 cards em cascata com offset crescente | ☐ | ☐ |
| Pilares: ícones visíveis em cada card | ☐ | ☐ |
| Why Invest: chips com hover dourado | ☐ | ☐ |
| Why Invest: chip clicado fica com gradiente dourado | ☐ | ☐ |
| Why Invest: grid 2x2 de cards com hover de borda dourada | ☐ | ☐ |
| Vantagem: vídeo em loop (ou fundo preto se sem vídeo) | ☐ | ☐ |
| Parceiros: card de Força Builders visível | ☐ | ☐ |
| Parceiros: setas de navegação presentes | ☐ | ☐ |
| Navbar e Footer injetados pelo layout | ☐ | ☐ |

- [ ] **Step 4: Commit final**

```bash
git add -A
git commit -m "feat: complete about page with all sections"
```
