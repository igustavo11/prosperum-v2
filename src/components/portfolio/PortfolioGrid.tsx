"use client";

import { properties } from "@/data/properties";
import PortfolioCard from "./PortfolioCard";

export default function PortfolioGrid() {
  return (
    <section className="bg-[#f2f2f0] rounded-t-[40px] px-[83px] py-[167px] -mt-[257px] relative z-10">
      <div className="grid grid-cols-3 gap-x-[37px] gap-y-[65px]">
        {properties.map((property) => (
          <PortfolioCard
            key={property.id}
            id={property.id}
            title={property.title}
            location={property.location}
            images={property.images}
          />
        ))}
      </div>
    </section>
  );
}
