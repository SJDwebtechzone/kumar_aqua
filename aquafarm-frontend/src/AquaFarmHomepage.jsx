import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, Routes, Route } from "react-router-dom";
import Footer from "./Footer";
import AdminDashboard from "./AdminDashboard";

// Shared Components
import Nav from "./components/Nav";
import DepthGauge from "./components/DepthGauge";

// Route Pages
import Home from "./pages/Home";
import About from "./pages/About";
import AquariumTypes from "./pages/AquariumTypes";
import Contact from "./pages/Contact";


const createBubble = (x, size, delay, duration, sway1, sway2) => {
  const colorIndex = Math.floor(Math.random() * 5);
  
  const backgrounds = [
    "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 127, 80, 0.5) 45%, rgba(255, 127, 80, 0.2) 75%, rgba(255, 127, 80, 0.6) 100%)",
    "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(190, 18, 60, 0.4) 45%, rgba(190, 18, 60, 0.15) 75%, rgba(190, 18, 60, 0.55) 100%)",
    "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(0, 123, 138, 0.4) 45%, rgba(0, 123, 138, 0.15) 75%, rgba(0, 123, 138, 0.55) 100%)",
    "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(6, 182, 212, 0.45) 45%, rgba(6, 182, 212, 0.18) 75%, rgba(6, 182, 212, 0.6) 100%)",
    "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.2) 70%, rgba(14, 165, 233, 0.45) 100%)"
  ];
  
  const glowColors = [
    "rgba(255, 127, 80, 0.45)",
    "rgba(190, 18, 60, 0.45)",
    "rgba(0, 123, 138, 0.45)",
    "rgba(6, 182, 212, 0.5)",
    "rgba(14, 165, 233, 0.35)"
  ];
  
  const borderColors = [
    "rgba(255, 127, 80, 0.5)",
    "rgba(190, 18, 60, 0.45)",
    "rgba(0, 123, 138, 0.45)",
    "rgba(6, 182, 212, 0.5)",
    "rgba(14, 165, 233, 0.35)"
  ];

  return {
    id: Math.random(),
    x,
    size,
    delay,
    duration,
    background: backgrounds[colorIndex],
    glowColor: glowColors[colorIndex],
    borderColor: borderColors[colorIndex],
    style: {
      '--sway-x1': `${sway1}px`,
      '--sway-x2': `${sway2}px`,
    }
  };
};

const generateStickyBubbles = (count) => {
  const backgrounds = [
    "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 127, 80, 0.5) 50%, rgba(255, 127, 80, 0.6) 100%)",
    "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(190, 18, 60, 0.4) 50%, rgba(190, 18, 60, 0.55) 100%)",
    "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(0, 123, 138, 0.4) 50%, rgba(0, 123, 138, 0.55) 100%)",
    "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(6, 182, 212, 0.45) 50%, rgba(6, 182, 212, 0.6) 100%)",
    "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.2) 70%, rgba(14, 165, 233, 0.45) 100%)"
  ];
  
  const borderColors = [
    "rgba(255, 127, 80, 0.4)",
    "rgba(190, 18, 60, 0.4)",
    "rgba(0, 123, 138, 0.4)",
    "rgba(6, 182, 212, 0.4)",
    "rgba(14, 165, 233, 0.3)"
  ];

  const glowColors = [
    "rgba(255, 127, 80, 0.3)",
    "rgba(190, 18, 60, 0.3)",
    "rgba(0, 123, 138, 0.3)",
    "rgba(6, 182, 212, 0.3)",
    "rgba(14, 165, 233, 0.2)"
  ];

  return Array.from({ length: count }, (_, idx) => {
    const colorIdx = Math.floor(Math.random() * 5);
    return {
      id: idx,
      x: Math.random() * 100,
      y: Math.random() * 95 + 2.5, // avoid absolute edges
      size: Math.random() * 10 + 7, // 7px to 17px (medium)
      background: backgrounds[colorIdx],
      borderColor: borderColors[colorIdx],
      glowColor: glowColors[colorIdx],
      opacity: Math.random() * 0.3 + 0.15, // 0.15 to 0.45
      pulseDuration: Math.random() * 4 + 3 // 3s to 7s
    };
  });
};

