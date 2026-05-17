"use client";

import { useTranslations } from "next-intl";

export default function ContactHero() {
  const t = useTranslations("contact.hero");

  return (
    <section className="relative h-[560px] md:h-[625px] overflow-hidden bg-[#052e1a]">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/images/about/gradiente.mp4"
      />

      {/* Content */}
      <div className="relative z-10 px-14 pt-[236px] md:px-[199px] md:pt-[252px]">
        <h1 className="text-[62px] md:text-[80px] font-medium text-white leading-[1.04] md:leading-tight">
          {t("title_line1")}
          <br />
          {t("title_line2")}
        </h1>
      </div>
    </section>
  );
}
