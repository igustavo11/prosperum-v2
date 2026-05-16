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
      <div className="max-w-[1440px] mx-auto px-[86px] pt-[190px] pb-[80px]">
        {/* Back button: above the image */}
        <div className="mb-6">
          <PropertyBackButton />
        </div>

        {/* Image container */}
        <div className="relative">
          <PropertyImageSwiper
            images={property.images}
            title={property.title}
          />

          {/* Card: overlaps bottom of image */}
          <div className="relative -mt-[120px] flex justify-center">
            <div className="w-full max-w-[938px]">
              <PropertyInfoCard property={property} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
