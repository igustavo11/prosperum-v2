@AGENTS.md

## Stack

- Next.js 16 (App Router) + React 19
- TypeScript
- Tailwind CSS v4
- Biome (linter + formatter, 2 spaces, sem ESLint/Prettier)
- next-intl v4 (i18n)
- shadcn/ui + Radix UI
- Swiper (carrossel)
- lucide-react (ícones)

## Estrutura

```
src/
  app/[locale]/         # rotas por locale (pt, en)
    layout.tsx          # layout raiz com NextIntlClientProvider
    page.tsx            # home
    about/page.tsx      # /about
  components/
    home/               # componentes da home
    about/              # componentes da about
    layout/             # Navbar, Footer
    ui/                 # primitivos shadcn
  messages/
    pt.json             # strings PT
    en.json             # strings EN
  i18n/request.ts       # configuração next-intl
  navigation.ts         # helpers de roteamento com locale
  proxy.ts              # proxy next-intl
  lib/utils.ts          # cn() e utilitários
```

## Convenções

### i18n
- Todo texto de UI passa por `next-intl` — sem strings hardcoded em componentes
- Strings ficam em `src/messages/pt.json` e `src/messages/en.json` (sempre atualizar os dois)
- Componentes client usam `useTranslations(namespace)`, server usam `getTranslations(namespace)`
- Conteúdo é estático — sem CMS, sem API de conteúdo

### Componentes
- Todos os componentes são `"use client"` por padrão
- Server Components só se explicitamente justificado (ex: metadata, layout raiz)
- Organizar por página: `components/home/`, `components/about/`, etc.
- `useTranslations` funciona em client components pois `NextIntlClientProvider` envolve o app no layout

### Linting / Formatação
- Usar `biome check` para lint, `biome format --write` para formatar
- Indentação: 2 espaços
- Não usar ESLint nem Prettier

### Comandos úteis
```bash
npm run dev       # servidor de desenvolvimento
npm run build     # build de produção
npm run lint      # biome check
npm run format    # biome format --write
```
