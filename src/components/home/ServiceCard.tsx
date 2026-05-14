type Point = {
  title: string
  body: string
}

type ServiceCardProps = {
  title: string
  intro?: string
  points: Point[]
  isFirst?: boolean
}

export default function ServiceCard({ title, intro, points, isFirst = false }: ServiceCardProps) {
  return (
    <div className={`flex gap-12 py-12 px-8 ${!isFirst ? 'border-t border-[#c0c0c0]' : ''}`}>
      {/* Left: title */}
      <div className="w-[260px] flex-shrink-0">
        <h3 className="text-[55px] font-medium text-[#212121] leading-[1.05]">
          {title.split(' ').map((word, i, arr) => (
            <span key={i}>
              {word}
              {i < arr.length - 1 && <br />}
            </span>
          ))}
        </h3>
      </div>

      {/* Right: body */}
      <div className="flex-1 text-2xl font-medium text-[#212121] space-y-4 max-w-[767px]">
        {intro && <p>{intro}</p>}
        {points.map((point) => (
          <div key={point.title}>
            <p className="font-bold">{point.title}</p>
            <p>{point.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
