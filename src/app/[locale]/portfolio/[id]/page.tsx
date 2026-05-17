import { notFound } from "next/navigation";
import PropertyBackButton from "@/components/portfolio/property/PropertyBackButton";
import PropertyImageSwiper from "@/components/portfolio/property/PropertyImageSwiper";
import PropertyInfoCard from "@/components/portfolio/property/PropertyInfoCard";
import { properties } from "@/data/properties";

type Props = {
  params: Promise<{ id: string; locale: string }>;
};

export default async function PropertyPage({ params }: Props) {
  const { id } = await params;
  const property = properties.find((p) => p.id === id);
  if (!property) notFound();

  return (
    <div className="min-h-screen bg-[#d9d9d9]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-[86px] pt-24 md:pt-[190px] pb-8 md:pb-[80px]">
        {/* Desktop: Back button above image. Mobile: hidden above, shown below card */}
        <div className="mb-6 hidden md:block">
          <PropertyBackButton />
        </div>

        {/* Image container */}
        <div className="relative">
          <PropertyImageSwiper
            images={property.images}
            title={property.title}
          />

          {/* Card: overlaps bottom of image */}
          <div className="relative -mt-[40px] md:-mt-[120px] flex justify-center">
            <div className="w-full max-w-full md:max-w-[938px]">
              <PropertyInfoCard property={property} />
            </div>
          </div>
        </div>

        {/* Mobile: Back button below card */}
        <div className="mt-6 md:hidden">
          <PropertyBackButton />
        </div>
      </div>
    </div>
  );
}
