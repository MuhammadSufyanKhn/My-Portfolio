import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import Loader from "./components/Loader";
import AnimatedBackground from "./components/AnimatedBackground";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Education from "./pages/Education";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";
import DotNetProjects from "./pages/DotNetProjects";
import PythonProjects from "./pages/PythonProjects";
import SemesterProjects from "./pages/SemesterProjects";
import Skills from "./pages/Skills";
import Certifications from "./pages/Certifications";
import Internship from "./pages/Internship";
import Contact from "./pages/Contact";
import OthersProjects from "./pages/OthersProjects";

// Global Lenis ref for smooth scroll access
export let globalLenis: Lenis | null = null;

function PageWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    // Scroll instantly to top on page change
    if (globalLenis) {
      globalLenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }

    setAnimating(true);
    const t = setTimeout(() => setAnimating(false), 300);
    return () => clearTimeout(t);
  }, [location.pathname]);

  return (
    <div
      style={{
        opacity: animating ? 0.9 : 1,
        transform: animating ? "translate3d(0, 8px, 0)" : "translate3d(0, 0, 0)",
        transition: "opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "opacity, transform",
        minHeight: "100vh",
      }}
    >
      {children}
    </div>
  );
}

/** Left social rail — visible ≥ 1320px via CSS */
function LeftRail() {
  return (
    <aside className="side-rail-left" aria-label="Social links">
      <a href="https://github.com/MuhammadSufyanKhn" target="_blank" rel="noopener noreferrer">GitHub</a>
      <a href="https://www.linkedin.com/in/muhammad-sufyan-khan-72574b3a3/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <a href="mailto:khansufyanasim@gmail.com">Email</a>
    </aside>
  );
}

/** Right section-index rail — visible ≥ 1320px via CSS */
const railSections = [
  { label: "Intro", id: "hero" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
];

function RightRail() {
  const [active, setActive] = useState("hero");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") return;

    const observers: IntersectionObserver[] = [];
    railSections.forEach(sec => {
      const el = document.getElementById(sec.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(sec.id); },
        { rootMargin: "-45% 0px -50% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [location.pathname]);

  if (location.pathname !== "/") return null;

  return (
    <nav className="side-rail-right" aria-label="Page sections">
      {railSections.map(sec => (
        <a
          key={sec.id}
          href={`#${sec.id}`}
          className={`rail-section-item${active === sec.id ? " active" : ""}`}
          onClick={e => {
            e.preventDefault();
            const targetEl = document.getElementById(sec.id);
            if (!targetEl) return;
            if (globalLenis) {
              globalLenis.scrollTo(targetEl, { duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
            } else {
              targetEl.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <span className="rail-section-label">{sec.label}</span>
          <span className="rail-section-line" />
        </a>
      ))}
    </nav>
  );
}

/* Decorative rings (aria-hidden, pointer-events none) */
function DecoRings() {
  return (
    <div className="deco-rings" aria-hidden="true">
      <div className="deco-ring deco-ring-left-outer" />
      <div className="deco-ring deco-ring-left-inner" />
      <div className="deco-ring deco-ring-right-outer" />
      <div className="deco-ring deco-ring-right-inner" />
    </div>
  );
}

function AppContent() {
  const location = useLocation();

  // Initialize Lenis smooth inertia scrolling
  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.8,
    });

    globalLenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      globalLenis = null;
    };
  }, []);

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "transparent" }}>
      <AnimatedBackground />
      <DecoRings />
      <LeftRail />
      <RightRail />
      <Navbar />

      <main>
        <PageWrapper key={location.pathname}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/education" element={<Education />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/dotnet-projects" element={<DotNetProjects />} />
            <Route path="/python-projects" element={<PythonProjects />} />
            <Route path="/semester-projects" element={<SemesterProjects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/internship" element={<Internship />} />
            <Route path="/others-projects" element={<OthersProjects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </PageWrapper>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
        }}
      >
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </div>
    </>
  );
}
