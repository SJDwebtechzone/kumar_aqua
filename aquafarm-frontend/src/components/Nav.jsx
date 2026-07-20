import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";

export default function Nav({ activeZone, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mobileMenuOpenRef = React.useRef(mobileMenuOpen);

 React.useEffect(() => {
  const handleScroll = () => {
    if (mobileMenuOpenRef.current) {
      setMobileMenuOpen(false);
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
  if (window.location.pathname === "/admin") return null;
  const menuItems = [
    { label: "HOME", id: "surface" },
    { label: "ABOUT US", id: "shallows" },
    { label: "AQUARIUM TYPES", id: "growout" },
    { label: "CONTACT US", id: "harbor" }
  ];
  return (
   <header 
  className="fixed left-0 right-0 top-0 z-40 backdrop-blur-md border-b border-[#FF7F50]/25"
  style={{
    background: "linear-gradient(180deg, rgba(5, 13, 24, 0.92) 0%, rgba(9, 34, 61, 0.88) 100%)"
  }}
>
      {/* Main Navbar */}
     <div className="flex items-center justify-between px-8 lg:px-14 h-32 py-3">
        <button
          onClick={() => {
            onNavigate("surface");
            setMobileMenuOpen(false);
          }}
          className="font-display flex items-center gap-2 group focus:outline-none"
        >
         <img
  src={logo}
  alt="Kumar Aqua Farm"
  className="h-20 lg:h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
/>
        </button>

        {/* Desktop Container (Contact Info on the Left, Nav menus on the Right) */}
       {/* Desktop Right Section */}
<div className="hidden md:flex items-center ml-auto">

  {/* Navigation */}
  <nav className="flex items-center gap-10 lg:gap-12 mr-10 font-mono text-[13px] tracking-[2px] font-semibold text-white uppercase">
    {menuItems.map((item) => (
      <button
        key={item.id}
        onClick={() => onNavigate(item.id)}
        className={`relative transition-all duration-300 hover:text-[#FF7F50]
          ${activeZone === item.id ? "text-[#FF7F50]" : ""}`}
      >
        {item.label}

        {activeZone === item.id && (
          <span className="absolute -bottom-2 left-0 w-full h-[2px] rounded-full bg-[#FF7F50]" />
        )}
      </button>
    ))}
  </nav>

  {/* Divider */}
  <div className="h-8 w-px bg-white/20"></div>

  {/* Contact */}
  <div className="flex items-center gap-8 ml-8 text-white whitespace-nowrap font-mono text-[13px] tracking-[2px] font-semibold uppercase">

    <a
      href="tel:+919080121326"
      className="flex items-center gap-2 hover:text-[#FF7F50] transition-colors duration-300"
    >
      <svg
        className="w-4 h-4 text-[#FF7F50]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>

      <span>
        +91 9080121326
      </span>
    </a>

    <div className="h-6 w-px bg-white/20"></div>

    <a
      href="mailto:rajesh@kumaraquatic.com"
      className="flex items-center gap-2 hover:text-[#FF7F50] transition-colors duration-300 normal-case"
    >
      <svg
        className="w-4 h-4 text-[#FF7F50]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>

      <span>
        rajesh<span className="font-sans font-normal">@</span>kumaraquatic.com
      </span>
    </a>

  </div>

</div>

        {/* Hamburger Menu Toggle Button (Mobile Only) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white hover:text-[#FF7F50] focus:outline-none p-1"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu Drawer */}
      {mobileMenuOpen && (
        <nav className="md:hidden flex flex-col gap-4 font-mono text-xs tracking-widest text-white mt-0 pb-6 px-6 border-t border-white/10 pt-4 w-full">
          {menuItems.map((item) => (
            <button 
              key={item.id + item.label}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }} 
              className={`text-left hover:text-[#FF7F50] transition-all focus:outline-none py-2 px-1 ${activeZone === item.id ? 'text-[#FF7F50] font-semibold border-l-2 border-[#FF7F50] pl-3' : ''}`}
            >
              {item.label}
            </button>
          ))}
          {/* Mobile contact info block */}
          <div className="flex flex-col gap-3.5 border-t border-white/10 pt-4 mt-2 font-mono text-[13px] tracking-[2px] font-semibold uppercase">
            <a href="tel:+919080121326" className="flex items-center gap-2 hover:text-[#FF7F50] transition-colors py-1 px-1">
              <svg className="w-4 h-4 text-[#FF7F50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+91 9080121326</span>
            </a>
            <a href="mailto:rajesh@kumaraquatic.com" className="flex items-center gap-2 hover:text-[#FF7F50] transition-colors py-1 px-1 normal-case">
              <svg className="w-4 h-4 text-[#FF7F50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>rajesh<span className="font-sans font-normal">@</span>kumaraquatic.com</span>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
