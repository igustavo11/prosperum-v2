"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function PortfolioHero() {
  const t = useTranslations("portfolio.hero");

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "800px" }}
    >
      <Image
        src="/images/portfolio/hero.jpg"
        alt=""
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.25)] to-[rgba(0,0,0,0.79)]" />
      <div className="relative z-10 px-[148px] pt-[287px]">
        <h1 className="font-['Urbanist'] font-medium text-[130px] text-white leading-none">
          {t("title")}
        </h1>
      </div>
    </section>
  );
}
