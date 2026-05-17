import ContactForm from "@/components/contact/ContactForm";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import Navbar from "@/components/layout/Navbar";

export default function ContactPage() {
  return (
    <div className="relative">
      <Navbar />
      <ContactHero />
      <section className="bg-[#d9d9d9] relative">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:pl-[199px] lg:pr-[153px]">
          <div className="relative pb-20">
            <div className="pt-10 md:pt-[89px] w-full lg:w-[376px]">
              <ContactInfo />
            </div>

            <div className="mt-10 md:absolute md:top-0 md:left-[376px] md:-mt-[128px]">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
