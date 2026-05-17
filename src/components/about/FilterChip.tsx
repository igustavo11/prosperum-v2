"use client";

import Image from "next/image";

type FilterChipProps = {
  label: string;
  iconSrc: string;
};

export default function FilterChip({ label, iconSrc }: FilterChipProps) {
  return (
    <div
      className="
        flex items-center gap-3 px-6 py-4 rounded-[50px] transition-all duration-200
        border border-white bg-transparent
        hover:bg-gradient-to-r hover:from-[#be9339] hover:to-[#e4d488] hover:border-transparent
        cursor-default select-none
      "
    >
      <div className="relative w-8 h-8 flex-shrink-0">
        <Image src={iconSrc} alt="" fill className="object-contain" />
      </div>
      <span className="text-[18px] md:text-[24px] font-medium text-white whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}
