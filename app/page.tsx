import { Navbar } from "@/components/navbar";
import { Hero } from "@/sections/hero";
import { About } from "@/sections/about";
import { Skills } from "@/sections/skills";
import { Services } from "@/sections/services";
import { Portfolio } from "@/sections/portfolio";
import { Testimonials } from "@/sections/testimonials";
import { Resume } from "@/sections/resume";
import { Contact } from "@/sections/contact";
import { Footer } from "@/sections/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Services />
        <Portfolio />
        <Testimonials />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
