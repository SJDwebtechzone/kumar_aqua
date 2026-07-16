import React from "react";

const ZONES = [
  { id: "surface", label: "Home", depth: "0m" },
  { id: "shallows", label: "About Us", depth: "4m" },
  { id: "growout", label: "Aquarium Types", depth: "12m" },
  { id: "harbor", label: "Contact Us", depth: "18m" }
];

export default function DepthGauge({ activeZone, onSelect }) {
  if (window.location.pathname === "/admin") return null;
  return (
    <>
      {/* Scroll indicator - vertical bar */}
      <div className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-6" aria-label="Aquarium depth navigation">
        <div className="relative flex flex-col items-center" style={{ height: "240px" }}>
          <div className="w-[2px] h-full bg-[#FF7F50]/25 relative rounded-full">
            {/* Active thumb tracker line */}
            <div 
              className="absolute w-full bg-gradient-to-b from-[#FF7F50] to-[#E0663B] transition-all duration-500 rounded-full"
              style={{
                top: `${(ZONES.findIndex(z => z.id === activeZone) / (ZONES.length - 1)) * 80}%`,
                height: "20%"
              }}
            />
          </div>
        </div>
        <div className="absolute right-6 flex flex-col gap-8" style={{ top: "calc(50% - 120px)" }}>
          {ZONES.map((z) => {
            const isActive = activeZone === z.id;
            return (
              <button
                key={z.id}
                onClick={() => onSelect(z.id)}
                className="flex items-center gap-3 group focus:outline-none"
                aria-current={isActive}
              >
                <div className="flex flex-col items-end opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <span className="font-mono text-[9px] text-teal-deep leading-none">{z.depth}</span>
                  <span className="font-body text-[11px] text-[#0A1C33] font-semibold mt-0.5">{z.label}</span>
                </div>
                <span
                  style={{
                    width: isActive ? "15px" : "8px",
                    height: isActive ? "12px" : "6px",
                    borderRadius: "70%",
                    background: isActive ? "#FF7F50" : "rgba(255,127,80,0.3)",
                    boxShadow: isActive ? "0 0 10px #FF7F50" : "none",
                    transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  }}
                  className="group-hover:scale-125"
                />
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
