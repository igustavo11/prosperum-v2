"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import PartnerCard from "./PartnerCard";

type Partner = {
  logoSrc: string;
  name: string;
  description: string;
  websiteUrl: string;
};

export default function PartnersSection() {
  const t = useTranslations("about.partners");
  const [activeIndex, setActiveIndex] = useState(0);

  const partners: Partner[] = [
    {
      logoSrc: "/images/about/partner-forca-builders.png",
      name: t("forca_builders_name"),
      description: t("forca_builders_description"),
      websiteUrl: "#",
    },
  ];

  const visitLabel = t("visit_website");

  const prev = () => setActiveIndex((i) => Math.max(0, i - 1));
  const next = () =>
    setActiveIndex((i) => Math.min(partners.length - 1, i + 1));

  return (
    <section className="bg-[#d9d9d9] py-24">
      <h2 className="text-[80px] font-medium text-black text-center mb-12">
        {t("title")}
      </h2>

      <div className="relative flex items-center justify-center gap-6 px-[148px]">
        {/* Prev arrow */}
        <button
          onClick={prev}
          disabled={activeIndex === 0}
          className="flex-shrink-0 opacity-60 hover:opacity-100 disabled:opacity-20 transition-opacity"
          aria-label={t("prev")}
        >
          <div className="relative w-[37px] h-[37px]">
            <Image
              src="/images/about/arrow-prev.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>
        </button>

        {/* Active partner card */}
        <div className="bg-[rgba(217,217,217,0.2)] rounded-[50px] w-[1009px] h-[518px] overflow-hidden">
          <PartnerCard
            {...partners[activeIndex]}
            visitLabel={visitLabel}
          />
        </div>

        {/* Next arrow */}
        <button
          onClick={next}
          disabled={activeIndex === partners.length - 1}
          className="flex-shrink-0 opacity-60 hover:opacity-100 disabled:opacity-20 transition-opacity"
          aria-label={t("next")}
        >
          <div className="relative w-[37px] h-[37px]">
            <Image
              src="/images/about/arrow-next.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>
        </button>
      </div>
    </section>
  );
}
