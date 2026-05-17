"use client";

import { properties } from "@/data/properties";
import PortfolioCard from "./PortfolioCard";

export default function PortfolioGrid() {
  return (
    <section className="bg-[#f2f2f0] rounded-t-[20px] md:rounded-t-[40px] px-6 md:px-[83px] py-8 md:py-[167px] -mt-[60px] md:-mt-[257px] relative z-10">
      <div className="flex flex-col gap-8 md:grid md:grid-cols-3 md:gap-x-[37px] md:gap-y-[65px]">
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
