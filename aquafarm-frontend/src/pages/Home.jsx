import React from "react";
import Hero from "../components/Hero";
import SpeciesDetailCard from "../components/SpeciesDetailCard";
import QualityStandards from "../components/QualityStandards";
import CareFAQ from "../components/CareFAQ";
import { speciesList } from "../speciesData";
import { useBanners } from "../hooks/useFishes";
import { useFishes } from "../hooks/useFishes";
import { buildDbSpecies } from "../speciesData";

export default function Home({ sectionRefs }) {
  const { banners } = useBanners();
const { fishes: featuredFish } = useFishes("featured");
const speciesData = (featuredFish && featuredFish.length > 0)
  ? [...speciesList, ...featuredFish.map(buildDbSpecies)]
  : speciesList;
  return (
    <section
      id="surface"
      data-zone="surface"
      ref={(el) => {
        if (sectionRefs && sectionRefs.current) {
          sectionRefs.current.surface = el;
        }
      }}
      style={{ background: "linear-gradient(180deg, #ECFEFF 0%, #CFFAFE 100%)" }}
      className="relative w-full min-h-screen pt-[96px] overflow-hidden"
    >
      {/* Floating Ambient Rays */}
      <div className="sunshaft"></div>
      <div className="sunshaft-2"></div>
     <Hero banner={banners[0]} />
      {/* Featured Species Section */}
      <div className="relative w-full px-6 md:px-16 pb-20 flex flex-col items-center justify-start max-w-6xl mx-auto pt-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-3 text-[#0A1C33] flex flex-wrap justify-center gap-x-3 gap-y-1">
            <span className="relative pb-3 inline-block">
              Featured
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[3px] bg-[#FF7F50] rounded-full"></span>
            </span>
            <span className="text-[#FF7F50] font-light italic">Specimens</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 w-full">
          {speciesData.map((sp) => (
  <SpeciesDetailCard key={sp.slug} sp={sp} />
))}
        </div>
      </div>
      {/* Quality Standards Section */}
      <div className="relative w-full px-6 md:px-16 pb-20 flex flex-col items-center justify-start max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block font-mono text-xs font-bold text-[#BE123C] bg-[#BE123C]/10 border border-[#BE123C]/20 px-4 py-1.5 rounded-full tracking-[0.2em] uppercase">Our Commitment</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-3 text-[#0A1C33] flex flex-wrap justify-center gap-x-3 gap-y-1">
            <span className="relative pb-3 inline-block">
              Our Quality
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-[3px] bg-[#FF7F50] rounded-full"></span>
            </span>
            <span className="text-[#FF7F50] font-light italic">Standards</span>
          </h2>
          <p className="font-body text-[#0A1C33]/80 mt-4 leading-relaxed text-sm sm:text-base">
            We raise every specimen with extreme care and scientific precision. Here are the core pillars that guarantee the health of our aquatic life.
          </p>
        </div>
        <QualityStandards />
      </div>
      {/* FAQ Acclimation Guide Section */}
      <div className="relative w-full px-6 md:px-16 pb-24 flex flex-col items-center justify-start max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block font-mono text-xs font-bold text-[#BE123C] bg-[#BE123C]/10 border border-[#BE123C]/20 px-4 py-1.5 rounded-full tracking-[0.2em] uppercase">Expert Guidance</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-3 text-[#0A1C33] flex flex-wrap justify-center gap-x-3 gap-y-1">
            <span className="relative pb-3 inline-block">
              Aquarium Care &
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-[3px] bg-[#FF7F50] rounded-full"></span>
            </span>
            <span className="text-[#FF7F50] font-light italic">Acclimation</span>
          </h2>
          <p className="font-body text-[#0A1C33]/80 mt-4 leading-relaxed text-sm sm:text-base">
            Acclimating new livestock correctly is the most important step to a healthy tank. Read our guide below to ensure your shrimp and fish thrive.
          </p>
        </div>
        <CareFAQ />
      </div>
    </section>
  );
}
