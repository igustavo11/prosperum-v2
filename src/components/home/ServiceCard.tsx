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
    <div>
      {!isFirst && (
        <div className="flex justify-center">
          <div className="w-[1148px] h-px bg-[#c0c0c0]" />
        </div>
      )}
      <div
        className="grid py-12"
        style={{ gridTemplateColumns: '381px 1fr', paddingLeft: '105px', paddingRight: '95px' }}
      >
        {/* Left: title */}
        <h3 className="text-[55px] font-medium text-[#212121] leading-[1.05]">
          {title.split(' ').map((word, i, arr) => (
            <span key={i}>
              {word}
              {i < arr.length - 1 && <br />}
            </span>
          ))}
        </h3>

        {/* Right: body */}
        <div className="text-2xl font-medium text-[#212121] space-y-4">
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
  )
}
