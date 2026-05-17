import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#d9d9d9] lg:min-h-[1059px]"
    >
      {/* Full-width background at 10% opacity */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-10"
          priority
        />
      </div>

      {/* Mobile: building image as block element at top */}
      <div className="relative w-full h-[260px] z-10 lg:hidden">
        <Image
          src="/images/hero-building.png"
          alt="Modern apartment building"
          fill
          sizes="100vw"
          className="object-cover object-left-top"
          priority
        />
      </div>

      {/* Desktop: building image — positioned at 41.6% from left, bleeds right */}
      <div
        className="absolute hidden lg:block z-0"
        style={{
          left: "41.6%",
          top: "138px",
          width: "1112px",
          height: "878px",
        }}
      >
        <Image
          src="/images/hero-building.png"
          alt="Modern apartment building"
          fill
          sizes="(max-width: 1024px) 0px, 50vw"
          className="object-cover object-left-top"
          priority
        />
      </div>

      {/* Text content */}
      <div className="relative z-10 px-6 pt-10 pb-16 lg:px-[148px] lg:pt-[307px] lg:pb-0">
        <h1 className="text-[40px] lg:text-[60px] font-medium leading-tight text-[#212121] max-w-[487px]">
          {t("heading_1")}{" "}
          <span className="font-bold text-[#0e8944]">
            {t("heading_highlight")}
          </span>
          <br />
          <span className="font-bold text-[#0e8944]">{t("heading_2")}</span>
        </h1>

        <p className="text-[20px] font-medium text-[#212121] mt-3">
          {t("subtitle_1")}
          <br />
          {t("subtitle_2")}
        </p>

        <a
          href="#services"
          className="inline-flex items-center justify-center w-[171px] h-[62px] rounded-[50px] text-2xl font-medium shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:opacity-90 transition-opacity mt-6 bg-gradient-to-r from-[#0c7e41] to-[#16e476] text-white lg:bg-none lg:bg-[#efefef] lg:text-[#0e8944]"
        >
          {t("cta")}
        </a>
      </div>
    </section>
  );
}
