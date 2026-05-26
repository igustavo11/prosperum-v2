"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { AnimatedSection } from "@/lib/animations/AnimatedSection";

export default function WhoWeAreHero() {
  const t = useTranslations("who_we_are.hero");

  return (
    <section className="relative overflow-hidden min-h-[400px] md:min-h-[625px]">
      <Image
        src="/images/who-we-are/bg-who.png"
        alt=""
        fill
        sizes="100vw"
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 z-10 bg-[lightgray]/20" />

      <div className="relative z-20 flex flex-col items-center justify-center text-center px-6 md:px-[148px] pt-[177px] md:pt-[262px] pb-24 gap-6">
        <AnimatedSection variant="fadeInUp" delay={0}>
          <h1 className="text-[60px] md:text-[120px] font-medium text-white leading-none">
            {t("title")}
          </h1>
        </AnimatedSection>

        <AnimatedSection variant="fadeInUp" delay={0.15}>
          <p className="text-[16px] md:text-[22px] font-medium text-white/75 max-w-[700px] leading-relaxed">
            {t("subtitle")}
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
