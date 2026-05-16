# About Page Corrections — Design Spec

**Date:** 2026-05-16  
**Scope:** 4 isolated bug fixes to the `/about` page to match the Figma design (node `2036:142`).  
**File:** `nphWq5KdcLEEDvwGeMyO89`

---

## 1. AboutHero — image não aparece (mask quebrada)

**File:** `src/components/about/AboutHero.tsx`

### Diagnóstico
`about-mask.png` é na verdade um arquivo SVG renomeado como `.png`. O CSS `mask-image: url(...)` não processa SVG com extensão `.png`, então a máscara oculta tudo — a imagem `abou.png` simplesmente não aparece.

### Fix
Remover a abordagem de CSS mask completamente. A seção já tem `overflow-hidden`, então o clipping retangular é garantido. Usar apenas:
- `<Image fill className="object-cover">` com `src="/images/about/abou.png"` posicionado `absolute inset-0`
- Gradient overlay `bg-gradient-to-t from-[#042311] to-transparent` sobre a imagem
- Manter altura mínima de `625px` e o texto em `absolute bottom-left` com padding `px-[148px] pb-24`

O resultado visual corresponde ao Figma: foto paisagem preenchendo a seção, gradient verde escuro emergindo da base, texto branco no canto inferior esquerdo.

---

## 2. FilterChip — "Proven Results" sempre dourado (sem hover)

**File:** `src/components/about/WhyInvestSection.tsx` + `src/components/about/FilterChip.tsx`

### Diagnóstico
`useState(0)` inicia com o primeiro chip sempre ativo, aplicando o gradient dourado permanentemente. O usuário quer que o gradient só apareça no hover, sem estado persistente de seleção.

Os chips também não alteram nenhum conteúdo abaixo deles (os 4 cards são sempre mostrados), então o estado `activeChip` é desnecessário.

### Fix
- Em `WhyInvestSection`: remover `useState` e o prop `isActive`; remover `onClickAction`
- Em `FilterChip`: remover props `isActive` e `onClickAction`; transformar em elemento puramente visual com hover CSS
- Classe do botão: sempre `border border-white bg-transparent` + `hover:bg-gradient-to-r hover:from-[#be9339] hover:to-[#e4d488] hover:border-transparent`
- Cursor permanece `cursor-default` (sem comportamento de clique) — ou manter botão mas sem state

---

## 3. ProsperumAdvantage — vídeo não carrega

**File:** `src/components/about/ProsperumAdvantage.tsx`

### Diagnóstico
O `src` do `<video>` aponta para `/videos/advantage.mp4`, mas o diretório `/public/videos/` não existe. O arquivo real está em `/public/images/about/green gradiente.mp4`.

### Fix
Atualizar o atributo `src` do `<video>` para `/images/about/green%20gradiente.mp4` (espaço encodado para URL válida).

O vídeo já tem `autoPlay muted loop playsInline` — comportamento correto para loop de fundo.

---

## 4. PartnersSection — sem Swiper real (botões manuais sem animação)

**File:** `src/components/about/PartnersSection.tsx`

### Diagnóstico
A implementação atual usa `useState` com `prev()`/`next()` que simplesmente troca o card instantaneamente sem animação e sem auto-play. Com apenas 1 parceiro os botões ficam desabilitados o tempo todo.

### Fix
Instalar `swiper` e reescrever `PartnersSection` usando os módulos `Navigation` e `Autoplay`:

**Instalação:** `npm install swiper`

**Implementação:**
- Usar `<Swiper>` do pacote `swiper/react` com módulos `Navigation` + `Autoplay`
- `autoplay={{ delay: 4000, disableOnInteraction: false }}`
- `loop={true}` para loop infinito mesmo com 1 card
- Custom arrows: manter as imagens `arrow-prev.png` / `arrow-next.png` existentes, referenciar via `navigation={{ prevEl: refPrev, nextEl: refNext }}`
- Cada `PartnerCard` dentro de `<SwiperSlide>`
- Importar CSS do Swiper: `import 'swiper/css'`

**Estrutura visual preservada:** card de `1009x518px`, arredondado, fundo `rgba(217,217,217,0.2)`, arrows nas laterais — idêntico ao Figma.

---

## Arquivos Envolvidos

| Arquivo | Tipo de mudança |
|---|---|
| `src/components/about/AboutHero.tsx` | Refactor (remove mask, simplifica image) |
| `src/components/about/FilterChip.tsx` | Refactor (remove state, hover-only) |
| `src/components/about/WhyInvestSection.tsx` | Refactor (remove useState de chips) |
| `src/components/about/ProsperumAdvantage.tsx` | Fix (src do video) |
| `src/components/about/PartnersSection.tsx` | Rewrite (Swiper) |
| `package.json` | Adicionar `swiper` |

## Sem mudanças em

- i18n (nenhuma string nova)
- Outros componentes da página about (`PillarsSection`, `InvestCard`, `PillarCard`)
- Layout, roteamento ou qualquer outro arquivo

---

## Critérios de Aceite

1. Hero exibe a foto `abou.png` com gradient verde escuro emergindo da base
2. Chips de filtro não ficam dourados por padrão — só no hover
3. Vídeo de fundo em `ProsperumAdvantage` carrega e faz loop
4. `PartnersSection` transiciona automaticamente a cada 4s, e as setas prev/next funcionam com animação
