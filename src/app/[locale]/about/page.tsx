import AboutHero from "@/components/about/AboutHero";
import PillarsSection from "@/components/about/PillarsSection";
import WhyInvestSection from "@/components/about/WhyInvestSection";
import ProsperumAdvantage from "@/components/about/ProsperumAdvantage";
import PartnersSection from "@/components/about/PartnersSection";

export default function AboutPage() {
  return (
    <div className="bg-black">
      <AboutHero />
      <PillarsSection />
      <WhyInvestSection />
      <ProsperumAdvantage />
      <PartnersSection />
    </div>
  );
}
