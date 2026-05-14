import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function Hero() {
  const t = useTranslations('hero')

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-[#d9d9d9]">
      {/* Full-width background at 10% opacity */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.png"
          alt=""
          fill
          className="object-cover opacity-10"
          priority
        />
      </div>

      {/* Content grid */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-[148px] flex items-center gap-8 py-32">
        {/* Left: text content */}
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-[60px] font-medium leading-tight text-[#212121] max-w-[487px]">
            {t('heading_1')}{' '}
            <span className="font-bold text-[#0e8944]">{t('heading_highlight')}</span>
            <br />
            <span className="font-bold text-[#0e8944]">{t('heading_2')}</span>
          </h1>

          <p className="text-2xl font-medium text-[#212121]">
            {t('subtitle_1')}
            <br />
            {t('subtitle_2')}
          </p>

          <a
            href="#services"
            className="inline-flex items-center justify-center w-[171px] h-[62px] rounded-[50px] bg-[#efefef] text-[#0e8944] text-2xl font-medium shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-[#e0e0e0] transition-colors"
          >
            {t('cta')}
          </a>
        </div>

        {/* Right: building image */}
        <div className="flex-1 relative h-[878px] hidden lg:block">
          <Image
            src="/images/hero-building.png"
            alt="Modern apartment building"
            fill
            className="object-contain object-left"
            priority
          />
        </div>
      </div>
    </section>
  )
}
