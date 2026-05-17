"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import ServiceCard from "./ServiceCard";

export default function ServicesSection() {
  const t = useTranslations("services");

  const cards = [
    {
      title: t("core_strategy.title"),
      intro: t("core_strategy.intro"),
      points: [
        { title: t("core_strategy.point_1_title"), body: t("core_strategy.point_1_body") },
        { title: t("core_strategy.point_2_title"), body: t("core_strategy.point_2_body") },
        { title: t("core_strategy.point_3_title"), body: t("core_strategy.point_3_body") },
      ],
    },
    {
      title: t("investment_options.title"),
      intro: t("investment_options.intro"),
      points: [
        { title: t("investment_options.point_1_title"), body: t("investment_options.point_1_body") },
        { title: t("investment_options.point_2_title"), body: t("investment_options.point_2_body") },
        { title: t("investment_options.point_3_title"), body: t("investment_options.point_3_body") },
      ],
    },
    {
      title: t("performance_goals.title"),
      intro: undefined,
      points: [
        { title: t("performance_goals.point_1_title"), body: t("performance_goals.point_1_body") },
        { title: t("performance_goals.point_2_title"), body: t("performance_goals.point_2_body") },
        { title: t("performance_goals.point_3_title"), body: t("performance_goals.point_3_body") },
      ],
    },
  ];

  return (
    <section
      id="services"
      className="relative overflow-hidden rounded-[60px] lg:rounded-[150px] py-16 lg:py-24"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bg-gradiente.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center mb-10 lg:mb-16">
        <div className="relative w-16 h-16 lg:w-24 lg:h-24">
          <Image
            src="/images/services-icon.png"
            alt=""
            fill
            sizes="96px"
            className="object-contain"
          />
        </div>
        <h2 className="text-[40px] lg:text-[80px] font-medium text-white leading-tight">
          {t("title")}
        </h2>
        <p className="text-base lg:text-2xl font-medium text-white text-center max-w-[329px]">
          {t("subtitle")}
        </p>
      </div>

      <div className="relative z-10 lg:hidden pb-10">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          slidesPerView={1}
          spaceBetween={16}
        >
          {cards.map((card) => (
            <SwiperSlide key={card.title}>
              <div className="bg-[#d9d9d9] [mix-blend-mode:luminosity] rounded-[60px] mx-4 mb-8">
                <ServiceCard
                  title={card.title}
                  intro={card.intro}
                  points={card.points}
                  isFirst={true}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="hidden lg:block relative mx-auto" style={{ maxWidth: "1350px" }}>
        <div
          className="absolute inset-0 rounded-[143px] pointer-events-none"
          style={{ background: "#d9d9d9", mixBlendMode: "luminosity" }}
        />
        <div className="relative">
          {cards.map((card, i) => (
            <ServiceCard
              key={card.title}
              title={card.title}
              intro={card.intro}
              points={card.points}
              isFirst={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
