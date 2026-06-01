import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ContactForm from "@/components/contact/ContactForm";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import Navbar from "@/components/layout/Navbar";
import { buildAlternates, buildBreadcrumbLd, buildOG, SITE_URL } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t("contact_title");
  const description = t("contact_description");

  return {
    title,
    description,
    alternates: buildAlternates(locale, "/contact"),
    openGraph: buildOG(title, description, locale, "/contact"),
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;

  const breadcrumbLd = buildBreadcrumbLd([
    { name: "Home", url: `${SITE_URL}/${locale}` },
    { name: "Contact", url: `${SITE_URL}/${locale}/contact` },
  ]);

  const contactPageLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${SITE_URL}/${locale}/contact`,
    name: "Contact Prosperium",
    description:
      "Contact Prosperium Investment Group for real estate investment opportunities in New Jersey and New York.",
  };

  return (
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageLd) }}
      />
      <Navbar />
      <ContactHero />
      <section className="bg-[#d9d9d9] relative">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:pl-[199px] lg:pr-[153px]">
          <div className="relative pb-20 md:min-h-[680px]">
            <div className="pt-10 md:pt-[89px] w-full lg:w-[376px]">
              <ContactInfo />
            </div>

            <div className="mt-10 md:absolute md:top-0 md:left-[376px] md:-mt-[128px]">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
