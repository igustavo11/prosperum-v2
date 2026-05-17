"use client";

import { useTranslations } from "next-intl";

export default function ProsperumAdvantage() {
  const t = useTranslations("about.advantage");

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "474px" }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/images/about/gradiente.mp4"
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-[148px] py-24 flex items-start gap-16">
        <div className="shrink-0">
          <h2
            className="text-[60px] mt-8
            font-medium text-white leading-tight"
          >
            {t("title_line1")}
            <br />
            {t("title_line2")}
          </h2>
        </div>

        <p className="text-[24px] font-medium text-[#efefef] max-w-[706px] mt-2">
          {t("description")}
        </p>
      </div>
    </section>
  );
}
