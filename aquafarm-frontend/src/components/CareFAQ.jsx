import React, { useState } from "react";

const FAQ_DATA = [
  {
    question: "How should I acclimate my new fish or shrimp?",
    answer: "We strongly recommend the drip acclimation method for all specimens, especially delicate dwarf shrimp. Float the closed shipping bag in your tank for 15-20 minutes to equalize water temperature. Then, pour the water and specimens into a clean container and use airline tubing with a control valve to drip water from your tank into the container at a rate of 2-3 drops per second. Once the water volume has doubled, discard half the water and repeat. After 1 hour, net the specimens and release them into your tank (avoid adding shipping water directly to your aquarium)."
  },
  {
    question: "What are the ideal water parameters for Neocaridina shrimp?",
    answer: "Cherry Shrimp (Neocaridina davidi) are highly adaptable, but they thrive best in stable conditions. The ideal parameters are: Temperature: 20°C - 26°C, pH: 6.8 - 7.8, General Hardness (gH): 6 - 8 dGH, Carbonate Hardness (kH): 2 - 5 dKH, and TDS (Total Dissolved Solids): 150 - 250 ppm. Most importantly, ensure your tank is fully cycled with zero Ammonia and Nitrites, as invertebrates are highly sensitive to nitrogenous waste."
  },
  {
    question: "How often should I feed my Moon Tail Mollies and Cherry Shrimp?",
    answer: "Feed your species in small quantities. Moon Tail Mollies are active omnivores and should be fed high-quality flakes, micro-pellets, and frozen foods (like daphnia or brine shrimp) 1-2 times daily, only what they can consume in 2 minutes. Cherry Shrimp primarily graze on natural algae and biofilm in a mature tank. Supplement their diet 2-3 times a week with shrimp-specific sinking wafers, blanched organic spinach, or zucchini. Remove uneaten food after 2 hours to maintain pristine water quality."
  },
  {
    question: "Do you ship live specimens, and is there a live-arrival guarantee?",
    answer: "Yes, we ship all live specimens in double-insulated boxes with heat packs or ice packs depending on the season, using express courier services. We provide a 100% Live-Arrival Guarantee. In the rare event of a Dead On Arrival (DOA), please send a clear photo of the specimens in their unopened shipping bag within 2 hours of delivery, and we will issue a full refund or send replacement specimens immediately."
  }
];

export default function CareFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 space-y-4">
      {FAQ_DATA.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div 
            key={idx} 
            className="glass-panel rounded-2xl border-[#FF7F50]/20 overflow-hidden bg-white/5 backdrop-blur-md transition-all duration-300 hover:bg-white/10 group"
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 text-[#0A1C33] focus:outline-none"
            >
              <span className="font-display text-lg font-bold leading-snug group-hover:text-[#FF7F50] transition-colors">
                {faq.question}
              </span>
              <span 
                className={`w-6.5 h-6.5 rounded-full bg-[#FF7F50]/10 border border-[#FF7F50]/30 flex items-center justify-center text-[10px] transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#FF7F50] text-white' : 'text-[#FF7F50]'}`}
              >
                ▼
              </span>
            </button>
            <div 
              className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] border-t border-[#FF7F50]/10' : 'max-h-0'}`}
              style={{ overflow: 'hidden' }}
            >
              <div className="px-6 py-5 text-base font-semibold leading-relaxed text-[#1E4D66] font-body">
                {faq.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
