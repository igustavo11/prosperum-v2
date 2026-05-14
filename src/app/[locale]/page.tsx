import Hero from '@/components/home/Hero'
import PremiumExperience from '@/components/home/PremiumExperience'
import ServicesSection from '@/components/home/ServicesSection'
import CTASection from '@/components/home/CTASection'

export default function Home() {
  return (
    <>
      <Hero />
      <div className="bg-black">
        <PremiumExperience />
        <ServicesSection />
        <CTASection />
      </div>
    </>
  )
}
