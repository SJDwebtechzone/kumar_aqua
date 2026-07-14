import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { getSpeciesBySlug, speciesList, buildDbSpecies } from "./speciesData";

import logo from "./assets/logo.png";

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
      y: Math.random() * 95 + 2.5,
      size: Math.random() * 10 + 7,
      background: backgrounds[colorIdx],
      borderColor: borderColors[colorIdx],
      glowColor: glowColors[colorIdx],
      opacity: Math.random() * 0.3 + 0.15,
      pulseDuration: Math.random() * 4 + 3
    };
  });
};

const splitSpeciesName = (name) => {
  if (name.includes("(")) {
    const parts = name.split("(");
    return {
      first: parts[0].trim(),
      second: "(" + parts[1]
    };
  }
  const lastSpaceIdx = name.lastIndexOf(" ");
  if (lastSpaceIdx !== -1) {
    return {
      first: name.substring(0, lastSpaceIdx).trim(),
      second: name.substring(lastSpaceIdx + 1)
    };
  }
  return {
    first: name,
    second: ""
  };
};

export default function SpeciesDetail() {
  const { slug } = useParams();
const [species, setSpecies] = useState(() => getSpeciesBySlug(slug));
const [loadingDb, setLoadingDb] = useState(false);

useEffect(() => {
  // Try static list first
  const staticSpecies = getSpeciesBySlug(slug);
  if (staticSpecies) { setSpecies(staticSpecies); return; }

  // If slug starts with db-, fetch from API
 if (slug.startsWith("db-")) {
  const id = slug.replace("db-", "");

  fetch(`${import.meta.env.VITE_API_URL}/fishes/${id}`)
    .then((r) => r.json())
    .then((fish) => setSpecies(buildDbSpecies(fish)))
    .catch(() => setSpecies(null));
}
}, [slug]);
  const [activeImage, setActiveImage] = useState(0);
  const [bubbles, setBubbles] = useState([]);
  const [stickyBubbles] = useState(() => generateStickyBubbles(30));
  const lastBubbleTime = useRef(0);
  const [tankSizeLiters, setTankSizeLiters] = useState(() => {
    if (slug === "shrimp") return 20;
    if (slug === "gold-angelfish") return 110;
    if (slug === "balloon-molly") return 75;
    return 40;
  });
  const [unit, setUnit] = useState("L");

 useEffect(() => {
  const staticSpecies = getSpeciesBySlug(slug);
  if (staticSpecies) { setSpecies(staticSpecies); return; }

  if (slug.startsWith("db-")) {
    setLoadingDb(true);
    const id = slug.replace("db-", "");
    fetch(`http://localhost:5000/api/fishes/${id}`)
      .then(r => r.json())
      .then(fish => { setSpecies(buildDbSpecies(fish)); setLoadingDb(false); })
      .catch(() => { setSpecies(null); setLoadingDb(false); });
  }
}, [slug]);

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
    if (now - lastBubbleTime.current < 65) return;
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

 if (loadingDb) return (
  <div className="min-h-screen flex items-center justify-center"
    style={{ background: "linear-gradient(180deg, #ECFEFF 0%, #67E8F9 100%)" }}>
    <p className="font-mono text-sm text-teal-600 tracking-widest">LOADING SPECIES…</p>
  </div>
);

if (!species) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center text-white text-center px-6"
        style={{ background: "linear-gradient(180deg, #ECFEFF 0%, #67E8F9 100%)" }}
      >
        <h1 className="font-display text-3xl font-semibold mb-4">Species Not Found</h1>
        <p className="font-body text-white/80 mb-6">We couldn't find the species you're looking for.</p>
        <Link
          to="/"
          className="px-6 py-3 rounded-full bg-white text-[#0A1C33] font-mono text-xs uppercase tracking-wider hover:bg-[#007b8a] hover:text-white transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    );
  }

  const otherSpecies = speciesList.filter((s) => s.slug !== slug);

  return (
    <div
      className="min-h-screen w-full text-[#0A1C33] font-body relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #ECFEFF 0%, #CFFAFE 35%, #A5F3FC 70%, #67E8F9 100%)" }}
      onMouseMove={handleInteraction}
      onClick={handleInteraction}
    >
      <style>{`
        @keyframes bubblePulse {
          0% { transform: scale(0.9) translateY(0); opacity: 0.65; }
          100% { transform: scale(1.1) translateY(-2px); opacity: 1; }
        }
        .sticky-bubble {
          animation: bubblePulse ease-in-out infinite alternate;
        }
      `}</style>

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
      {/* Simple header */}
      <header
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 py-3 min-h-[96px] backdrop-blur-md border-b border-[#FF7F50]/30"
        style={{ background: "rgba(3, 37, 53, 0.92)" }}
      >
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Kumar Aqua Farm"
            className="h-16 w-auto max-w-[140px] object-contain"
          />
        </Link>
        <Link
          to="/"
          className="font-mono text-xs uppercase tracking-widest text-white/80 hover:text-[#FF7F50] transition-colors"
        >
          ← Back to Home
        </Link>
      </header>

      <main className="pt-[120px] pb-20 px-6 md:px-16 max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="font-mono text-[11px] uppercase tracking-widest text-teal-deep mb-6">
          <Link to="/" className="hover:text-[#0A1C33] transition-colors">Home</Link>
          {" / "}
          <Link to="/#growout" className="hover:text-[#0A1C33] transition-colors">Aquarium Types</Link>
          {" / "}
          <span className="text-[#0A1C33]">{species.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Gallery & Interactive previews */}
          <div>
            <div className="rounded-3xl overflow-hidden shadow-lg aspect-[4/3] relative mb-4">
              <img
                src={species.gallery[activeImage]}
                alt={species.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-3">
              {species.gallery.map((img, idx) => (
                <button
                  key={img + idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors flex-shrink-0 ${
                    idx === activeImage ? "border-[#FF7F50]" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`${species.name} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Ideal For tags */}
            {species.idealFor && (
              <div className="flex flex-wrap gap-2 mt-6">
                {species.idealFor.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full bg-white/50 border border-[#FF7F50]/30 font-mono text-[10px] uppercase tracking-wider text-teal-deep"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Fun Fact callout */}
            {species.funFact && (
              <div className="glass-panel rounded-2xl p-5 mt-6 border-[#FF7F50]/20">
                <span className="font-mono text-[10px] uppercase tracking-widest text-teal-deep font-bold">Fun Fact</span>
                <p className="font-body text-sm text-[#0A1C33]/85 mt-2 leading-relaxed">{species.funFact}</p>
              </div>
            )}

            {/* Stocking Calculator */}
            <div className="glass-panel rounded-2xl p-5 mt-6 border-[#FF7F50]/20">
              <div className="flex justify-between items-center mb-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-teal-deep font-bold">Stocking Calculator</span>
                <div className="flex bg-[#007b8a]/10 rounded-lg p-0.5 border border-[#007b8a]/20">
                  <button
                    onClick={() => setUnit("L")}
                    className={`px-2 py-0.5 text-[10px] font-mono rounded-md transition-colors cursor-pointer ${
                      unit === "L" ? "bg-[#007b8a] text-white shadow-sm" : "text-teal-deep hover:text-[#0A1C33]"
                    }`}
                  >
                    Liters
                  </button>
                  <button
                    onClick={() => setUnit("Gal")}
                    className={`px-2 py-0.5 text-[10px] font-mono rounded-md transition-colors cursor-pointer ${
                      unit === "Gal" ? "bg-[#007b8a] text-white shadow-sm" : "text-teal-deep hover:text-[#0A1C33]"
                    }`}
                  >
                    Gallons
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                    <span className="text-[#0A1C33]/70">Tank Volume:</span>
                    <span className="font-bold text-[#0A1C33]">
                      {unit === "L"
                        ? `${tankSizeLiters} Liters`
                        : `${Math.round(tankSizeLiters / 3.78541)} Gallons`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={unit === "L" ? 10 : 3}
                    max={unit === "L" ? 300 : 80}
                    value={unit === "L" ? tankSizeLiters : Math.round(tankSizeLiters / 3.78541)}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      if (unit === "L") {
                        setTankSizeLiters(val);
                      } else {
                        setTankSizeLiters(Math.round(val * 3.78541));
                      }
                    }}
                    className="w-full h-1.5 bg-[#007b8a]/20 rounded-lg appearance-none cursor-pointer accent-[#FF7F50]"
                  />
                  <div className="flex justify-between text-[9px] font-mono text-teal-deep/60 mt-1">
                    <span>{unit === "L" ? "10L" : "3 Gal"}</span>
                    <span>{unit === "L" ? "300L" : "80 Gal"}</span>
                  </div>
                </div>

                {/* Calculation Output */}
                {(() => {
                  const tankSizeGals = tankSizeLiters / 3.78541;
                  let recommendedText = "";
                  let warningText = "";
                  let isUnderMin = false;
                  let advice = "";

                  if (species.slug === "shrimp") {
                    isUnderMin = tankSizeLiters < 18;
                    if (isUnderMin) {
                      warningText = "Tank is too small. Cherry Shrimp need at least 18L (5 Gallons) to maintain stable water parameters.";
                    } else {
                      const minShrimp = Math.max(5, Math.floor(tankSizeGals * 2));
                      const maxShrimp = Math.floor(tankSizeGals * 5);
                      recommendedText = `Ideal stocking: ${minShrimp} – ${maxShrimp} shrimp`;
                      advice = "Shrimp have low bioload and thrive in mature tanks with live moss (like Java Moss) and safe sponge filtration.";
                    }
                  } else if (species.slug === "gold-angelfish") {
                    isUnderMin = tankSizeLiters < 110;
                    if (isUnderMin) {
                      warningText = "Tank is too small. Angelfish require at least 110L (30 Gallons) and tall tank format for vertical fin growth.";
                    } else {
                      const maxAngels = 1 + Math.floor((tankSizeGals - 30) / 10);
                      recommendedText = `Recommended limit: Up to ${maxAngels} Angelfish`;
                      advice = "Angelfish are cichlids and can establish territories. Keep in monogamous pairs or groups of 5+ in spacious tanks.";
                    }
                  } else if (species.slug === "balloon-molly") {
                    isUnderMin = tankSizeLiters < 75;
                    if (isUnderMin) {
                      warningText = "Tank is too small. Balloon Mollies need a minimum of 75L (20 Gallons) to accommodate active swimming behavior.";
                    } else {
                      const maxMollies = 4 + Math.floor((tankSizeGals - 20) / 4);
                      recommendedText = `Recommended limit: Up to ${maxMollies} Balloon Mollies`;
                      advice = "Keep at least 2 to 3 females for every male to prevent male courting behaviors from stressing them.";
                    }
                  }

                  return (
                    <div className="space-y-3 pt-3 border-t border-[#FF7F50]/10">
                      {isUnderMin ? (
                        <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-3 text-xs text-rose-deep leading-relaxed flex gap-2">
                          <span className="text-sm">⚠️</span>
                          <span>{warningText}</span>
                        </div>
                      ) : (
                        <div className="bg-[#007b8a]/5 border border-[#007b8a]/10 rounded-xl p-3 text-xs text-[#0A1C33]/90 leading-relaxed">
                          <div className="font-semibold text-teal-deep text-sm mb-1">{recommendedText}</div>
                          <p className="text-[#0A1C33]/80 font-body text-[11px] leading-normal">{advice}</p>
                        </div>
                      )}
                      <div className="text-[9px] text-[#0A1C33]/50 italic font-mono text-center leading-normal">
                        *Stocking recommendations are estimates. Quality filtration and weekly water changes are essential.
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="glass-panel rounded-3xl p-6 md:p-8 border-[#FF7F50]/20">
            <span className="font-mono text-[10px] uppercase tracking-widest text-white bg-[#007b8a] px-2.5 py-1 rounded-full inline-block mb-4">
              {species.tag}
            </span>
            {(() => {
              const parts = splitSpeciesName(species.name);
              return (
                <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0A1C33] flex flex-wrap gap-x-2.5 gap-y-1">
                  <span className="relative pb-1.5 inline-block">
                    {parts.first}
                    <span className="absolute bottom-0 left-0 w-10 h-[2.5px] bg-[#FF7F50] rounded-full"></span>
                  </span>
                  {parts.second && (
                    <span className="text-[#FF7F50] font-light italic">{parts.second}</span>
                  )}
                </h1>
              );
            })()}
            <p className="font-mono text-sm italic text-teal-deep mt-1">{species.scientific}</p>

            <p className="font-body text-sm sm:text-base text-[#0A1C33]/85 mt-6 leading-relaxed">
              {species.longDesc}
            </p>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
              <SpecBadge label="Temp" value={species.temp} />
              <SpecBadge label="pH Range" value={species.ph} />
              <SpecBadge label="Tank Size" value={species.tank} />
              <SpecBadge label="Difficulty" value={species.difficulty} />
            </div>

            {/* Extended Care Info */}
            <div className="mt-10 space-y-6">
              <CareRow label="Diet" value={species.diet} />
              <CareRow label="Lifespan" value={species.lifespan} />
              <CareRow label="Tank Mates" value={species.tankMates} />
              <CareRow label="Breeding" value={species.breeding} />
            </div>

          </div>
        </div>

        {/* Compatibility lists — full width, own section for balanced layout */}
        {(species.compatibleWith?.length > 0 || species.avoid?.length > 0) && (
          <div className="grid sm:grid-cols-2 gap-6 mt-10">
            {species.compatibleWith && (
              <div className="glass-panel rounded-2xl p-5 border-[#FF7F50]/20">
                <h4 className="font-mono text-[11px] uppercase tracking-widest text-teal-deep font-bold mb-3">✓ Compatible With</h4>
                <ul className="space-y-1.5">
                  {species.compatibleWith.map((c) => (
                    <li key={c} className="font-body text-sm text-[#0A1C33]/85">{c}</li>
                  ))}
                </ul>
              </div>
            )}
            {species.avoid && (
              <div className="glass-panel rounded-2xl p-5 border-[#FF5757]/20">
                <h4 className="font-mono text-[11px] uppercase tracking-widest text-rose-deep mb-3">✕ Avoid Pairing With</h4>
                <ul className="space-y-1.5">
                  {species.avoid.map((c) => (
                    <li key={c} className="font-body text-sm text-[#0A1C33]/85">{c}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Setup Tips */}
       {species.setupTips && species.setupTips.length > 0 && (
          <div className="mt-20 pt-10 border-t border-[#FF7F50]/20">
            <h2 className="font-display text-2xl font-bold tracking-tight text-[#0A1C33] mb-6 flex flex-wrap gap-x-2 gap-y-0.5">
              <span className="relative pb-1.5 inline-block">
                Setup &amp;
                <span className="absolute bottom-0 left-0 w-8 h-[2.5px] bg-[#FF7F50] rounded-full"></span>
              </span>
              <span className="text-[#FF7F50] font-light italic">Care Tips</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {species.setupTips.map((tip, idx) => (
                <div key={idx} className="glass-panel glass-panel-hover rounded-2xl p-5 flex gap-4 border-[#FF7F50]/20">
                  <span className="font-display text-2xl text-[#FF7F50]/40 font-bold flex-shrink-0">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <p className="font-body text-sm text-[#0A1C33]/85 leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Species */}
        <div className="mt-20 pt-10 border-t border-[#FF7F50]/20">
          <h2 className="font-display text-2xl font-bold tracking-tight text-[#0A1C33] mb-6 flex flex-wrap gap-x-2 gap-y-0.5">
            <span className="relative pb-1.5 inline-block">
              Explore Other
              <span className="absolute bottom-0 left-0 w-10 h-[2.5px] bg-[#FF7F50] rounded-full"></span>
            </span>
            <span className="text-[#FF7F50] font-light italic">Species</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {otherSpecies.map((s) => (
              <Link
                key={s.slug}
                to={`/species/${s.slug}`}
                className="glass-panel glass-panel-hover rounded-2xl overflow-hidden flex items-center gap-4 p-4 border-[#FF7F50]/20"
              >
                <img src={s.image} alt={s.name} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
                <div>
                  <h3 className="font-display text-base font-semibold text-[#0A1C33]">{s.name}</h3>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-teal-deep">{s.tag}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function SpecBadge({ label, value }) {
  return (
    <div className="glass-panel rounded-xl p-3 text-center border-[#FF7F50]/20">
      <span className="block font-mono text-[9px] uppercase tracking-widest text-teal-deep font-bold">{label}</span>
      <span className="block font-body text-xs sm:text-sm text-[#0A1C33] font-semibold mt-1">{value}</span>
    </div>
  );
}

function CareRow({ label, value }) {
  return (
    <div>
      <h4 className="font-mono text-[11px] uppercase tracking-widest text-teal-deep font-bold mb-1.5">{label}</h4>
      <p className="font-body text-sm text-[#0A1C33]/85 leading-relaxed">{value}</p>
    </div>
  );
}
