import React, { useRef } from "react";
import { Link } from "react-router-dom";

export default function SpeciesDetailCard({ sp }) {
  const cardRef = useRef(null);
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -(y - centerY) / 12; // tilt
    const rotateY = (x - centerX) / 12;
    card.style.setProperty("--tilt-x", `${rotateX}deg`);
    card.style.setProperty("--tilt-y", `${rotateY}deg`);
  };
  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--tilt-x", `0deg`);
    card.style.setProperty("--tilt-y", `0deg`);
  };
  return (
    <Link
      to={`/species/${sp.slug}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="tilt-card glass-panel rounded-3xl p-5 flex flex-col group transition-all duration-300 relative border-[#FF7F50]/20 hover:shadow-[0_20px_50px_rgba(0,50,60,0.15)] overflow-hidden block"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Specimen image container */}
      <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-black/40 relative shadow-inner mb-5">
        <img
          src={sp.image}
          alt={sp.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10 font-mono text-[9px] text-[#FF7F50] tracking-wider uppercase">
          {sp.tag}
        </div>
        <div className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-full bg-[#FF7F50] text-white font-mono text-[10px] font-semibold">
          {sp.difficulty}
        </div>
      </div>
      {/* Species info */}
      <div className="flex flex-col flex-grow">
        <h3 className="font-display text-xl text-[#0A1C33] font-semibold group-hover:text-[#FF7F50] transition-colors">{sp.name}</h3>
        <span className="font-mono text-xs text-teal-deep/80 italic mt-1">{sp.scientific}</span>

        <span className="font-mono text-xs uppercase tracking-widest text-teal-deep mt-4 inline-flex items-center gap-1 group-hover:gap-2 transition-all font-semibold">
          Read More →
        </span>
      </div>
    </Link>
  );
}
