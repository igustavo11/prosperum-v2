import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Disclaimer from "@/components/portfolio/Disclaimer";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import PortfolioHero from "@/components/portfolio/PortfolioHero";
import { properties } from "@/data/properties";
import { buildAlternates, buildCollectionLd, buildOG } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t("portfolio_title");
  const description = t("portfolio_description");

  return {
    title,
    description,
    alternates: buildAlternates(locale, "/portfolio"),
    openGraph: buildOG(title, description, locale, "/portfolio"),
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function PortfolioPage({ params }: Props) {
  const { locale } = await params;
  const collectionLd = buildCollectionLd(properties, locale);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />
      <PortfolioHero />
      <PortfolioGrid />
      <Disclaimer />
    </div>
  );
}
