"use client";

import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Property } from "@/data/properties";
import { Link } from "@/navigation";

type PortfolioCardProps = Pick<
  Property,
  "id" | "title" | "location" | "images"
>;

export default function PortfolioCard({
  id,
  title,
  location,
  images,
}: PortfolioCardProps) {
  const t = useTranslations("portfolio");

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      <Link
        href={`/portfolio/${id}`}
        className="block relative w-full aspect-[4/3] overflow-hidden rounded-none md:rounded-sm"
      >
        <Image
          src={images[0]}
          alt={title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
      </Link>

      <p className="font-['Urbanist'] font-semibold text-[24px] md:text-[40px] text-[#0c7e41] leading-tight">
        {title}
      </p>

      <div className="flex items-center gap-2">
        <MapPin size={16} className="text-[#101010] flex-shrink-0 md:hidden" />
        <MapPin size={20} className="text-[#101010] flex-shrink-0 hidden md:block" />
        <p className="font-['Urbanist'] font-medium text-[14px] md:text-[20px] text-[#101010]">
          {location}
        </p>
      </div>

      <Link
        href={`/portfolio/${id}`}
        className="inline-flex items-center gap-3 border border-[#212121] rounded-[50px] h-[40px] md:h-[48px] px-4 md:px-6 w-fit font-['Urbanist'] font-medium text-[14px] md:text-[20px] text-[#212121] hover:bg-[#21212110] transition-colors"
      >
        {t("viewProject")}
        <ArrowRight size={14} className="md:hidden" />
        <ArrowRight size={16} className="hidden md:block" />
      </Link>
    </div>
  );
}
