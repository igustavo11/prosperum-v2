"use client";

import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

export default function ContactForm() {
  const t = useTranslations("contact.form");

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    // Integration to be added
  }

  return (
    <div className="bg-white rounded-[40px] px-[48px] py-[48px] w-[712px] z-10">
      <h2 className="text-[30px] font-semibold text-[#0e8944] leading-snug mb-2">
        {t("title")}
      </h2>
      <p className="text-[20px] font-medium text-black mb-8">
        {t("subtitle")}
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Row 1: First Name / Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[20px] font-medium text-black">
              {t("first_name")}
            </label>
            <input
              type="text"
              className="h-[53px] bg-[#d9d9d9] rounded-[15px] px-4 text-[16px] outline-none focus:ring-2 focus:ring-[#0e8944]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[20px] font-medium text-black">
              {t("last_name")}
            </label>
            <input
              type="text"
              className="h-[53px] bg-[#d9d9d9] rounded-[15px] px-4 text-[16px] outline-none focus:ring-2 focus:ring-[#0e8944]"
            />
          </div>
        </div>

        {/* Row 2: Email / Phone */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[20px] font-medium text-black">
              {t("email")}
            </label>
            <input
              type="email"
              className="h-[53px] bg-[#d9d9d9] rounded-[15px] px-4 text-[16px] outline-none focus:ring-2 focus:ring-[#0e8944]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[20px] font-medium text-black">
              {t("phone")}
            </label>
            <input
              type="tel"
              className="h-[53px] bg-[#d9d9d9] rounded-[15px] px-4 text-[16px] outline-none focus:ring-2 focus:ring-[#0e8944]"
            />
          </div>
        </div>

        {/* Row 3: I'm interested in / How did you hear */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[20px] font-medium text-black">
              {t("interested_in")}
            </label>
            <div className="relative">
              <select className="h-[53px] w-full bg-[#d9d9d9] rounded-[15px] px-4 text-[16px] outline-none focus:ring-2 focus:ring-[#0e8944] appearance-none cursor-pointer">
                <option value="" />
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black"
                size={18}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[20px] font-medium text-black">
              {t("heard_about")}
            </label>
            <div className="relative">
              <select className="h-[53px] w-full bg-[#d9d9d9] rounded-[15px] px-4 text-[16px] outline-none focus:ring-2 focus:ring-[#0e8944] appearance-none cursor-pointer">
                <option value="" />
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black"
                size={18}
              />
            </div>
          </div>
        </div>

        {/* Row 4: Message */}
        <div className="flex flex-col gap-1">
          <label className="text-[20px] font-medium text-black">
            {t("message")}
          </label>
          <textarea
            rows={4}
            className="bg-[#d9d9d9] rounded-[15px] px-4 py-3 text-[16px] outline-none focus:ring-2 focus:ring-[#0e8944] resize-none"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-3 bg-[#0e8944] text-white text-[24px] font-medium rounded-[10px] h-[58px] px-8 hover:bg-[#0a6e36] transition-colors"
          >
            {t("submit")}
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </form>
    </div>
  );
}
