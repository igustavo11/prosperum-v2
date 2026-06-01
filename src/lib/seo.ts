import type { Metadata } from "next";
import type { Property } from "@/data/properties";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://prosperum.com";

export const COMPANY = "Prosperium Investment Group";

export const FAQ_DATA: Record<
  string,
  Array<{ question: string; answer: string }>
> = {
  en: [
    {
      question: "What investment options does Prosperium offer?",
      answer:
        "Prosperium offers three real estate investment types: Equity Investment (ownership stake with gains from appreciation and rental income), Debt Investment (fixed returns backed by real estate assets), and Project-Specific Investment (focused on individual opportunities with detailed reporting).",
    },
    {
      question: "How does equity real estate investment work at Prosperium?",
      answer:
        "Equity investors obtain a direct ownership stake in Prosperium's development projects, earning returns through property appreciation, rental income, and future sale profits — ideal for long-term capital growth.",
    },
    {
      question: "What returns can I expect from Prosperium's projects?",
      answer:
        "Prosperium's projects are structured to deliver above-market returns. Each opportunity is carefully underwritten to maximize value and minimize risk. Contact us to learn about projected returns on current offerings.",
    },
    {
      question: "Where are Prosperium's real estate projects located?",
      answer:
        "Prosperium operates primarily in New Jersey across Bergen, Essex, Union, Somerset, and Passaic counties — including Paramus, Livingston, Teaneck, Scotch Plains, Watchung, Clifton, and Upper Saddle River — with additional operations in New York.",
    },
    {
      question: "Are Prosperium's investments for accredited investors only?",
      answer:
        "Prosperium prioritizes accredited investors, giving them early access to exclusive development opportunities with full underwriting documents before public listing.",
    },
  ],
  pt: [
    {
      question: "Quais são as opções de investimento da Prosperium?",
      answer:
        "A Prosperium oferece três modalidades: Investimento em Equity (participação em projetos com ganhos por valorização e renda), Investimento em Dívida (retornos fixos garantidos por ativos imobiliários) e Investimentos por Projeto (foco em oportunidades individuais com relatórios detalhados).",
    },
    {
      question: "Como funciona o investimento em equity imobiliário na Prosperium?",
      answer:
        "No investimento em equity, o investidor obtém participação direta nos projetos de desenvolvimento da Prosperium, com ganhos por valorização do imóvel, renda de aluguel e lucros na venda futura — ideal para crescimento de capital a longo prazo.",
    },
    {
      question: "Qual o retorno esperado nos projetos da Prosperium?",
      answer:
        "Os projetos da Prosperium são estruturados para oferecer retornos acima do mercado. Cada oportunidade é cuidadosamente analisada para maximizar valor e minimizar riscos. Entre em contato para saber sobre os retornos projetados nas ofertas atuais.",
    },
    {
      question: "Onde estão localizados os projetos imobiliários da Prosperium?",
      answer:
        "A Prosperium atua principalmente em New Jersey nos condados de Bergen, Essex, Union, Somerset e Passaic — incluindo Paramus, Livingston, Teaneck, Scotch Plains, Watchung, Clifton e Upper Saddle River — com operações também em Nova York.",
    },
    {
      question:
        "Os investimentos da Prosperium são exclusivos para investidores credenciados?",
      answer:
        "A Prosperium prioriza investidores credenciados, dando-lhes acesso antecipado a oportunidades exclusivas de desenvolvimento com documentos completos de underwriting antes da divulgação pública.",
    },
  ],
};

export function buildAlternates(
  locale: string,
  path = "",
): Metadata["alternates"] {
  return {
    canonical: `${SITE_URL}/${locale}${path}`,
    languages: {
      en: `${SITE_URL}/en${path}`,
      pt: `${SITE_URL}/pt${path}`,
      "x-default": `${SITE_URL}/en${path}`,
    },
  };
}

export function buildOG(
  title: string,
  description: string,
  locale: string,
  path = "",
): NonNullable<Metadata["openGraph"]> {
  return {
    title,
    description,
    url: `${SITE_URL}/${locale}${path}`,
    siteName: "Prosperium",
    locale: locale === "pt" ? "pt_BR" : "en_US",
    type: "website",
  };
}

export function buildOrganizationLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness", "RealEstateAgent"],
        "@id": `${SITE_URL}/#organization`,
        name: COMPANY,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/images/emblem-logo.png`,
          width: 1215,
          height: 1199,
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "144 Essex St",
          addressLocality: "Rochelle Park",
          addressRegion: "NJ",
          postalCode: "07662",
          addressCountry: "US",
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          availableLanguage: ["English", "Portuguese"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Prosperium",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };
}

export function buildFaqLd(
  faqs: Array<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function buildBreadcrumbLd(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildPropertyLd(
  property: Property,
  description: string,
  locale: string,
) {
  const parts = property.location.split(", ");
  return {
    "@context": "https://schema.org",
    "@type": "ItemPage",
    name: property.title,
    description: description.split("\n")[0],
    url: `${SITE_URL}/${locale}/portfolio/${property.id}`,
    breadcrumb: buildBreadcrumbLd([
      { name: "Home", url: `${SITE_URL}/${locale}` },
      { name: "Portfolio", url: `${SITE_URL}/${locale}/portfolio` },
      {
        name: property.title,
        url: `${SITE_URL}/${locale}/portfolio/${property.id}`,
      },
    ]),
    mainEntity: {
      "@type": "Place",
      name: property.title,
      description: description.split("\n")[0],
      address: {
        "@type": "PostalAddress",
        streetAddress: parts[0] ?? property.location,
        addressLocality: parts[1] ?? "",
        addressRegion: parts[2] ?? "NJ",
        addressCountry: "US",
      },
      image: property.images.map((img) => `${SITE_URL}${img}`),
    },
  };
}

export function buildCollectionLd(properties: Property[], locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${COMPANY} — Portfolio`,
    url: `${SITE_URL}/${locale}/portfolio`,
    breadcrumb: buildBreadcrumbLd([
      { name: "Home", url: `${SITE_URL}/${locale}` },
      { name: "Portfolio", url: `${SITE_URL}/${locale}/portfolio` },
    ]),
    hasPart: properties.map((p) => {
      const parts = p.location.split(", ");
      return {
        "@type": "Place",
        name: p.title,
        url: `${SITE_URL}/${locale}/portfolio/${p.id}`,
        address: {
          "@type": "PostalAddress",
          streetAddress: parts[0] ?? p.location,
          addressLocality: parts[1] ?? "",
          addressRegion: parts[2] ?? "NJ",
          addressCountry: "US",
        },
      };
    }),
  };
}

export function buildTeamLd(
  members: Array<{ name: string; role: string; bio: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    mainEntity: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      member: members.map((m) => ({
        "@type": "Person",
        name: m.name,
        jobTitle: m.role,
        description: m.bio,
        worksFor: { "@id": `${SITE_URL}/#organization` },
      })),
    },
  };
}
