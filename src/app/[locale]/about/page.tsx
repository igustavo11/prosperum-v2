import AboutHero from "@/components/about/AboutHero";
import PartnersSection from "@/components/about/PartnersSection";
import PillarsSection from "@/components/about/PillarsSection";
import ProsperumAdvantage from "@/components/about/ProsperumAdvantage";
import WhyInvestSection from "@/components/about/WhyInvestSection";

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
