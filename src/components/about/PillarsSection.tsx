"use client";

import { useTranslations } from "next-intl";
import PillarCard from "./PillarCard";

export default function PillarsSection() {
  const t = useTranslations("about.pillars");

  const pillars = [
    {
      title: t("mission_title"),
      description: t("mission_description"),
      iconSrc: "/images/about/pillar-mission.png",
      bgColor: "rgba(11, 154, 77, 0.8)",
      desktopOffsetClass: "md:ml-[143px] md:w-[calc(104vw-143px)]",
      mobileAlign: "left" as const,
      iconWidth: 167,
      iconHeight: 141,
      descMaxWidth: 775,
    },
    {
      title: t("strategy_title"),
      description: t("strategy_description"),
      iconSrc: "/images/about/pillar-strategy.png",
      bgColor: "rgba(78, 222, 114, 0.8)",
      desktopOffsetClass: "md:ml-[303px] md:w-[calc(115vw-303px)]",
      mobileAlign: "right" as const,
      iconWidth: 146,
      iconHeight: 165,
      descMaxWidth: 724,
    },
    {
      title: t("principles_title"),
      description: t("principles_description"),
      iconSrc: "/images/about/pillar-principles.png",
      bgColor: "rgba(159, 255, 183, 0.8)",
      desktopOffsetClass: "md:ml-[505px] md:w-[calc(130vw-505px)]",
      mobileAlign: "left" as const,
      iconWidth: 168,
      iconHeight: 168,
      descMaxWidth: 627,
    },
  ];

  return (
    <section
      className="relative overflow-hidden py-16 md:py-24"
      style={{
        background:
          "radial-gradient(ellipse at 50% 100%, #767676 0%, #5d5d5d 25%, #434343 50%, #2a2a2a 75%, #1d1d1d 87.5%, #101010 100%)",
      }}
    >
      <h2 className="text-[40px] md:text-[80px] font-medium text-white text-center mb-8 md:mb-16">
        {t("title")}
      </h2>

      <div className="flex flex-col gap-8">
        {pillars.map((pillar) => (
          <PillarCard key={pillar.title} {...pillar} />
        ))}
      </div>
    </section>
  );
}
