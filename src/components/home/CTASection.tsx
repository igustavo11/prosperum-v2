import { useTranslations } from "next-intl";

export default function CTASection() {
  const t = useTranslations("cta");

  return (
    <section
      className="relative py-32 flex flex-col items-center justify-center text-center px-8"
      style={{
        background:
          "radial-gradient(ellipse at 50% 100%, #212121 0%, #111111 40%, #000000 100%)",
        minHeight: "722px",
      }}
    >
      <h2 className="text-[80px] font-medium text-white leading-tight max-w-[604px] mb-8">
        {t("heading")}
      </h2>

      <p className="text-2xl font-medium text-[#efefef] max-w-[537px] mb-9">
        {t("subtitle")}
      </p>

      <a
        href="#contact"
        className="inline-flex items-center justify-center h-[62px] px-10 rounded-[50px] text-2xl font-medium text-white hover:opacity-90 transition-opacity"
        style={{
          background: "linear-gradient(to right, #be9339 19%, #e4d488 84%)",
          minWidth: "216px",
        }}
      >
        {t("button")}
      </a>
    </section>
  );
}
