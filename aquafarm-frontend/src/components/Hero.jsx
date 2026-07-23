import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

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
    title: "Discover Premium",
    highlight: "Ornamental Fish",
    subtitle:
      "Handpicked healthy varieties of Molly, Angelfish, Shrimps and aquatic life directly from our premium breeding farm.",

    button1: "Explore Collection",
    button1Link: "/aquarium-types",

    button2: "Contact Us",
    button2Link: "/contact",

    image: "/images/shrimp.jpg",
  },

  {
    title: "Healthy Exotic Fish",
    highlight: "for Every Aquarium",
    subtitle:
      "Premium quality ornamental fish, shrimp, aquatic plants and aquarium accessories carefully selected for your aquarium.",

    button1: "View Collection",
    button1Link: "/aquarium-types#more-stock",

    button2: "",
    button2Link: "",

    image: "/images/gold-angelfish.jpg",
  },

  {
    title: "Exotic Breeding &",
    highlight: "Healthy Livestock",
    subtitle:
      "As a premier ornamental fish farm, we specialize in breeding and supplying high-quality, healthy exotic fish and shrimps.",

    button1: "View Livestock",
    button1Link: "/aquarium-types#more-stock",

    button2: "",
    button2Link: "",

    image: "/images/balloon-molly.jpg",
  },
];
export default function Hero({ banner }) {

const navigate = useNavigate();
const handleNavigation = (link) => {
  if (link === "/contact") {
    navigate("/contact");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  } else if (link === "/aquarium-types") {
    navigate("/aquarium-types");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  } else if (link === "/aquarium-types#more-stock") {
    navigate("/aquarium-types#more-stock");
  }
};
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
  }, [heroSlides.length]);

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
  const slideClass = isActive 
    ? "opacity-100 pointer-events-auto z-20" 
    : "opacity-0 pointer-events-none z-10";

          return (
            <div
  key={slide.title}
  className={`absolute inset-0 carousel-transition ${slideClass}`}
>
  {/* Background */}
  <img
    src={slide.image}
    alt={slide.title}
    className="absolute inset-0 w-full h-full object-cover animate-zoom-breathing"
  />

  {/* Overlay */}
  <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#061B2F]/90 via-[#061B2F]/65 to-transparent"></div>

  {/* Content */}
  <div className="relative z-30 flex items-center h-full">

    <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 pt-20 sm:pt-24 pb-24 sm:pb-32 lg:py-0">

     <div
  className={`max-w-2xl transition-all duration-1000 ${
    isActive
      ? "translate-x-0 opacity-100"
      : "-translate-x-10 opacity-0"
  }`}
>

        <p className="text-[#18B6FF] uppercase tracking-[4px] text-sm font-semibold mb-4">
          Premium Aquarium Solutions
        </p>

        <h1 className="text-white font-bold leading-tight text-4xl md:text-6xl">
          {slide.title}
          <br />

          <span className="text-[#18B6FF]">
            {slide.highlight}
          </span>

        </h1>

        <div className="w-20 h-1 bg-[#FF7F50] mt-5 mb-6 rounded-full"></div>

        <p className="text-gray-200 text-lg leading-8 max-w-xl">
          {slide.subtitle}
        </p>
<div className="flex items-center gap-3 sm:gap-5 mt-8 sm:mt-10">

  <button
    onClick={() => handleNavigation(slide.button1Link)}
    className="px-4 py-2.5 sm:px-8 sm:py-4 rounded-xl bg-[#FF7F50] text-white text-sm sm:text-base font-semibold hover:bg-[#ff8d66] transition whitespace-nowrap"
  >
    {slide.button1}
  </button>

  {slide.button2 && (
    <button
      onClick={() => handleNavigation(slide.button2Link)}
      className="px-4 py-2.5 sm:px-8 sm:py-4 rounded-xl border border-white text-white text-sm sm:text-base font-semibold hover:bg-white hover:text-[#061B2F] transition whitespace-nowrap"
    >
      {slide.button2}
    </button>
  )}

</div>
      </div>

    </div>

  </div>
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
        {heroSlides.map((_, idx) => (
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
