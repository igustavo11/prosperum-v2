"use client";

import Image from "next/image";

type PillarCardProps = {
  title: string;
  description: string;
  iconSrc: string;
  bgColor: string;
  offsetLeft: string;
};

export default function PillarCard({
  title,
  description,
  iconSrc,
  bgColor,
  offsetLeft,
}: PillarCardProps) {
  return (
    <div
      className="relative h-[241px] rounded-[30px] flex items-center gap-8 px-8"
      style={{
        backgroundColor: bgColor,
        marginLeft: offsetLeft,
        width: `calc(100% - ${offsetLeft})`,
      }}
    >
      {/* Icon */}
      <div className="relative flex-shrink-0 w-[167px] h-[141px]">
        <Image src={iconSrc} alt="" fill className="object-contain" />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2">
        <h3 className="text-[40px] font-medium text-white leading-tight">
          {title}
        </h3>
        <p className="text-[24px] font-medium text-[#efefef] max-w-[775px]">
          {description}
        </p>
      </div>
    </div>
  );
}
