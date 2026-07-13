import React from "react";

const CARD_GRADIENT = "linear-gradient(160deg, rgba(255,255,255,0.95) 0%, rgba(255,127,80,0.08) 45%, rgba(0,210,196,0.10) 100%)";

const STANDARDS_DATA = [
  {
    icon: "🛡️",
    title: "Biosecure Quarantine",
    desc: "Every single specimen goes through a strict 14-day observation and conditioning process in our isolated labs, ensuring they are 100% disease and parasite-free before shipment."
  },
  {
    icon: "🌿",
    title: "Ethical Aquaculture",
    desc: "We breed all species in-house in controlled environments. This sustainable aquaculture approach preserves natural wild habitats and ensures robust genetics."
  },
  {
    icon: "🧪",
    title: "Parameter Acclimation",
    desc: "Our fish and shrimp are pre-acclimated to standard tap water parameters (neutral pH and medium hardness). This ensures seamless transitions and zero shock in your tank."
  },
  {
    icon: "🧬",
    title: "Biologist Inspected",
    desc: "Our husbandry facilities are managed and checked daily by certified marine biologists, maintaining optimal water chemistry, premium nutrition, and high health standards."
  }
];

export default function QualityStandards() {
  return (
    <div className="grid sm:grid-cols-2 gap-6 w-full max-w-4xl mx-auto mt-12 text-left">
      {STANDARDS_DATA.map((item, idx) => (
        <div 
          key={idx} 
          className="rounded-2xl p-6 flex gap-4 transition-all duration-300 hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,50,60,0.08)] hover:shadow-[0_16px_40px_rgba(0,50,60,0.14)]"
          style={{ background: CARD_GRADIENT }}
        >
          <div className="w-12 h-12 rounded-full bg-[#FF7F50]/15 border border-[#FF7F50]/30 flex items-center justify-center text-xl flex-shrink-0">
            {item.icon}
          </div>
          <div>
            <h3 className="font-display text-base sm:text-lg font-semibold text-[#0A1C33]">
              {item.title}
            </h3>
            <p className="font-body text-xs sm:text-sm text-[#0A1C33]/80 mt-2 leading-relaxed">
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
