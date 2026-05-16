"use client";

import { useTranslations } from "next-intl";
import FilterChip from "./FilterChip";
import InvestCard from "./InvestCard";

export default function WhyInvestSection() {
  const t = useTranslations("about.why_invest");

  const chips = [
    {
      label: t("chip_proven_results"),
      iconSrc: "/images/about/icon-check.png",
    },
    {
      label: t("chip_sustainable_growth"),
      iconSrc: "/images/about/icon-growth.png",
    },
    {
      label: t("chip_secure_investments"),
      iconSrc: "/images/about/icon-shield.png",
    },
  ];

  const cards = [
    {
      title: t("expertise_title"),
      highlight: t("expertise_highlight"),
      description: t("expertise_description"),
    },
    {
      title: t("track_record_title"),
      description: t("track_record_description"),
    },
    {
      title: t("quality_title"),
      description: t("quality_description"),
    },
    {
      title: t("communication_title"),
      description: t("communication_description"),
    },
  ];

  return (
    <section className="py-24">
      <div className="flex flex-col items-center mb-12 px-[148px]">
        <h2 className="text-[60px] font-medium text-white text-center mb-6">
          {t("title")}
        </h2>
        <p className="text-[24px] font-medium text-[#efefef] text-center max-w-[940px]">
          {t("subtitle")}
        </p>
      </div>

      <div className="flex items-center justify-center gap-6 mb-16 px-[148px]">
        {chips.map((chip) => (
          <FilterChip
            key={chip.label}
            label={chip.label}
            iconSrc={chip.iconSrc}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-[26px] max-w-[1220px] mx-auto">
        {cards.map((card) => (
          <InvestCard
            key={card.title}
            title={card.title}
            description={card.description}
            highlight={card.highlight}
          />
        ))}
      </div>
    </section>
  );
}
