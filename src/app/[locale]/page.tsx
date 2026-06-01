import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import CTASection from "@/components/home/CTASection";
import Hero from "@/components/home/Hero";
import PremiumExperience from "@/components/home/PremiumExperience";
import ServicesSection from "@/components/home/ServicesSection";
import { buildAlternates, buildFaqLd, buildOG, FAQ_DATA } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t("home_title");
  const description = t("home_description");

  return {
    title: { absolute: `${title} | Prosperium` },
    description,
    alternates: buildAlternates(locale),
    openGraph: buildOG(title, description, locale),
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const faqs = FAQ_DATA[locale] ?? FAQ_DATA.en;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqLd(faqs)) }}
      />
      <Hero />
      <div className="bg-black">
        <PremiumExperience />
        <ServicesSection />
        <CTASection />
      </div>
    </>
  );
}
