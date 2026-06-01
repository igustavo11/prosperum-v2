import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { buildOrganizationLd, SITE_URL } from "@/lib/seo";
import { routing } from "../../proxy";
import "../globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      template: "%s | Prosperium",
      default: "Prosperium",
    },
    description: t("site_description"),
    robots: { index: true, follow: true },
    openGraph: {
      siteName: "Prosperium",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      type: "website",
      images: [
        {
          url: "/images/bg-aeo.png",
          width: 1920,
          height: 1281,
          alt: "Prosperium Investment Group — Premium Real Estate NJ",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "pt" | "en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${urbanist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildOrganizationLd()),
          }}
        />
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
