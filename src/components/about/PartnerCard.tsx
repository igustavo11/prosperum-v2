"use client";

import Image from "next/image";

type PartnerCardProps = {
  logoSrc: string;
  name: string;
  description: string;
  websiteUrl: string;
  visitLabel: string;
};

export default function PartnerCard({
  logoSrc,
  name,
  description,
  websiteUrl,
  visitLabel,
}: PartnerCardProps) {
  return (
    <div className="flex items-center gap-12 h-full px-12">
      {/* Logo */}
      <div className="relative flex-shrink-0 w-[301px] h-[238px]">
        <Image src={logoSrc} alt={name} fill className="object-contain" />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-4">
        <h3 className="text-[35px] font-bold text-black">{name}</h3>
        <p className="text-[20px] font-medium text-[#212121] max-w-[534px]">
          {description}
        </p>
        <a
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-[216px] h-[62px] rounded-[50px] bg-gradient-to-r from-[#be9339] to-[#e4d488] text-[24px] font-bold text-white mt-2"
        >
          {visitLabel}
        </a>
      </div>
    </div>
  );
}
