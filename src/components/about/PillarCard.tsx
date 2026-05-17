"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type PillarCardProps = {
  title: string;
  description: string;
  iconSrc: string;
  bgColor: string;
  desktopOffsetClass: string;
  mobileAlign: "left" | "right";
  iconWidth?: number;
  iconHeight?: number;
  descMaxWidth?: number;
};

export default function PillarCard({
  title,
  description,
  iconSrc,
  bgColor,
  desktopOffsetClass,
  mobileAlign,
  iconWidth = 167,
  iconHeight = 141,
  descMaxWidth = 775,
}: PillarCardProps) {
  const mobileOffsetClass =
    mobileAlign === "left"
      ? "-translate-x-[53px] max-md:!pl-[75px]"
      : "translate-x-[45px]";

  return (
    <div
      className={cn(
        "relative rounded-[30px] px-6 md:px-8",
        "flex flex-col justify-center md:flex-row md:items-center",
        "gap-2 md:gap-8",
        "h-auto py-5 md:py-0 md:h-[241px]",
        mobileOffsetClass,
        desktopOffsetClass,
      )}
      style={{ backgroundColor: bgColor }}
    >
      {/* Mobile icon: fixed 38×38 */}
      <div className="relative flex-shrink-0 w-[38px] h-[38px] md:hidden">
        <Image src={iconSrc} alt="" fill className="object-contain" />
      </div>

      {/* Desktop icon: per-card size via props */}
      <div
        className="relative flex-shrink-0 hidden md:block"
        style={{ width: iconWidth, height: iconHeight }}
      >
        <Image src={iconSrc} alt="" fill className="object-contain" />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1 md:gap-2">
        <h3 className="text-[30px] md:text-[40px] font-medium text-white leading-tight">
          {title}
        </h3>
        <p className="text-[16px] md:text-[24px] font-medium text-[#efefef]">
          <span className="md:hidden">{description}</span>
          <span
            className="hidden md:block"
            style={{ maxWidth: descMaxWidth }}
          >
            {description}
          </span>
        </p>
      </div>
    </div>
  );
}
