import { PageShell } from "@/components/shared/page-shell";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/sections/hero";
import { About } from "@/sections/about";
import { Skills } from "@/sections/skills";
import { Services } from "@/sections/services";
import { Pricing } from "@/sections/pricing";
import { Portfolio } from "@/sections/portfolio";
import { Testimonials } from "@/sections/testimonials";
import { Resume } from "@/sections/resume";
import { Certificates } from "@/sections/certificates";
import { Contact } from "@/sections/contact";
import { Footer } from "@/sections/footer";
import { WhatsAppPopup } from "@/components/shared/whatsapp-popup";
import { getPortfolioProjects } from "@/lib/get-portfolio-data";

export default async function Home() {
  const projects = await getPortfolioProjects();

  return (
    <PageShell>
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Services />
        <Pricing />
        <Portfolio projects={projects} />
        <Testimonials />
        <Resume />
        <Certificates />
        <Contact />
      </main>
      <Footer />
      <WhatsAppPopup />
    </PageShell>
  );
}
