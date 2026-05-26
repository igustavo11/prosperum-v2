"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { AnimatedSection } from "@/lib/animations/AnimatedSection";
import PartnerCard from "./PartnerCard";

type Partner = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoSrc: string;
};

export default function PartnersGrid() {
  const t = useTranslations("who_we_are");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const viewProfileLabel = t("grid.view_profile");

  const partners: Partner[] = [
    {
      id: "p1",
      name: t("partners.p1_name"),
      role: t("partners.p1_role"),
      bio: t("partners.p1_bio"),
      photoSrc: "/images/who-we-are/jean-nunes.jpeg",
    },
    {
      id: "p2",
      name: t("partners.p2_name"),
      role: t("partners.p2_role"),
      bio: t("partners.p2_bio"),
      photoSrc: "/images/who-we-are/wendel.jpeg",
    },
    {
      id: "p3",
      name: t("partners.p3_name"),
      role: t("partners.p3_role"),
      bio: t("partners.p3_bio"),
      photoSrc: "/images/who-we-are/partner-placeholder.jpg",
    },
    {
      id: "p4",
      name: t("partners.p4_name"),
      role: t("partners.p4_role"),
      bio: t("partners.p4_bio"),
      photoSrc: "/images/who-we-are/partner-placeholder.jpg",
    },
  ];

  function handleToggle(id: string) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  return (
    <section className="bg-[#d9d9d9] py-20 md:py-28 px-5 md:px-20">
      <AnimatedSection variant="fadeInUp" delay={0}>
        <p className="text-center text-[12px] md:text-[13px] font-medium tracking-[3px] uppercase text-black/50 mb-3">
          {t("grid.label")}
        </p>
      </AnimatedSection>

      <AnimatedSection variant="fadeInUp" delay={0.08}>
        <h2 className="text-center text-[36px] md:text-[64px] font-medium text-[#212121] mb-12 md:mb-16">
          {t("grid.title")}
        </h2>
      </AnimatedSection>

      {/* Desktop */}
      <div className="hidden md:flex flex-wrap gap-3">
        {partners.map((partner, i) => (
          <PartnerCard
            key={partner.id}
            {...partner}
            isMobile={false}
            isOpen={expandedId === partner.id}
            onToggle={() => handleToggle(partner.id)}
            viewProfileLabel={viewProfileLabel}
            delay={i * 0.08}
          />
        ))}
      </div>

      {/* Mobile */}
      <div className="md:hidden flex flex-col gap-3">
        {partners.map((partner) => (
          <PartnerCard
            key={partner.id}
            {...partner}
            isMobile={true}
            isOpen={expandedId === partner.id}
            onToggle={() => handleToggle(partner.id)}
            viewProfileLabel={viewProfileLabel}
          />
        ))}
      </div>
    </section>
  );
}
