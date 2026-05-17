"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function PortfolioHero() {
  const t = useTranslations("portfolio.hero");

  return (
    <section className="relative overflow-hidden min-h-[400px] md:min-h-[800px]">
      <Image
        src="/images/portfolio/hero.jpg"
        alt=""
        fill
        sizes="100vw"
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.25)] to-[rgba(0,0,0,0.79)]" />
      <div className="relative z-10 px-6 pt-[180px] md:px-[148px] md:pt-[287px] flex justify-center md:justify-start">
        <h1 className="font-['Urbanist'] font-medium text-[48px] md:text-[130px] text-white leading-none">
          {t("title")}
        </h1>
      </div>
    </section>
  );
}
