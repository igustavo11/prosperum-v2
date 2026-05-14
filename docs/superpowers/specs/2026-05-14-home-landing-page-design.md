# Home Landing Page — Design Spec

**Data:** 2026-05-14  
**Status:** Aguardando aprovação  
**Figma:** https://www.figma.com/design/nphWq5KdcLEEDvwGeMyO89/Untitled?node-id=2008-2

---

## Visão Geral

Implementar a home page da landing page Prosperium com 6 seções distintas, componentizadas. Navbar e Footer entram no layout global (repetidos em todas as páginas). As seções da home são compostas na `page.tsx` do locale.

---

## Estrutura de Arquivos

```
src/
  components/
    layout/
      Navbar.tsx            ← logo + nav links + language switcher (EN/PT)
      Footer.tsx            ← © 2026 Prosperium
    home/
      Hero.tsx              ← heading + subtítulo + botão + imagem à direita
      PremiumExperience.tsx ← foto com parallax + texto sobreposto
      ServicesSection.tsx   ← wrapper "Our Services" com título e cards
      ServiceCard.tsx       ← card reutilizável (título à esq, corpo à dir)
      CTASection.tsx        ← "Ready to invest in your future?"
  app/
    [locale]/
      layout.tsx            ← adicionar <Navbar /> e <Footer />
      page.tsx              ← compor Hero + PremiumExperience + ServicesSection + CTASection
  messages/
    pt.json                 ← todas as strings da page
    en.json                 ← todas as strings da page
```

---

## Seção 1 — Navbar

### Visual (do Figma)
- Fundo: transparente sobre o hero
- Logo: imagem `logo branco 1` (191×40px), lado esquerdo (left: 146px)
- Links de navegação (center): HOME · ABOUT · PORTFOLIO · CONTACT — Urbanist Regular 16px, `#212121`
- Language switcher (direita): bandeira do país + texto "EN" ou "PT" + seta dropdown — borda `#212121`, border-radius 40px

### Comportamento
- **Responsivo:** em mobile (<768px) os links colapsam em hamburger menu
- **Fixo no topo** (`position: sticky`, `top: 0`) com `backdrop-blur` quando scrollado
- **Language switcher:** ao clicar, alterna entre `/pt/...` e `/en/...` (usando `usePathname` + `useRouter` do Next.js) — **não é dropdown**, apenas toggle entre os dois idiomas
- A bandeira exibida corresponde ao idioma **oposto** (ícone indica para onde vai mudar, não o atual)

### Props / Traduções
```ts
// Navbar não recebe props — lê locale do contexto next-intl
// Links são fixos (HOME, ABOUT, PORTFOLIO, CONTACT)
```

---

## Seção 2 — Hero

### Visual (do Figma)
- Background: imagem de edifício com `opacity: 0.10` cobrindo toda a área
- **Esquerda:**
  - Heading 60px Urbanist Medium: `"Our passion for real estate is the secret to your"` em `#212121` + `"success"` em `#0e8944` bold + `"Investments"` em `#0e8944` bold (linha separada)
  - Subtítulo 24px: `"Transforming investments into real opportunities"` em `#212121`
  - Botão "Learn more": bg `#efefef`, texto `#0e8944` 24px, border-radius 50px, 171×62px, sombra `0 4px 4px rgba(0,0,0,0.25)`
- **Direita:** imagem `Group 2 1` (foto de edifício), posicionada parcialmente fora da tela à direita

### Responsivo
- Em mobile: imagem vai para cima, texto embaixo; imagem com `aspect-ratio: 16/9`
- Heading reduz para ~40px em mobile

### Traduções necessárias
```json
{
  "hero": {
    "heading_1": "Our passion for real estate is the secret to your",
    "heading_highlight": "success",
    "heading_2": "Investments",
    "subtitle_1": "Transforming investments into",
    "subtitle_2": "real opportunities",
    "cta": "Learn more"
  }
}
```

---

## Seção 3 — Premium Experience (Parallax)

### Visual (do Figma)
- Foto de fundo: grupo de pessoas de negócios se cumprimentando (foto grande, escura)
- Sobre a foto (texto claro `#efefef`):
  - Esquerda: `"Premium Experience"` 55px Urbanist Medium, duas linhas
  - Direita: parágrafo 24px descrevendo exclusividade com Carbon Partner

### Efeito Parallax
- A foto scrola mais lentamente que o conteúdo de texto
- Implementação: `position: sticky` no container + `transform: translateY()` controlado por scroll com `useEffect` + `window.scrollY` (sem biblioteca extra)
- O conteúdo (texto) está sobreposto com `position: absolute/relative` e aparece conforme o usuário scrola pela seção

### Traduções necessárias
```json
{
  "premium": {
    "title_1": "Premium",
    "title_2": "Experience",
    "description": "Exclusivity with the human touch you need. Count on a Carbon Partner and an investment advisor dedicated to your financial success."
  }
}
```

---

## Seção 4 — Services Section

### Visual (do Figma)
- Background: gradiente radial escuro (verde escuro → preto), border-radius 150px
- Topo: ícone Asset 2 1 (logo icon branco, 96×95px)
- Título: `"Our Services"` 80px Urbanist Medium, branco, centralizado
- Subtítulo: `"Discover our solutions to enhance your investments"` 24px, branco, centralizado
- Cards: área interna com `bg-[#d9d9d9] mix-blend-luminosity rounded-[143px]`, contendo 3 cards separados por linhas horizontais

