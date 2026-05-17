"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";

export default function PremiumExperience() {
  const t = useTranslations("premium");
  const imgRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!imgRef.current || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      // Only apply when section is in view
      if (rect.bottom < 0 || rect.top > viewHeight) return;
      const progress = (viewHeight - rect.top) / (viewHeight + rect.height);
      const offset = (progress - 0.7) * 300;
      imgRef.current.style.transform = `translateY(${offset}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black"
      style={{ minHeight: "350px" }}
    >
      {/* Parallax background image */}
      <div
        ref={imgRef}
        className="absolute inset-0 scale-125 will-change-transform"
      >
        <Image
          src="/images/premium-paralax.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Text content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 py-16 flex flex-col gap-8 lg:px-[148px] lg:py-24 lg:flex-row lg:items-start lg:gap-16">
        {/* Left: title */}
        <div className="flex-shrink-0">
          <h2 className="text-[40px] lg:text-[55px] font-medium text-[#efefef] leading-tight">
            {t("title_1")}
            <br />
            {t("title_2")}
          </h2>
        </div>

        {/* Right: description */}
        <p className="text-xl lg:text-2xl font-medium text-[#efefef] lg:max-w-[706px] lg:mt-2">
          {t("description")}
        </p>
      </div>
    </section>
  );
}
