import Disclaimer from "@/components/portfolio/Disclaimer";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import PortfolioHero from "@/components/portfolio/PortfolioHero";

export default function PortfolioPage() {
  return (
    <div>
      <PortfolioHero />
      <PortfolioGrid />
      <Disclaimer />
    </div>
  );
}
