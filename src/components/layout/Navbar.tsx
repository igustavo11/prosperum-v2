"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { usePathname, useRouter } from "@/navigation";
import { Button } from "../ui/button";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const isWhiteVariant = ["/about", "/portfolio", "/contact"].includes(pathname);
  const isPropertyDetail = pathname.startsWith("/portfolio/");
  const logoSrc =
    isWhiteVariant || isPropertyDetail
      ? "/images/logow.svg"
      : "/images/logo-branco.svg";
  const linkTextClass = isWhiteVariant ? "text-white" : "text-[#212121]";
  const borderVariantClass = isWhiteVariant
    ? "border border-white text-white hover:bg-white/10"
    : "border border-[#212121] text-[#212121] hover:bg-[#21212110]";
  const hamburgerColor = isWhiteVariant ? "bg-white" : "bg-[#212121]";

  function toggleLocale() {
    const target = locale === "en" ? "pt" : "en";
    router.replace(pathname, { locale: target });
  }

  const links = [
    { label: t("home"), href: "/" },
    { label: t("about"), href: "/about" },
    { label: t("portfolio"), href: "/portfolio" },
    { label: t("contact"), href: "/contact" },
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-50 px-[146px] py-[55px] flex items-center justify-between">
      {/* Logo */}
      <a href="#hero" className="relative h-10 w-[191px] flex-shrink-0">
        <Image
          src={logoSrc}
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
            className={`text-base font-normal hover:text-primary transition-colors ${linkTextClass}`}
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Language toggle */}
      <Button
        onClick={toggleLocale}
        className={`hidden md:flex items-center gap-2 bg-transparent rounded-[40px] px-4 h-[41px] text-[20px] font-normal transition-colors ${borderVariantClass}`}
        aria-label="Switch language"
      >
        {locale === "en" ? (
          <Image
            src="/images/flag-en.png"
            alt=""
            width={31}
            height={31}
            className="rounded-full object-cover"
          />
        ) : (
          <Image
            src="/images/brasil.png"
            alt=""
            width={31}
            height={31}
            className="rounded-full object-cover"
          />
        )}
        <span>{t("language")}</span>
      </Button>

      {/* Mobile hamburger */}
      <button
        type="button"
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        <span
          className={`block w-6 h-0.5 transition-transform ${hamburgerColor} ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
        />
        <span
          className={`block w-6 h-0.5 transition-opacity ${hamburgerColor} ${menuOpen ? "opacity-0" : ""}`}
        />
        <span
          className={`block w-6 h-0.5 transition-transform ${hamburgerColor} ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
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
            type="button"
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
