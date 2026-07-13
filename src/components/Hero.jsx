import React, { useState, useEffect, useRef } from "react";

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

const HERO_SLIDES = [
  {
    title: "Cherry Shrimp (Red/Yellow)",
    scientific: "Neocaridina davidi",
    category: "Vibrant Aquascape Cleanup",
    desc: "Stunning active dwarf shrimp selectively bred for deep cherry red and lemon yellow opaque coloring. Excellent cleaning crew that feeds on algae.",
    image: "/images/shrimp.jpg",
    accentColor: "#FF5757",
    temp: "18°C - 27°C",
    ph: "6.5 - 8.0",
    tank: "18L (5 Gallons) min",
  },
  {
    title: "Gold Angelfish",
    scientific: "Pterophyllum scalare",
    category: "Majestic Cichlid Royalty",
    desc: "Graceful triangular shape with striking solid metallic-gold luster. High, tall fins. Highly interactive, displays responsive personality to keepers.",
    image: "/images/gold-angelfish.jpg",
    accentColor: "#FFD700",
    temp: "24°C - 30°C",
    ph: "6.0 - 7.4",
    tank: "110L (30 Gallons) min",
  },
  {
    title: "Balloon Molly",
    scientific: "Poecilia latipinna var.",
    category: "Playful Rounded Livebearers",
    desc: "Distinctive round pot-belly shape with vibrant patterns. Highly active and playful swimmers that thrive in community aquariums.",
    image: "/images/balloon-molly.jpg",
    accentColor: "#00E5FF",
    temp: "22°C - 28°C",
    ph: "7.0 - 8.5",
    tank: "75L (20 Gallons) min",
  },
];

export default function Hero({ banner }) {
  const heroSlides = banner
  ? [...HERO_SLIDES, { title: banner.title, scientific: "", category: banner.subtitle || "", desc: banner.subtitle || "", image: banner.imageUrl, accentColor: "#FF7F50", temp: "", ph: "", tank: "" }]
  : HERO_SLIDES;
  const [currentSlide, setCurrentSlide] = useState(0);

  const autoPlayRef = useRef();

  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
     setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000); // 7 seconds per slide
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, []);

  const [bubbles, setBubbles] = useState([]);

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
      setBubbles((prev) => [...prev.slice(-35), newBubble]);
    }, 380);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = (e) => {
  e.stopPropagation();
  setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
};

const prevSlide = (e) => {
  e.stopPropagation();
  setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
};

  return (
    <div 
      className="relative w-full min-h-[calc(100vh-96px)] flex items-center justify-center overflow-hidden"
    >
      {/* Slides Container */}
      <div className="relative w-full h-full min-h-[calc(100vh-96px)] flex items-center justify-center">
    
{heroSlides.map((slide, idx) => {
  const isActive = idx === currentSlide;
  let slideClass = "opacity-0 translate-x-full scale-95 pointer-events-none";
  if (isActive) {
    slideClass = "opacity-100 translate-x-0 scale-100 pointer-events-auto z-20";
  } else if (
    idx === currentSlide - 1 ||
    (currentSlide === 0 && idx === heroSlides.length - 1)
  ) {
    slideClass = "opacity-0 -translate-x-full scale-95 pointer-events-none z-10";
  }

          return (
            <div
              key={slide.title}
              className={`absolute inset-0 flex items-center w-full h-full carousel-transition ${slideClass}`}
            >
              {/* Slide Full-Bleed Background Image */}
              <img 
                src={slide.image} 
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover z-0 select-none animate-zoom-breathing"
              />
            </div>
          );
        })}
      </div>

      {/* Bubble Rendering Layer on top of banner images */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-25">
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

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/20 backdrop-blur-md border border-white/20 text-white hover:text-[#FF7F50] hover:bg-black/40 transition-all hover:scale-105 active:scale-95 focus:outline-none"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/20 backdrop-blur-md border border-white/20 text-white hover:text-[#FF7F50] hover:bg-black/40 transition-all hover:scale-105 active:scale-95 focus:outline-none"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-35 flex gap-2.5">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => { e.stopPropagation(); setCurrentSlide(idx); }}
            className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-[#FF7F50] w-8' : 'bg-white/30 hover:bg-white/50'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
