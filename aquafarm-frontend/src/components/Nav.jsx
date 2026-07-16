import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";

export default function Nav({ activeZone, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    // Initialise on mount
    setPrevScrollPos(window.scrollY);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // Auto-close hamburger menu on scroll
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }

      // Hide nav bar when scrolling down, show when scrolling up
      if (prevScrollPos > currentScrollPos) {
        // Scrolling up
        setVisible(true);
      } else if (currentScrollPos > 110) {
        // Scrolling down & passed header height
        setVisible(false);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, mobileMenuOpen]);

  if (window.location.pathname === "/admin") return null;
  const menuItems = [
    { label: "HOME", id: "surface" },
    { label: "ABOUT US", id: "shallows" },
    { label: "AQUARIUM TYPES", id: "growout" },
    { label: "CONTACT US", id: "harbor" }
  ];
  return (
    <header 
      className={`fixed left-0 right-0 z-40 backdrop-blur-md border-b border-[#FF7F50]/30 transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`} 
      style={{ top: 0, background: "rgba(3, 37, 53, 0.92)" }}
    >
      {/* Main Navbar */}
      <div className="flex items-center justify-between px-6 md:px-12 py-3.5">
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
            className="h-20 md:h-26 w-auto max-w-[240px] object-contain group-hover:scale-110 transition-transform" 
          />
        </button>

        {/* Desktop Container (Contact Info on the Left, Nav menus on the Right) */}
        <div className="hidden md:flex items-center gap-8">
          {/* Desktop Links */}
          <nav className="flex gap-8 font-mono text-xs tracking-widest text-white">
            {menuItems.map((item) => (
              <button 
                key={item.id + item.label}
                onClick={() => onNavigate(item.id)} 
                className={`hover:text-[#FF7F50] hover:scale-105 transition-all focus:outline-none relative py-1 ${activeZone === item.id ? 'text-[#FF7F50] font-semibold' : ''}`}
              >
                {item.label}
                {activeZone === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF7F50] rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Vertical Divider Line */}
          <span className="h-4 w-[1px] bg-white/20" />

          {/* Contact Info (Right of nav menus, bold and white, matches nav style) */}
          <div className="flex items-center gap-4 font-mono text-xs tracking-widest text-white font-bold py-1">
            <a href="tel:+919080121326" className="flex items-center gap-1.5 text-white font-bold hover:text-[#FF7F50] transition-colors">
              <svg className="w-3.5 h-3.5 text-[#FF7F50]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+91 9080121326</span>
            </a>
            <span className="text-white/20">|</span>
            <a href="mailto:rajesh@kumaraquatic.com" className="flex items-center gap-1.5 text-white font-bold hover:text-[#FF7F50] transition-colors">
              <svg className="w-3.5 h-3.5 text-[#FF7F50]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>rajesh@kumaraquatic.com</span>
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
          <div className="flex flex-col gap-3.5 border-t border-white/10 pt-4 mt-2 font-mono text-xs tracking-widest font-bold">
            <a href="tel:+919080121326" className="flex items-center gap-2 hover:text-[#FF7F50] transition-colors py-1 px-1">
              <svg className="w-4 h-4 text-[#FF7F50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+91 9080121326</span>
            </a>
            <a href="mailto:rajesh@kumaraquatic.com" className="flex items-center gap-2 hover:text-[#FF7F50] transition-colors py-1 px-1">
              <svg className="w-4 h-4 text-[#FF7F50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>rajesh@kumaraquatic.com</span>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
