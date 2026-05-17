"use client";

import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

export default function PropertyBackButton() {
  const t = useTranslations("portfolio");

  return (
    <Link
      href="/portfolio"
      className="inline-flex items-center gap-3 bg-[#0e8944] rounded-[50px] h-[44px] md:h-[45px] px-4 md:px-6 w-full md:w-fit justify-center md:justify-start font-['Urbanist'] font-medium text-[16px] md:text-[20px] text-white hover:bg-[#0a6e37] transition-colors"
    >
      <ArrowLeft size={16} className="md:hidden" />
      <ArrowLeft size={17} className="hidden md:block" />
      {t("backToPortfolio")}
    </Link>
  );
}
