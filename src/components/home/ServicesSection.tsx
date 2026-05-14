import Image from 'next/image'
import { useTranslations } from 'next-intl'
import ServiceCard from './ServiceCard'

export default function ServicesSection() {
  const t = useTranslations('services')

  const cards = [
    {
      title: t('core_strategy.title'),
      intro: t('core_strategy.intro'),
      points: [
        { title: t('core_strategy.point_1_title'), body: t('core_strategy.point_1_body') },
        { title: t('core_strategy.point_2_title'), body: t('core_strategy.point_2_body') },
        { title: t('core_strategy.point_3_title'), body: t('core_strategy.point_3_body') },
      ],
    },
    {
      title: t('investment_options.title'),
      intro: t('investment_options.intro'),
      points: [
        { title: t('investment_options.point_1_title'), body: t('investment_options.point_1_body') },
        { title: t('investment_options.point_2_title'), body: t('investment_options.point_2_body') },
        { title: t('investment_options.point_3_title'), body: t('investment_options.point_3_body') },
      ],
    },
    {
      title: t('performance_goals.title'),
      intro: undefined,
      points: [
        { title: t('performance_goals.point_1_title'), body: t('performance_goals.point_1_body') },
        { title: t('performance_goals.point_2_title'), body: t('performance_goals.point_2_body') },
        { title: t('performance_goals.point_3_title'), body: t('performance_goals.point_3_body') },
      ],
    },
  ]

  return (
    <section
      id="services"
      className="relative mx-auto rounded-[150px] py-24 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 130%, #0c7e41 0%, #1a1a1a 45%, #000000 100%)',
      }}
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-6 mb-16">
        <div className="relative w-24 h-24">
          <Image
            src="/images/services-icon.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>
        <h2 className="text-[80px] font-medium text-white leading-tight">
          {t('title')}
        </h2>
        <p className="text-2xl font-medium text-white text-center max-w-[329px]">
          {t('subtitle')}
        </p>
      </div>

      {/* Cards container */}
      <div
        className="mx-auto rounded-[143px] overflow-hidden"
        style={{
          background: 'rgba(217,217,217,0.15)',
          maxWidth: '1350px',
          mixBlendMode: 'luminosity',
        }}
      >
        {cards.map((card, i) => (
          <ServiceCard
            key={card.title}
            title={card.title}
            intro={card.intro}
            points={card.points}
            isFirst={i === 0}
          />
        ))}
      </div>
    </section>
  )
}
