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
        <div className="max-w-[1440px] mx-auto pl-[199px] pr-[153px]">
          <div className="relative pb-20">
            <div className="pt-[89px] w-[376px]">
              <ContactInfo />
            </div>

            <div className="absolute top-0 left-[376px] -mt-[128px]">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
