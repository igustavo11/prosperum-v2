"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import PartnerCard from "./PartnerCard";

type Partner = {
  logoSrc: string;
  imageSrc?: string;
  name: string;
  description: string;
  websiteUrl: string;
};

const ChevronLeft = () => (
  <svg
    width="20"
    height="37"
    viewBox="0 0 20 37"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M18 2L2 18.5L18 35"
      stroke="#be9339"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronRight = () => (
  <svg
    width="20"
    height="37"
    viewBox="0 0 20 37"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M2 2L18 18.5L2 35"
      stroke="#be9339"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function PartnersSection() {
  const t = useTranslations("about.partners");
  const [current, setCurrent] = useState(0);

  const partners: Partner[] = [
    {
      logoSrc: "/images/about/partner-forca-builders.png",
      imageSrc: "/forca.png",
      name: t("forca_builders_name"),
      description: t("forca_builders_description"),
      websiteUrl: "#",
    },
    {
      logoSrc: "/images/fernandespartens.webp",
      imageSrc: "/fernandes.png",
      name: t("fernandes_equity_name"),
      description: t("fernandes_equity_description"),
      websiteUrl: "https://fernandesequity.com/",
    },
    {
      logoSrc: "/images/elasdesignslogo.webp",
      imageSrc: "/elar.jpeg",
      name: t("elardesigns_name"),
      description: t("elardesigns_description"),
      websiteUrl: "https://www.elardesigns.com/",
    },
  ];

  const visitLabel = t("visit_website");
  const prev = () =>
    setCurrent((c) => (c - 1 + partners.length) % partners.length);
  const next = () => setCurrent((c) => (c + 1) % partners.length);

  return (
    <section className="bg-[#d9d9d9] py-16 md:py-24">
      <h2 className="text-[40px] md:text-[80px] font-medium text-black text-center mb-8 md:mb-12">
        {t("title")}
      </h2>

      {/* Mobile: 1 card at a time with arrows */}
      <div className="flex md:hidden items-center justify-center gap-4 px-4">
        <button
          type="button"
          onClick={prev}
          className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
          aria-label={t("prev")}
        >
          <ChevronLeft />
        </button>

        <PartnerCard {...partners[current]} visitLabel={visitLabel} />

        <button
          type="button"
          onClick={next}
          className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
          aria-label={t("next")}
        >
          <ChevronRight />
        </button>
      </div>

      {/* Desktop: 3 cards side by side — gap e padding conforme Figma */}
      <div className="hidden md:flex items-start justify-center gap-[14px] px-[95px]">
        {partners.map((partner) => (
          <PartnerCard
            key={partner.name}
            {...partner}
            visitLabel={visitLabel}
          />
        ))}
      </div>
    </section>
  );
}
