"use client";

import Image from "next/image";

type PartnerCardProps = {
  logoSrc: string;
  imageSrc?: string;
  name: string;
  description: string;
  websiteUrl: string;
  visitLabel: string;
};

export default function PartnerCard({
  logoSrc,
  imageSrc,
  name,
  description,
  websiteUrl,
  visitLabel,
}: PartnerCardProps) {
  return (
    <div className="group bg-white border border-[rgba(33,33,33,0.3)] rounded-[10px] shadow-[8px_8px_4px_0px_rgba(0,0,0,0.05)] w-full max-w-[409px]">
      {/* Site screenshot with visit button overlay */}
      <div className="relative mx-[17px] mt-[17px] h-[255px] rounded-[10px] border border-[rgba(33,33,33,0.5)] overflow-hidden">
        {imageSrc ? (
          <Image src={imageSrc} alt={name} fill className="object-cover" />
        ) : (
          <div className="w-full h-full bg-[#d9d9d9]" />
        )}

        <a
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <span className="inline-flex items-center justify-center w-[160px] h-[48px] rounded-[50px] bg-gradient-to-r from-[#be9339] to-[#e4d488] text-[16px] font-bold text-white">
            {visitLabel}
          </span>
        </a>
      </div>

      {/* Bottom: logo + name + description */}
      <div className="flex items-start gap-4 px-[15px] pt-[12px] pb-[17px]">
        <div className="relative flex-shrink-0 w-[88px] h-[70px]">
          <Image src={logoSrc} alt={name} fill className="object-contain" />
        </div>
        <div className="flex flex-col gap-[4px] min-w-0">
          <h3 className="text-[20px] font-bold text-[#212121] leading-tight">
            {name}
          </h3>
          <p className="text-[13px] font-medium text-[#212121] leading-normal line-clamp-4">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
