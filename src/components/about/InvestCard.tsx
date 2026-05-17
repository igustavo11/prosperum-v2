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
        min-h-[200px] md:h-[324px] w-full rounded-[50px] p-8 md:p-12
        bg-[rgba(217,217,217,0.2)]
        border border-transparent
        hover:border-[#bd9238] transition-colors duration-200
        flex flex-col justify-center
      "
    >
      <h3 className="text-[24px] md:text-[35px] font-bold text-white mb-3 md:mb-4 leading-tight">
        {title}
      </h3>
      {highlight && (
        <p className="text-[14px] md:text-[20px] font-medium text-[#bd9238] mb-2 md:mb-3">
          {highlight}
        </p>
      )}
      <p className="text-[14px] md:text-[20px] font-medium text-[#efefef] leading-snug">
        {description}
      </p>
    </div>
  );
}
