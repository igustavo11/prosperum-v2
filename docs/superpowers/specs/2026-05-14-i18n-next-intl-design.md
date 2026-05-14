# i18n com next-intl — Design

**Data:** 2026-05-14
**Status:** Aprovado

## Objetivo

Adicionar suporte a internacionalização (pt/en) com roteamento baseado em prefixo de URL e detecção automática de idioma via `Accept-Language`.

## Decisões

- **Biblioteca:** `next-intl`
- **Idiomas suportados:** `pt` (padrão/fallback), `en`
- **Estratégia de URL:** prefixo de locale — `/pt/...`, `/en/...`
- **Detecção:** middleware lê `Accept-Language` e redireciona `/` para o locale adequado

## Estrutura de arquivos

```
src/
  app/
    [locale]/
      layout.tsx       — carrega mensagens + NextIntlClientProvider
      page.tsx         — home page com useTranslations()
  messages/
    pt.json
    en.json
  i18n/
    request.ts         — getRequestConfig com locale e mensagens
middleware.ts          — createMiddleware do next-intl
```

## Roteamento

- Raiz `/` → middleware detecta locale → redireciona para `/pt` ou `/en`
- Fallback: `pt` quando `Accept-Language` não bate com nenhum locale suportado
- `src/app/layout.tsx` e `src/app/page.tsx` atuais são movidos para `src/app/[locale]/`

## Traduções

Arquivos JSON em `src/messages/`. Estrutura por namespace:

```json
// pt.json
{ "home": { "title": "Bem-vindo" } }

// en.json
{ "home": { "title": "Welcome" } }
```

## Uso nos componentes

```tsx
// Server Component
import { useTranslations } from 'next-intl'

export default function Page() {
  const t = useTranslations('home')
  return <h1>{t('title')}</h1>
}
```

## Fora do escopo

- Persistência de preferência de idioma em cookie/localStorage
- Mais de 2 idiomas
- Tradução de metadados SEO (pode ser adicionado depois via `generateMetadata`)
