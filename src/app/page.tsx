import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import { ScrollProgressBar } from "@/components/scroll-progress-bar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { ClientWork } from "@/components/sections/client-work";
import { Skills } from "@/components/sections/skills";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <ScrollProgressBar />
      <NavBar />
      <main className="flex-1">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <ClientWork />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
