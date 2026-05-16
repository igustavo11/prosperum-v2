import { properties } from "@/data/properties";

type Props = {
  params: Promise<{ id: string; locale: string }>;
};

export default async function PropertyPage({ params }: Props) {
  const { id } = await params;
  const property = properties.find((p) => p.id === id);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="font-['Urbanist'] font-semibold text-[48px] text-[#0c7e41]">
          {property?.title ?? id}
        </h1>
        <p className="font-['Urbanist'] text-[20px] text-[#101010] mt-4">
          Coming soon
        </p>
      </div>
    </div>
  );
}
