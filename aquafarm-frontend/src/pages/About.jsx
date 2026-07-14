import React from "react";
import Section from "../components/Section";

function Shallows() {
  const stats = [
    { value: "20+", label: "Years of Aquaculture" },
    { value: "40+", label: "Species Raised" },
    
    { value: "98%", label: "Quarantine Success Rate" },
  ];
  const values = [
    {
      icon: "🧬",
      title: "Ethical Breeding",
      note: "Selective breeding programs prioritize genetic diversity and long-term species health over rapid turnover.",
    },
    {
      icon: "🛡️",
      title: "Quarantine Protocols",
      note: "Every batch passes through isolated quarantine tanks with strict health screening before ever reaching a customer.",
    },
    {
      icon: "🌱",
      title: "Sustainable Practices",
      note: "Closed-loop water systems and responsible sourcing reduce our environmental footprint at every stage.",
    },
    {
      icon: "🎓",
      title: "Expert Care Team",
      note: "Our biologists and aquaculture technicians bring decades of combined experience in freshwater husbandry.",
    },
  ];
  const steps = [
    { name: "Hatchery Nurseries", count: "01", note: "Selective egg hatching under controlled salinity. Larvae fed microscopic rotifers to boost early shell and skeletal health." },
    { name: "Planted Shallow Growouts", count: "02", note: "Cherry shrimp are raised in sub-tropical, high-oxygen moss jungles, allowing natural biofilm feeding and pigmentation enhancement." },
    { name: "Current Conditioning", count: "03", note: "Gold Angelfish and Mollies are conditioned in gentle circular flow channels, building fin strength and symmetric body structure." },
  ];

  return (
    <div className="py-0 w-full">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="inline-block font-mono text-xs font-bold text-[#BE123C] bg-[#BE123C]/10 border border-[#BE123C]/20 px-4 py-1.5 rounded-full tracking-[0.2em] uppercase">About Us</span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-3 text-[#0A1C33] flex flex-wrap justify-center gap-x-3 gap-y-1">
          <span className="relative pb-3 inline-block">
            Raising Aquatic Life
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-[3px] bg-[#FF7F50] rounded-full"></span>
          </span>
          <span className="text-[#FF7F50] font-light italic">with precision.</span>
        </h2>
        <p className="font-body text-[#0A1C33]/80 mt-4 text-sm sm:text-base">
          Our bio-secured pools duplicate the exact minerals, vegetation, and natural light cycles required for robust physiological development.
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
        {stats.map((s) => (
          <div
            key={s.label}
            className="glass-panel rounded-2xl py-6 px-4 text-center border-[#FF7F50]/20"
          >
            <div className="font-display text-2xl sm:text-3xl font-semibold text-teal-deep">{s.value}</div>
            <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#0A1C33]/70 mt-2">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Story + Image Block */}
      <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center mb-20">
        <div className="rounded-3xl overflow-hidden shadow-lg aspect-[4/3] relative">
          <img
            src="/images/three-fish-banner.jpg"
            alt="Kumar Aqua Farm species"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <span className="inline-block font-mono text-xs font-bold text-[#BE123C] bg-[#BE123C]/10 border border-[#BE123C]/20 px-4 py-1.5 rounded-full tracking-[0.2em] uppercase">Our Story</span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mt-3 text-[#0A1C33] flex flex-wrap gap-x-2.5 gap-y-1">
            <span className="relative pb-1.5 inline-block">
              Born from a
              <span className="absolute bottom-0 left-0 w-10 h-[2.5px] bg-[#FF7F50] rounded-full"></span>
            </span>
            <span className="text-[#FF7F50] font-light italic">passion for aquatic life</span>
          </h3>
          <p className="font-body text-sm sm:text-base text-[#0A1C33]/85 mt-4 leading-relaxed">
            Kumar Aqua Farm began as a small backyard hatchery focused on cherry shrimp and grew into a full-scale aquaculture operation supplying hobbyists and retailers alike. Every specimen that leaves our facility has been raised, conditioned, and health-checked according to the same standards we'd want for our own home aquariums.
          </p>
          <p className="font-body text-sm sm:text-base text-[#0A1C33]/85 mt-4 leading-relaxed">
            We believe healthy aquatic ecosystems start with responsible breeding — not mass production. That philosophy shapes every tank, every water change, and every animal we send out the door.
          </p>
        </div>
      </div>

      {/* Values Grid */}
      <div className="mb-20">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="inline-block font-mono text-xs font-bold text-[#BE123C] bg-[#BE123C]/10 border border-[#BE123C]/20 px-4 py-1.5 rounded-full tracking-[0.2em] uppercase">What Guides Us</span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mt-3 text-[#0A1C33] flex flex-wrap justify-center gap-x-2.5 gap-y-1">
            <span className="relative pb-3 inline-block">
              Our Core
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[2.5px] bg-[#FF7F50] rounded-full"></span>
            </span>
            <span className="text-[#FF7F50] font-light italic">Values</span>
          </h3>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {values.map((v) => (
            <div
              key={v.title}
              className="glass-panel glass-panel-hover rounded-2xl p-6 text-center border-[#FF7F50]/20"
            >
              <div className="text-3xl mb-3">{v.icon}</div>
              <h4 className="font-display text-base font-semibold text-[#0A1C33]">{v.title}</h4>
              <p className="font-body text-xs text-[#0A1C33]/75 mt-2 leading-relaxed">{v.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Rearing Process Steps */}
      <div>
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="inline-block font-mono text-xs font-bold text-[#BE123C] bg-[#BE123C]/10 border border-[#BE123C]/20 px-4 py-1.5 rounded-full tracking-[0.2em] uppercase">How We Raise Them</span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mt-3 text-[#0A1C33] flex flex-wrap justify-center gap-x-2.5 gap-y-1">
            <span className="relative pb-3 inline-block">
              Our Rearing
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-[2.5px] bg-[#FF7F50] rounded-full"></span>
            </span>
            <span className="text-[#FF7F50] font-light italic">Process</span>
          </h3>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div
              key={s.name}
              className="glass-panel glass-panel-hover rounded-2xl p-6 relative border-[#FF7F50]/20 overflow-hidden group"
            >
              <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-cyan-500/5 group-hover:bg-cyan-500/10 rounded-full blur-xl transition-colors duration-300" />
              <div className="flex justify-between items-start mb-6">
                <span className="font-mono text-xs text-teal-deep px-2 py-0.5 rounded bg-[#FF7F50]/10 border border-[#FF7F50]/25">STAGE {s.count}</span>
                <span className="font-mono text-4xl text-[#FF7F50]/15 font-bold group-hover:text-[#FF7F50]/35 transition-colors">#{s.count}</span>
              </div>
              <h3 className="font-display text-xl text-[#0A1C33] font-semibold mt-2 group-hover:text-[#FF7F50] transition-colors">
                {s.name}
              </h3>
              <p className="font-body text-xs sm:text-sm text-[#0A1C33]/85 mt-3.5 leading-relaxed">
                {s.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function About({ sectionRefs }) {
  return (
    <Section 
      id="shallows" 
      refCb={(el) => {
        if (sectionRefs && sectionRefs.current) {
          sectionRefs.current.shallows = el;
        }
      }} 
      zone="shallows"
    >
      <Shallows />
    </Section>
  );
}
