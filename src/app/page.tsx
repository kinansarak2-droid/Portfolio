import Hero         from "@/components/sections/Hero";
import CourtsScroll from "@/components/sections/CourtsScroll";
import Work         from "@/components/sections/Work";
import About        from "@/components/sections/About";
import Contact      from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <CourtsScroll />
      <Work />
      <About />
      <Contact />
    </main>
  );
}
