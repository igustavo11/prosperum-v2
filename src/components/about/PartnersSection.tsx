"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import PartnerCard from "./PartnerCard";

type Partner = {
  logoSrc: string;
  name: string;
  description: string;
  websiteUrl: string;
};

export default function PartnersSection() {
  const t = useTranslations("about.partners");
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const partners: Partner[] = [
    {
      logoSrc: "/images/about/partner-forca-builders.png",
      name: t("forca_builders_name"),
      description: t("forca_builders_description"),
      websiteUrl: "#",
    },
  ];

  const visitLabel = t("visit_website");

  return (
    <section className="bg-[#d9d9d9] py-24">
      <h2 className="text-[80px] font-medium text-black text-center mb-12">
        {t("title")}
      </h2>

      <div className="relative flex items-center justify-center gap-6 px-[148px]">
        {/* Prev arrow */}
        <button
          ref={prevRef}
          className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
          aria-label={t("prev")}
        >
          <svg width="20" height="37" viewBox="0 0 20 37" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 2L2 18.5L18 35" stroke="#be9339" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Swiper */}
        <div className="w-[1009px]">
          <Swiper
            modules={[Navigation, Autoplay]}
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            onSwiper={(swiper) => {
              // bind refs after mount so navigation works
              // @ts-expect-error swiper internal navigation typing
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-expect-error swiper internal navigation typing
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            className="rounded-[50px] overflow-hidden bg-[rgba(217,217,217,0.2)] border border-black/10 h-[518px]"
          >
            {partners.map((partner) => (
              <SwiperSlide key={partner.name}>
                <PartnerCard {...partner} visitLabel={visitLabel} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Next arrow */}
        <button
          ref={nextRef}
          className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
          aria-label={t("next")}
        >
          <svg width="20" height="37" viewBox="0 0 20 37" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 2L18 18.5L2 35" stroke="#be9339" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </section>
  );
}
