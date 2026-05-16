import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-[#dadada] py-8 text-center">
      <p className="text-[#212121] text-2xl font-medium">{t("copyright")}</p>
    </footer>
  );
}
