import React from "react";

const ZONE_BG = {
  surface: "transparent",
  shallows: "transparent",
  growout: "transparent",
  harbor: "transparent",
};

export default function Section({ id, zone, refCb, children }) {
  const isHarbor = id === "harbor";
  return (
    <section
      id={id}
      data-zone={id}
      ref={refCb}
      className={`relative w-full flex flex-col items-center justify-start px-6 md:px-16 pt-[120px] md:pt-[140px] pb-16 ${isHarbor ? "min-h-0" : "min-h-screen"} overflow-hidden`}
      style={{ background: ZONE_BG[zone] }}
    >
      {/* Wave top border for organic separation */}
      {id !== "surface" && (
        <div className="wave-svg wave-svg-top">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="opacity-20" fill="#FF7F50"></path>
          </svg>
        </div>
      )}
      {/* Floating Sea Currents / Water Light Glow Effect */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-tr from-[#FF7F50]/10 via-transparent to-[#007b8a]/10 mix-blend-multiply animate-pulse duration-[10s]" />

      <div className={`relative z-20 w-full max-w-6xl flex flex-col flex-grow ${isHarbor ? "min-h-0" : "min-h-[calc(100vh-184px)]"}`}>
        {children}
      </div>
      {/* Wave bottom border */}
      {id !== "harbor" && (
        <div className="wave-svg wave-svg-bottom">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="opacity-15" fill="#FF7F50"></path>
          </svg>
        </div>
      )}
    </section>
  );
}
