import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AboutHero from "@/components/about/AboutHero";
import PartnersSection from "@/components/about/PartnersSection";
import PillarsSection from "@/components/about/PillarsSection";
import ProsperumAdvantage from "@/components/about/ProsperumAdvantage";
import WhyInvestSection from "@/components/about/WhyInvestSection";
import {
  buildAlternates,
  buildBreadcrumbLd,
  buildFaqLd,
  buildOG,
  FAQ_DATA,
  SITE_URL,
} from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t("about_title");
  const description = t("about_description");

  return {
    title,
    description,
    alternates: buildAlternates(locale, "/about"),
    openGraph: buildOG(title, description, locale, "/about"),
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const faqs = FAQ_DATA[locale] ?? FAQ_DATA.en;

  const breadcrumbLd = buildBreadcrumbLd([
    { name: "Home", url: `${SITE_URL}/${locale}` },
    { name: "About", url: `${SITE_URL}/${locale}/about` },
  ]);

  return (
    <div className="bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqLd(faqs)) }}
      />
      <AboutHero />
      <PillarsSection />
      <WhyInvestSection />
      <ProsperumAdvantage />
      <PartnersSection />
    </div>
  );
}
