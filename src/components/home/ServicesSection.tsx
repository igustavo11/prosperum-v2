import Image from "next/image";
import { useTranslations } from "next-intl";
import ServiceCard from "./ServiceCard";

export default function ServicesSection() {
  const t = useTranslations("services");

  const cards = [
    {
      title: t("core_strategy.title"),
      intro: t("core_strategy.intro"),
      points: [
        {
          title: t("core_strategy.point_1_title"),
          body: t("core_strategy.point_1_body"),
        },
        {
          title: t("core_strategy.point_2_title"),
          body: t("core_strategy.point_2_body"),
        },
        {
          title: t("core_strategy.point_3_title"),
          body: t("core_strategy.point_3_body"),
        },
      ],
    },
    {
      title: t("investment_options.title"),
      intro: t("investment_options.intro"),
      points: [
        {
          title: t("investment_options.point_1_title"),
          body: t("investment_options.point_1_body"),
        },
        {
          title: t("investment_options.point_2_title"),
          body: t("investment_options.point_2_body"),
        },
        {
          title: t("investment_options.point_3_title"),
          body: t("investment_options.point_3_body"),
        },
      ],
    },
    {
      title: t("performance_goals.title"),
      intro: undefined,
      points: [
        {
          title: t("performance_goals.point_1_title"),
          body: t("performance_goals.point_1_body"),
        },
        {
          title: t("performance_goals.point_2_title"),
          body: t("performance_goals.point_2_body"),
        },
        {
          title: t("performance_goals.point_3_title"),
          body: t("performance_goals.point_3_body"),
        },
      ],
    },
  ];

  return (
    <section
      id="services"
      className="relative overflow-hidden rounded-[150px] py-24"
    >
      {/* Background gradient image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bg-gradiente.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Header */}
      <div className="relative z-10 flex flex-col items-center mb-16">
        <div className="relative w-24 h-24">
          <Image
            src="/images/services-icon.png"
            alt=""
            fill
            sizes="96px"
            className="object-contain"
          />
        </div>
        <h2 className="text-[80px] font-medium text-white leading-tight">
          {t("title")}
        </h2>
        <p className="text-2xl font-medium text-white text-center max-w-[329px]">
          {t("subtitle")}
        </p>
      </div>

      {/* Cards container — no z-index so blend layer composites against the green gradient */}
      <div className="relative mx-auto" style={{ maxWidth: "1350px" }}>
        {/* Luminosity-blended gray background (no content inside) */}
        <div
          className="absolute inset-0 rounded-[143px] pointer-events-none"
          style={{ background: "#d9d9d9", mixBlendMode: "luminosity" }}
        />
        {/* Content on top — not affected by blend mode */}
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
