"use client";

import { useTranslations } from "next-intl";

export default function ContactInfo() {
  const t = useTranslations("contact");

  return (
    <div>
      <p className="text-[20px] font-medium text-black">{t("direct")}</p>

      <p className="text-[30px] font-semibold text-[#0e8944] mt-2 leading-snug">
        {t("tagline")}
      </p>

      <div className="w-[205px] h-px bg-black mt-4 mb-10" />

      <div className="space-y-[60px]">
        <div>
          <p className="text-[20px] font-semibold text-black mb-3">
            {t("office_label")}
          </p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=144+Essex+St,+Rochelle+Park,+NJ"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[20px] font-medium text-black underline leading-relaxed block"
          >
            {t("office_country")}
            <br />
            {t("office_street")}
            <br />
            {t("office_state")}
            <br />
            {t("office_zip")}
          </a>
        </div>

        <div>
          <p className="text-[20px] font-semibold text-black mb-3">
            {t("phone_label")}
          </p>
          <p className="text-[20px] font-medium text-black">
            {t("phone_number")}
          </p>
        </div>

        <div>
          <p className="text-[20px] font-semibold text-black mb-3">
            {t("email_label")}
          </p>
          <a
            href={`mailto:${t("email_address")}`}
            className="text-[20px] font-medium text-black underline"
          >
            {t("email_address")}
          </a>
        </div>
      </div>
    </div>
  );
}
