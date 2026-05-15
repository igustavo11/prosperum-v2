@AGENTS.md

## Convenções do Projeto

### i18n
- Todo texto de UI passa por `next-intl` — sem strings hardcoded em componentes
- Strings ficam em `src/messages/pt.json` e `src/messages/en.json`
- Componentes client usam `useTranslations(namespace)`, server usam `getTranslations(namespace)`
- Conteúdo é estático (definido nos arquivos messages) — sem CMS, sem API de conteúdo

### Componentes
- Todos os componentes desta aplicação são `"use client"` por padrão
- Server Components só se explicitamente justificado (ex: metadata, layout raiz)
- `useTranslations` funciona em client components pois `NextIntlClientProvider` envolve o app no layout
