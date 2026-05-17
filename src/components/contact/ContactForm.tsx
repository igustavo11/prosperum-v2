"use client";

import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const interestOptions = [
    t("options.interest.equity"),
    t("options.interest.debt"),
    t("options.interest.project"),
    t("options.interest.partnership"),
    t("options.interest.general"),
  ];
  const heardAboutOptions = [
    t("options.heard.linkedin"),
    t("options.heard.instagram"),
    t("options.heard.google"),
    t("options.heard.referral"),
    t("options.heard.event"),
    t("options.heard.other"),
  ];

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    // Integration to be added
  }

  return (
    <div className="bg-white rounded-[38px] md:rounded-[40px] px-8 md:px-[48px] py-10 md:py-[48px] w-full max-w-[712px] z-10">
      <h2 className="text-[30px] font-semibold text-[#0e8944] leading-snug mb-2 max-w-[520px]">
        {t("title")}
      </h2>
      <p className="text-[20px] font-medium text-black mb-8 max-w-[520px]">
        {t("subtitle")}
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 md:gap-6">
        {/* Row 1: First Name / Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="first-name"
              className="text-[20px] font-medium text-black"
            >
              {t("first_name")}
            </label>
            <input
              id="first-name"
              type="text"
              className="h-[53px] bg-[#d9d9d9] rounded-[15px] px-4 text-[16px] outline-none focus:ring-2 focus:ring-[#0e8944]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="last-name"
              className="text-[20px] font-medium text-black"
            >
              {t("last_name")}
            </label>
            <input
              id="last-name"
              type="text"
              className="h-[53px] bg-[#d9d9d9] rounded-[15px] px-4 text-[16px] outline-none focus:ring-2 focus:ring-[#0e8944]"
            />
          </div>
        </div>

        {/* Row 2: Email / Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-[20px] font-medium text-black"
            >
              {t("email")}
            </label>
            <input
              id="email"
              type="email"
              className="h-[53px] bg-[#d9d9d9] rounded-[15px] px-4 text-[16px] outline-none focus:ring-2 focus:ring-[#0e8944]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="phone"
              className="text-[20px] font-medium text-black"
            >
              {t("phone")}
            </label>
            <input
              id="phone"
              type="tel"
              className="h-[53px] bg-[#d9d9d9] rounded-[15px] px-4 text-[16px] outline-none focus:ring-2 focus:ring-[#0e8944]"
            />
          </div>
        </div>

        {/* Row 3: Message */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="message"
            className="text-[20px] font-medium text-black"
          >
            {t("message")}
          </label>
          <textarea
            id="message"
            rows={4}
            className="bg-[#d9d9d9] rounded-[15px] px-4 py-3 text-[16px] outline-none focus:ring-2 focus:ring-[#0e8944] resize-none min-h-[159px]"
          />
        </div>

        {/* Row 4: I'm interested in / How did you hear */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="interest"
              className="text-[20px] font-medium text-black"
            >
              {t("interested_in")}
            </label>
            <div className="relative">
              <select
                id="interest"
                className="h-[53px] w-full bg-[#d9d9d9] rounded-[15px] px-4 text-[16px] outline-none focus:ring-2 focus:ring-[#0e8944] appearance-none cursor-pointer"
              >
                {interestOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black"
                size={18}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="heard-about"
              className="text-[20px] font-medium text-black"
            >
              {t("heard_about")}
            </label>
            <div className="relative">
              <select
                id="heard-about"
                className="h-[53px] w-full bg-[#d9d9d9] rounded-[15px] px-4 text-[16px] outline-none focus:ring-2 focus:ring-[#0e8944] appearance-none cursor-pointer"
              >
                {heardAboutOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black"
                size={18}
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-3 bg-[#0e8944] text-white text-[16px] md:text-[24px] font-medium rounded-[10px] h-[44px] md:h-[58px] px-4 md:px-8 hover:bg-[#0a6e36] transition-colors"
          >
            {t("submit")}
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </form>
    </div>
  );
}
