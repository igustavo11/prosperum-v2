"use client";

type InvestCardProps = {
  title: string;
  description: string;
  highlight?: string;
};

export default function InvestCard({
  title,
  description,
  highlight,
}: InvestCardProps) {
  return (
    <div
      className="
        h-[324px] w-[594px] rounded-[50px] p-12
        bg-[rgba(217,217,217,0.2)]
        border border-transparent
        hover:border-[#bd9238] transition-colors duration-200
        flex flex-col justify-center
      "
    >
      <h3 className="text-[35px] font-bold text-white mb-4 leading-tight">
        {title}
      </h3>
      {highlight && (
        <p className="text-[20px] font-medium text-[#bd9238] mb-3">
          {highlight}
        </p>
      )}
      <p className="text-[20px] font-medium text-[#efefef] leading-snug">
        {description}
      </p>
    </div>
  );
}
