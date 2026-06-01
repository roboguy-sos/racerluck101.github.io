import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Achievements from "@/components/Achievements";
import StatsDashboard from "@/components/StatsDashboard";
import Skills from "@/components/Skills";
import Terminal from "@/components/Terminal";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Achievements />
        <StatsDashboard />
        <Skills />
        <Terminal />
        <Experience />
        <Projects />
        <Certifications />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
