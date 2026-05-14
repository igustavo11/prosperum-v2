"use client";

import Image from "next/image";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/navigation";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleLocale() {
    const target = locale === "en" ? "pt" : "en";
    router.replace(pathname, { locale: target });
  }

  const links = [
    { label: t("home"), href: "#hero" },
    { label: t("about"), href: "#about" },
    { label: t("portfolio"), href: "#portfolio" },
    { label: t("contact"), href: "#contact" },
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-50 px-[146px] py-[55px] flex items-center justify-between">
      {/* Logo */}
      <a href="#hero" className="relative h-10 w-[191px] flex-shrink-0">
        <Image
          src="/images/logo-branco.svg"
          alt="Prosperium"
          fill
          className="object-contain object-left"
          priority
        />
      </a>

      {/* Desktop nav links */}
      <nav className="hidden md:flex items-center gap-8">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-[#212121] text-base font-normal hover:text-primary transition-colors"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Language toggle */}
      <button
        onClick={toggleLocale}
        className="hidden md:flex items-center gap-2 border border-[#212121] rounded-[40px] px-4 h-[41px] text-[#212121] text-[20px] font-normal hover:bg-[#21212110] transition-colors"
        aria-label="Switch language"
      >
        <Image
          src="/images/flag-en.png"
          alt=""
          width={31}
          height={31}
          className="rounded-full object-cover"
        />
        <span>{t("language")}</span>
      </button>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        <span
          className={`block w-6 h-0.5 bg-[#212121] transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
        />
        <span
          className={`block w-6 h-0.5 bg-[#212121] transition-opacity ${menuOpen ? "opacity-0" : ""}`}
        />
        <span
          className={`block w-6 h-0.5 bg-[#212121] transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
        />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg flex flex-col items-start px-8 py-6 gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[#212121] text-lg font-normal"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              toggleLocale();
              setMenuOpen(false);
            }}
            className="flex items-center gap-2 border border-[#212121] rounded-[40px] px-4 h-10 text-[#212121] text-base font-normal"
          >
            <Image
              src="/images/flag-en.png"
              alt=""
              width={24}
              height={24}
              className="rounded-full object-cover"
            />
            <span>{t("language")}</span>
          </button>
        </div>
      )}
    </header>
  );
}
