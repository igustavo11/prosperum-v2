"use client";

import { useTranslations } from "next-intl";
import { useRef } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
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
  const mobilePrevRef = useRef<HTMLButtonElement>(null);
  const mobileNextRef = useRef<HTMLButtonElement>(null);

  const partners: Partner[] = [
    {
      logoSrc: "/images/about/partner-forca-builders.png",
      name: t("forca_builders_name"),
      description: t("forca_builders_description"),
      websiteUrl: "#",
    },
    {
      logoSrc: "/images/fernandespartens.webp",
      name: t("fernandes_equity_name"),
      description: t("fernandes_equity_description"),
      websiteUrl: "https://fernandesequity.com/",
    },
    {
      logoSrc: "/images/elasdesignslogo.webp",
      name: t("elardesigns_name"),
      description: t("elardesigns_description"),
      websiteUrl: "https://www.elardesigns.com/",
    },
  ];

  const visitLabel = t("visit_website");

  return (
    <section className="bg-[#d9d9d9] py-16 md:py-24">
      <h2 className="text-[40px] md:text-[80px] font-medium text-black text-center mb-8 md:mb-12">
        {t("title")}
      </h2>

      {/* Mobile: 1 card at a time with arrows */}
      <div className="block md:hidden">
        <div className="flex items-center justify-center gap-2 px-4">
          <button
            type="button"
            ref={mobilePrevRef}
            className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
            aria-label={t("prev")}
          >
            <svg
              width="16"
              height="30"
              viewBox="0 0 20 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Previous"
            >
              <path
                d="M18 2L2 18.5L18 35"
                stroke="#be9339"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="flex-1 min-w-0">
            <Swiper
              modules={[Navigation, Autoplay]}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              navigation={{
                prevEl: mobilePrevRef.current,
                nextEl: mobileNextRef.current,
              }}
              onSwiper={(swiper) => {
                // @ts-expect-error swiper internal navigation typing
                swiper.params.navigation.prevEl = mobilePrevRef.current;
                // @ts-expect-error swiper internal navigation typing
                swiper.params.navigation.nextEl = mobileNextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }}
              className="rounded-[50px] overflow-hidden bg-[rgba(217,217,217,0.2)]"
            >
              {partners.map((partner) => (
                <SwiperSlide key={partner.name} className="flex justify-center">
                  <PartnerCard {...partner} visitLabel={visitLabel} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <button
            type="button"
            ref={mobileNextRef}
            className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
            aria-label={t("next")}
          >
            <svg
              width="16"
              height="30"
              viewBox="0 0 20 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Next"
            >
              <path
                d="M2 2L18 18.5L2 35"
                stroke="#be9339"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop: arrows + 1009px swiper */}
      <div className="hidden md:flex items-center justify-center gap-6 px-[148px]">
        <button
          type="button"
          ref={prevRef}
          className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
          aria-label={t("prev")}
        >
          <svg
            width="20"
            height="37"
            viewBox="0 0 20 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Previous"
          >
            <path
              d="M18 2L2 18.5L18 35"
              stroke="#be9339"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

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

        <button
          type="button"
          ref={nextRef}
          className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
          aria-label={t("next")}
        >
          <svg
            width="20"
            height="37"
            viewBox="0 0 20 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Next"
          >
            <path
              d="M2 2L18 18.5L2 35"
              stroke="#be9339"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