### ServiceCard — estrutura (reutilizável para os 3)
- Layout: duas colunas — título à esquerda (55px, Urbanist Medium, `#212121`), corpo à direita (24px)
- Separados por linhas horizontais (`<hr>` ou `border-t`)
- Os 3 cards:

**1. Core Strategy**
- Título: "Core Strategy"
- Corpo: parágrafo intro + 3 tópicos bold (Collaboration with Experts, Efficient Project Management, Strategic Resource Allocation) com descrição

**2. Investment Options**
- Título: "Investment Options"
- Corpo: intro + 3 tópicos bold (Equity Investment, Debt Investment, Project-Specific Investments)

**3. Performance Goals**
- Título: "Performance Goals"
- Corpo: 3 tópicos bold (Target Return, Project Duration, Risk Mitigation)

### Traduções necessárias
```json
{
  "services": {
    "title": "Our Services",
    "subtitle": "Discover our solutions to enhance your investments",
    "core_strategy": { "title": "Core Strategy", "intro": "...", "point_1_title": "Collaboration with Experts", ... },
    "investment_options": { ... },
    "performance_goals": { ... }
  }
}
```

---

## Seção 5 — CTA Section

### Visual (do Figma)
- Background: gradiente radial escuro (`#212121` → `#000000`), 722px de altura
- Heading: `"Ready to invest in your future?"` 80px, branco, centralizado, max-width 604px
- Subtítulo: `"Contact us and discover how we can help transform your goals into reality."` 24px, `#efefef`, centralizado
- Botão "Contact us": gradiente dourado (`#be9339` → `#e4d488`), border-radius 50px, 216×62px, texto branco 24px

### Traduções necessárias
```json
{
  "cta": {
    "heading": "Ready to invest in your future?",
    "subtitle": "Contact us and discover how we can help transform your goals into reality.",
    "button": "Contact us"
  }
}
```

---

## Seção 6 — Footer

### Visual (do Figma)
- Background: `#dadada` (strip de 100px)
- Texto: `"© 2026 Prosperium"` Urbanist Medium 24px, `#212121`, centralizado
- Faz parte do `layout.tsx` — aparece em todas as páginas

### Traduções necessárias
```json
{
  "footer": {
    "copyright": "© 2026 Prosperium"
  }
}
```

---

## Alterações no Layout Global

`src/app/[locale]/layout.tsx` passa a incluir:
```tsx
<Navbar />
<main>{children}</main>
<Footer />
```

---

## Paleta de Cores Utilizada (do Figma)

| Uso | Valor |
|-----|-------|
| Primary green (dark) | `#0c7e41` / `#0e8944` |
| Heading / text dark | `#212121` |
| Body light | `#efefef` |
| Muted neutral | `#d9d9d9` |
| Gold gradient | `#be9339` → `#e4d488` |

---

## Assets do Figma

| Variável | URL | Uso |
|----------|-----|-----|
| `imgLogoBranco1` | `https://www.figma.com/api/mcp/asset/ee90ceb0-6446-4fc1-9fd7-02307ecb7b7e` | Navbar logo |
| `imgEstadosUnidos1` | `https://www.figma.com/api/mcp/asset/21126f1c-8418-47c4-91b4-3d8a4b994389` | Flag EN |
| `imgArrow8` | `https://www.figma.com/api/mcp/asset/d0101aed-de7b-4860-9a32-e75b18a443e0` | Seta switcher |
| `imgGroup21` | `https://www.figma.com/api/mcp/asset/fde0b95f-48f4-4290-8132-14555609c29d` | Hero building image |
| `imgNewModernApartment...` | `https://www.figma.com/api/mcp/asset/88acdaef-85be-4aa6-a8aa-6c4aea666029` | Hero background (10% opacity) |
| `imgAsset21` | `https://www.figma.com/api/mcp/asset/3cef88a6-fc87-4e39-b2f4-ea2ccfcca392` | Services section icon |
| `imgPremiumPhoto` | `https://www.figma.com/api/mcp/asset/9383565e-e8a1-433a-9df7-95a2dc55763b` | Premium Experience background |
| `imgLine1` | `https://www.figma.com/api/mcp/asset/12da5ac4-4244-49aa-b1a0-f04000b4145c` | Divisor entre cards |

---

## Decisões Técnicas

- **Sem dependências novas** — parallax com `useEffect` nativo, sem framer-motion
- **Server Components por padrão** — apenas `PremiumExperience` usa `"use client"` para o scroll hook
- **Navbar usa `"use client"`** para o language switcher (precisa de `useRouter` e `usePathname`)
- **Imagens** do Figma baixadas e servidas localmente em `public/images/` (URLs do Figma expiram em 7 dias)
- **i18n:** todas as strings passam por `useTranslations()` — nenhuma string hardcoded nos componentes

---

## Fora do Escopo

- Páginas About, Portfolio, Contact (só a Home)
- Animações de entrada (fade-in on scroll) além do parallax
- Formulário de contato real (botão "Contact us" é link por enquanto)
