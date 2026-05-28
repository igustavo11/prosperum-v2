import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

export default function CTASection() {
  const t = useTranslations("cta");

  return (
    <section
      className="relative py-16 lg:py-32 flex flex-col items-center justify-center text-center px-8"
      style={{
        background:
          "radial-gradient(ellipse at 50% 100%, #212121 0%, #111111 40%, #000000 100%)",
        minHeight: "476px",
      }}
    >
      <h2 className="text-[40px] lg:text-[80px] font-medium text-white leading-tight max-w-[604px] mb-6 lg:mb-8">
        {t("heading")}
      </h2>

      <p className="text-base lg:text-2xl font-medium text-[#efefef] max-w-[537px] mb-7 lg:mb-9">
        {t("subtitle")}
      </p>

      <Link
        href="/contact"
        className="inline-flex items-center justify-center h-[62px] px-10 rounded-[50px] text-2xl font-medium text-white hover:opacity-90 transition-opacity"
        style={{
          background: "linear-gradient(to right, #be9339 19%, #e4d488 84%)",
          minWidth: "216px",
        }}
      >
        {t("button")}
      </Link>
    </section>
  );
}
