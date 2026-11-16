import Hero from "@/components/Hero";
import About from "@/components/About";
import Achievements from "@/components/Achievements";
import StatsDashboard from "@/components/StatsDashboard";
import Skills from "@/components/Skills";
import Terminal from "@/components/Terminal";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import LatestPosts from "@/components/blog/LatestPosts";
import Certifications from "@/components/Certifications";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <About />
      <Achievements />
      <StatsDashboard />
      <Skills />
      <Terminal />
      <Experience />
      <Projects />
      <LatestPosts />
      <Certifications />
      <CTA />
      <Contact />
    </main>
  );
}
