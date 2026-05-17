"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function AboutHero() {
  const t = useTranslations("about.hero");

  return (
    <section className="relative overflow-hidden min-h-[400px] md:min-h-[625px]">
      {/* Photo */}
      <Image
        src="/images/about/abou.png"
        alt=""
        fill
        sizes="100vw"
        priority
        className="object-cover"
      />

      {/* Dark green gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#042311] to-transparent" />

      {/* Content */}
      <div className="relative z-10 px-[43px] md:px-[148px] pt-[177px] md:pt-[262px] pb-24">
        <h1 className="text-[40px] md:text-[80px] font-medium text-white leading-tight md:max-w-[892px]">
          {t("title_line1")}
          <br />
          {t("title_line2")}
        </h1>
      </div>
    </section>
  );
}
