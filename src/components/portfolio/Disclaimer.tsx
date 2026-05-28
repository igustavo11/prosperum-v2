"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

export default function Disclaimer() {
  const t = useTranslations("portfolio.disclaimer");

  return (
    <section className="bg-[#101010] relative z-20 pt-16 md:pt-[100px] pb-12 md:pb-[120px] px-6 md:px-[168px]">
      <div className="absolute -top-[40px] md:-top-[101px] left-1/2 -translate-x-1/2 w-[80px] h-[80px] md:w-[203px] md:h-[203px]">
        <Image
          src="/images/eclipes.svg"
          alt=""
          fill
          className="object-contain"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[50px] h-[50px] md:w-[130px] md:h-[128px]">
            <Image
              src="/images/emblem-logo.png"
              alt="Prosperium"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <h2 className="font-['Urbanist'] font-medium text-[28px] md:text-[60px] text-[#efefef] leading-tight max-w-[800px] whitespace-pre-line">
        {t("title")}
      </h2>

      <p className="font-['Urbanist'] font-medium text-[14px] md:text-[24px] text-[#efefef] max-w-[613px] mt-8">
        {t("subtitle")}
      </p>

      <Link
        href="/contact"
        className="mt-12 inline-flex items-center gap-3 bg-gradient-to-r from-[#be9339] to-[#e4d488] rounded-[50px] h-[44px] md:h-[62px] px-6 md:px-8 font-['Urbanist'] font-medium text-[16px] md:text-[24px] text-black"
      >
        {t("cta")}
        <ArrowRight size={16} className="md:hidden" />
        <ArrowRight size={20} className="hidden md:block" />
      </Link>
    </section>
  );
}
