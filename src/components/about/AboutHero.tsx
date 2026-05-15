"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function AboutHero() {
  const t = useTranslations("about.hero");

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "625px" }}
    >
      {/* Photo with mask */}
      <div
        className="absolute inset-0"
        style={{
          maskImage: "url('/images/about/about-mask.png')",
          maskSize: "cover",
          maskRepeat: "no-repeat",
          maskPosition: "center",
        }}
      >
        <Image
          src="/images/about/about-bg.jpg"
          alt=""
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Dark green gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#042311] to-transparent" />

      {/* Content */}
      <div className="relative z-10 px-[148px] pt-[262px] pb-24">
        <h1 className="text-[80px] font-medium text-white leading-tight max-w-[892px]">
          {t("title_line1")}
          <br />
          {t("title_line2")}
        </h1>
      </div>
    </section>
  );
}
