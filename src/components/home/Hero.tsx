import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#d9d9d9]"
      style={{ minHeight: "1059px" }}
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

      {/* Building image — positioned at 41.6% from left, bleeds right */}
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
      <div className="relative z-10 px-[148px]" style={{ paddingTop: "307px" }}>
        <h1 className="text-[60px] font-medium leading-tight text-[#212121] max-w-[487px]">
          {t("heading_1")}{" "}
          <span className="font-bold text-[#0e8944]">
            {t("heading_highlight")}
          </span>
          <br />
          <span className="font-bold text-[#0e8944]">{t("heading_2")}</span>
        </h1>

        <p className="text-2xl font-medium text-[#212121] mt-3">
          {t("subtitle_1")}
          <br />
          {t("subtitle_2")}
        </p>

        <a
          href="#services"
          className="inline-flex items-center justify-center w-[171px] h-[62px] rounded-[50px] bg-[#efefef] text-[#0e8944] text-2xl font-medium shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-[#e0e0e0] transition-colors mt-6"
        >
          {t("cta")}
        </a>
      </div>
    </section>
  );
}
