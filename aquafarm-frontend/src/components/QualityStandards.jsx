import React from "react";

const CARD_GRADIENT = "linear-gradient(135deg, #FEFBF3 0%, #FFFBEB 40%, #E0F2FE 100%)";

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
          className="glass-panel p-6 flex gap-4 group"
        >
          <div className="w-12 h-12 rounded-full bg-[#FF7F50]/15 border border-[#FF7F50]/30 flex items-center justify-center text-xl flex-shrink-0">
            {item.icon}
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-[#0A1C33] group-hover:text-[#FF7F50] transition-colors">
              {item.title}
            </h3>
            <p className="font-body text-base font-semibold text-[#1E4D66] mt-2 leading-relaxed text-left">
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
