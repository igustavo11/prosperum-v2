import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PartnersGrid from "@/components/who-we-are/PartnersGrid";
import WhoWeAreHero from "@/components/who-we-are/WhoWeAreHero";
import {
  buildAlternates,
  buildBreadcrumbLd,
  buildOG,
  buildTeamLd,
  SITE_URL,
} from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t("who_we_are_title");
  const description = t("who_we_are_description");

  return {
    title,
    description,
    alternates: buildAlternates(locale, "/who-we-are"),
    openGraph: buildOG(title, description, locale, "/who-we-are"),
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function WhoWeArePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "who_we_are" });

  const breadcrumbLd = buildBreadcrumbLd([
    { name: "Home", url: `${SITE_URL}/${locale}` },
    { name: "Who We Are", url: `${SITE_URL}/${locale}/who-we-are` },
  ]);

  const teamLd = buildTeamLd([
    {
      name: t("partners.p1_name"),
      role: t("partners.p1_role"),
      bio: t("partners.p1_bio"),
    },
    {
      name: t("partners.p2_name"),
      role: t("partners.p2_role"),
      bio: t("partners.p2_bio"),
    },
    {
      name: t("partners.p3_name"),
      role: t("partners.p3_role"),
      bio: t("partners.p3_bio"),
    },
    {
      name: t("partners.p4_name"),
      role: t("partners.p4_role"),
      bio: t("partners.p4_bio"),
    },
  ]);

  return (
    <div className="bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teamLd) }}
      />
      <WhoWeAreHero />
      <PartnersGrid />
    </div>
  );
}
