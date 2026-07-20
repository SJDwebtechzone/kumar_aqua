import React from "react";
import { Link } from "react-router-dom";

export default function SpeciesDetailCard({ sp, index }) {
  const isEven = index % 2 === 0;
  
  return (
    <Link
      to={`/aquarium-types#${sp.slug}`}
      className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 group transition-all duration-500 w-full select-none ${isEven ? "" : "md:flex-row-reverse"}`}
    >
      <div className="w-full md:w-1/2 aspect-[4/3] rounded-[60%_40%_30%_70%_/_60%_30%_70%_40%] overflow-hidden bg-black/5 relative shadow-[0_15px_35px_rgba(0,40,60,0.15)] transition-all duration-[1000ms] ease-in-out group-hover:rounded-[40%_60%_60%_40%_/_50%_50%_50%_50%] border-4 border-white/60 ring-2 ring-[#FF7F50]/15 group-hover:ring-[#FF7F50]/40 group-hover:shadow-[0_20px_45px_rgba(245,158,11,0.22)] max-w-md mx-auto">
  {/* Original highly realistic fish/shrimp photo */}
  <img
    src={sp.image}
    alt={sp.name}
    loading="lazy"
    className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-108"
  />
</div>

      {/* 2. Clean, Borderless Text Content Floating directly on background */}
      <div className="w-full md:w-1/2 flex flex-col items-start text-left max-w-md mx-auto">
        {/* Title */}
        <h3 className="font-display text-2xl sm:text-3xl font-bold text-brass group-hover:text-[#FF7F50] transition-colors leading-tight">
  {sp.name}
</h3>
        
        {/* Scientific Label */}
        <span className="font-mono text-sm text-teal-deep font-semibold italic mt-1.5">
          {sp.scientific}
        </span>

        {/* Description */}
        <p className="font-body text-base font-semibold text-[#1E4D66] mt-4 leading-relaxed text-justify">
          {sp.desc}
        </p>

        {/* Read More Link */}
        <div className="font-mono text-xs uppercase tracking-widest text-[#FF7F50] mt-6 inline-flex items-center gap-1 group-hover:gap-2.5 transition-all font-bold">
          Explore Species Details <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </div>
      </div>
    </Link>
  );
}
