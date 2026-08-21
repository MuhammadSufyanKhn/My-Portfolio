import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Loader from "./components/Loader";
import CustomCursor from "./components/CustomCursor";
import AnimatedBackground from "./components/AnimatedBackground";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
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

function PageWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [visible, setVisible] = useState(true);
  const [currentChildren, setCurrentChildren] = useState(children);

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => {
      setCurrentChildren(children);
      setVisible(true);
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 280);
    return () => clearTimeout(t);
  }, [location.pathname]);

  useEffect(() => {
    if (visible) setCurrentChildren(children);
  }, [children, visible]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate3d(0, 0, 0)" : "translate3d(0, 18px, 0)",
        transition:
          "opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "opacity, transform",
        minHeight: "100vh",
      }}
    >
      {currentChildren}
    </div>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "transparent" }}>
      <AnimatedBackground />
      <ScrollProgress />
      <Navbar />

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
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </PageWrapper>

      <Footer />
      <BackToTop />
    </div>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <CustomCursor />
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      <div style={{
        opacity: loaded ? 1 : 0,
        transition: "opacity 0.5s ease 0.1s",
      }}>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </div>
      <Analytics />
    </>
  );
}
