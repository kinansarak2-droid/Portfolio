/**
 * Main scroll page.
 * 
 * Assembly step: import and arrange sections here in scroll order.
 * Each section is self-contained — add, remove, or reorder freely.
 */

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import Services from "@/components/sections/Services";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Work />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}
