type Point = {
  title: string;
  body: string;
};

type ServiceCardProps = {
  title: string;
  intro?: string;
  points: Point[];
  isFirst?: boolean;
};

export default function ServiceCard({
  title,
  intro,
  points,
  isFirst = false,
}: ServiceCardProps) {
  return (
    <div>
      {!isFirst && (
        <div className="flex justify-center">
          <div className="w-full lg:w-[1148px] h-px bg-[#c0c0c0]" />
        </div>
      )}
      <div className="flex flex-col py-8 px-6 lg:grid lg:py-12 lg:px-0 lg:[grid-template-columns:381px_1fr] lg:[padding-left:105px] lg:[padding-right:95px]">
        <h3 className="text-[40px] lg:text-[55px] font-medium text-[#212121] leading-[1.05] mb-4 lg:mb-0">
          {title.split(" ").map((word, i, arr) => (
            <span key={i}>
              {word}
              {i < arr.length - 1 && <br />}
            </span>
          ))}
        </h3>

        <div className="text-base lg:text-2xl font-medium text-[#212121] space-y-4">
          {intro && <p>{intro}</p>}
          {points.map((point) => (
            <div key={point.title}>
              <p className="font-bold">{point.title}</p>
              <p>{point.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
