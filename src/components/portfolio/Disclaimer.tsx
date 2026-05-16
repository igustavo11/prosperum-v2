"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Disclaimer() {
  const t = useTranslations("portfolio.disclaimer");

  return (
    <section className="bg-[#101010] relative z-20 pt-[100px] pb-[120px] px-[168px]">
      <div className="absolute -top-[101px] left-1/2 -translate-x-1/2 w-[203px] h-[203px]">
        <Image
          src="/images/eclipes.svg"
          alt=""
          fill
          className="object-contain"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[130px] h-[128px]">
            <Image
              src="/images/emblem-logo.png"
              alt="Prosperium"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <h2 className="font-['Urbanist'] font-medium text-[60px] text-[#efefef] leading-tight max-w-[800px] whitespace-pre-line">
        {t("title")}
      </h2>

      <p className="font-['Urbanist'] font-medium text-[24px] text-[#efefef] max-w-[613px] mt-8">
        {t("subtitle")}
      </p>

      <button
        type="button"
        className="mt-12 inline-flex items-center gap-3 bg-gradient-to-r from-[#be9339] to-[#e4d488] rounded-[50px] h-[62px] px-8 font-['Urbanist'] font-medium text-[24px] text-black"
      >
        {t("cta")}
        <ArrowRight size={20} />
      </button>
    </section>
  );
}
