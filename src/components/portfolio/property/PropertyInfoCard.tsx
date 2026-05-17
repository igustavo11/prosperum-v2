"use client";

import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Property } from "@/data/properties";

type Props = {
  property: Property;
};

export default function PropertyInfoCard({ property }: Props) {
  const t = useTranslations("portfolio");
  const description = t.raw(`properties.${property.id}.description`) as string;
  const highlights = t.raw(`properties.${property.id}.highlights`) as string[];

  return (
    <div className="bg-[#0e8944] rounded-b-[40px] md:rounded-b-[60px] px-6 md:px-[80px] pt-[80px] md:pt-[140px] pb-8 md:pb-[60px] flex flex-col gap-6">
      {/* Title row */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-4 md:gap-6">
        <h1 className="font-['Urbanist'] font-semibold text-[32px] md:text-[64px] text-white leading-tight">
          {property.title}
        </h1>
        <a
          href={property.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 inline-flex items-center gap-2 bg-[#efefef] rounded-[50px] h-[36px] md:h-[56px] px-4 md:px-6 shadow font-['Urbanist'] font-medium text-[14px] md:text-[24px] text-[#0e8944] hover:bg-white transition-colors"
        >
          <MapPin size={16} className="text-[#0e8944] md:hidden" />
          <MapPin size={26} className="text-[#0e8944] hidden md:block" />
          {property.location}
        </a>
      </div>

      {/* Description */}
      <p className="font-['Urbanist'] font-medium text-[14px] md:text-[20px] text-[#efefef] leading-relaxed whitespace-pre-line">
        {description}
      </p>

      {/* Highlights */}
      <div className="flex flex-col gap-2">
        <p className="font-['Urbanist'] font-medium text-[14px] md:text-[20px] text-white">
          {t("highlights")}
        </p>
        <ul className="flex flex-col gap-1">
          {highlights.map((item) => (
            <li
              key={item}
              className="font-['Urbanist'] font-medium text-[14px] md:text-[20px] text-[#efefef]"
            >
              ◆{item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