export default function AquaFarmHomepage() {
  const location = useLocation();
  const navigate = useNavigate();
  const getActiveZone = (pathname) => {
    if (pathname === "/about") return "shallows";
    if (pathname === "/aquarium-types") return "growout";
    if (pathname === "/contact") return "harbor";
    return "surface";
  };
  const activeZone = getActiveZone(location.pathname);

  const [bubbles, setBubbles] = useState([]);
  const [stickyBubbles] = useState(() => generateStickyBubbles(45));
  const [showScrollTop, setShowScrollTop] = useState(false);
  const sectionRefs = useRef({});
  const lastBubbleTime = useRef(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ambient bubble generator (adds random bubbles frequently)
  useEffect(() => {
    const interval = setInterval(() => {
      const newBubble = createBubble(
        Math.random() * 100,
        Math.random() * 22 + 4,
        Math.random() * 2,
        Math.random() * 5 + 4,
        Math.random() * 40 - 20,
        Math.random() * 40 - 20
      );
      setBubbles((prev) => [...prev.slice(-45), newBubble]);
    }, 450);
    return () => clearInterval(interval);
  }, []);

  // Click & move interaction bubble generator
  const handleInteraction = (e) => {
    const now = Date.now();
    if (now - lastBubbleTime.current < 65) return; // cap bubbles rate for smooth gameplay
    lastBubbleTime.current = now;

    const xPos = (e.clientX / window.innerWidth) * 100;
    const newBubble = createBubble(
      xPos,
      Math.random() * 26 + 6,
      0,
      Math.random() * 4 + 3,
      Math.random() * 60 - 30,
      Math.random() * 60 - 30
    );
    setBubbles((prev) => [...prev.slice(-45), newBubble]);
  };

  const scrollTo = (id) => {
    const paths = {
      surface: "/",
      shallows: "/about",
      growout: "/aquarium-types",
      harbor: "/contact"
    };
    navigate(paths[id] || "/");
  };

  return (
    <div 
      style={{ background: "#ECFEFF" }} 
      className="relative w-full text-[#0A1C33] font-body selection:bg-[#FF7F50] selection:text-white overflow-hidden"
      onMouseMove={handleInteraction}
      onClick={handleInteraction}
    >
      <FontImports />
      {/* Sticky Background Bubbles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {stickyBubbles.map((sb) => (
          <span
            key={sb.id}
            className="absolute rounded-full sticky-bubble"
            style={{
              left: `${sb.x}%`,
              top: `${sb.y}%`,
              width: `${sb.size}px`,
              height: `${sb.size}px`,
              background: sb.background,
              border: `0.5px solid ${sb.borderColor}`,
              opacity: sb.opacity,
              boxShadow: `0 0 3px ${sb.glowColor}`,
              animationDuration: `${sb.pulseDuration}s`,
            }}
          />
        ))}
      </div>
      {/* Bubble Rendering Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
        {bubbles.map((b) => (
          <span
            key={b.id}
            className="bubble-element"
            style={{
              left: `${b.x}%`,
              width: `${b.size}px`,
              height: `${b.size}px`,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
              background: b.background,
              boxShadow: `inset 0 0 4px rgba(255, 255, 255, 0.6), 0 2px 6px ${b.glowColor}`,
              border: `0.5px solid ${b.borderColor}`,
              ...(b.style || {}),
            }}
          />
        ))}
      </div>

      <Nav activeZone={activeZone} onNavigate={scrollTo} />
      <DepthGauge activeZone={activeZone} onSelect={scrollTo} />

      <Routes>
        <Route path="/" element={<Home sectionRefs={sectionRefs} />} />
        <Route path="/about" element={<About sectionRefs={sectionRefs} />} />
        <Route path="/aquarium-types" element={<AquariumTypes sectionRefs={sectionRefs} onNavigate={scrollTo} />} />
        <Route path="/contact" element={<Contact sectionRefs={sectionRefs} />} />
        <Route path="/admin" element={<AdminDashboard />} /> 
      </Routes>

      <Footer onNavigate={scrollTo} />

      {/* Floating Action Buttons stack (FABs) */}
      <div className="fixed right-6 bottom-6 z-50 flex flex-col gap-3 items-center">
        {/* Scroll to Top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`w-11 h-11 rounded-full bg-black/45 hover:bg-black/65 text-white border border-white/20 flex items-center justify-center shadow-lg backdrop-blur-md transition-all duration-300 transform ${
            showScrollTop ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
          }`}
          aria-label="Scroll to top"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7" />
          </svg>
        </button>

        {/* Call CTA */}
        <a
          href="tel:+18005862782"
          className="w-11 h-11 rounded-full bg-[#FF7F50] hover:bg-[#E0663B] text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-200"
          aria-label="Call Now"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </a>

        {/* WhatsApp CTA */}
        <a
          href="https://wa.me/18005862782"
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-full bg-[#25D366] hover:bg-[#1ebd59] text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-200"
          aria-label="Chat on WhatsApp"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.863-9.736.001-2.599-1.01-5.043-2.848-6.886-1.839-1.843-4.288-2.857-6.892-2.858-5.437 0-9.862 4.37-9.865 9.737-.001 1.765.485 3.488 1.408 5.02l-.924 3.376 3.433-.908zm11.367-7.37c-.302-.152-1.791-.883-2.073-1.002-.283-.119-.489-.178-.696.119-.207.297-.803.987-.984 1.187-.18.2-.361.226-.663.074-.302-.151-1.272-.469-2.424-1.496-.897-.8-1.502-1.787-1.678-2.088-.177-.302-.019-.465.132-.615.136-.135.302-.353.454-.53.151-.177.202-.303.303-.505.101-.202.051-.379-.025-.53-.076-.152-.696-1.68-.954-2.298-.252-.61-.51-.527-.696-.537-.18-.01-.387-.011-.595-.011s-.547.078-.833.39c-.286.313-1.093 1.07-1.093 2.607 0 1.537 1.118 3.02 1.27 3.22.152.202 2.199 3.358 5.328 4.708.745.321 1.325.513 1.777.656.749.238 1.431.205 1.968.125.599-.09 1.791-.73 2.043-1.435.253-.705.253-1.309.177-1.435-.076-.126-.283-.203-.585-.355z" />
          </svg>
        </a>
      </div>
    </div>
  );
}

/* ---------------------------------- FONTS ---------------------------------- */
function FontImports() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,500;1,9..144,700&family=Inter:wght@300;400;500;600;700;800&family=Fira+Code:wght@400;500;600;700&family=Pacifico&display=swap');
      .font-display { font-family: 'Fraunces', serif; }
      .font-body { font-family: 'Inter', sans-serif; }
      .font-mono { font-family: 'Fira Code', monospace; }
      .font-logo { font-family: 'Pacifico', cursive; }
      html { scroll-behavior: smooth; }
      @keyframes bubblePulse {
        0% { transform: scale(0.9) translateY(0); opacity: 0.65; }
        100% { transform: scale(1.1) translateY(-2px); opacity: 1; }
      }
      .sticky-bubble {
        animation: bubblePulse ease-in-out infinite alternate;
      }
      @media (prefers-reduced-motion: reduce) {
        html { scroll-behavior: auto; }
        * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
      }
    `}</style>
  );
}