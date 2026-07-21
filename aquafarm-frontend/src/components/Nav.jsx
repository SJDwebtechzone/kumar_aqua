import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";

export default function Nav({ activeZone, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const mobileMenuOpenRef = React.useRef(false);

useEffect(() => {
  mobileMenuOpenRef.current = mobileMenuOpen;
}, [mobileMenuOpen]);
  

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
<header className="fixed top-5 left-0 right-0 z-50">
  <div
    className="max-w-7xl mx-auto rounded-2xl border border-white/10 backdrop-blur-xl"
    style={{
      background:
        "linear-gradient(180deg, rgba(5,20,40,.92), rgba(8,32,55,.90))",
      boxShadow: "0 20px 45px rgba(0,0,0,.35)",
    }}
  >
  <div className="max-w-7xl mx-auto h-24 px-6 lg:px-10 flex items-center justify-between">
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
  className="h-24 lg:h-28 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
/>
        </button>

        {/* Desktop Container (Contact Info on the Left, Nav menus on the Right) */}
  {/* Desktop Right Section */}
<div className="hidden lg:flex items-center ml-auto">

  {/* Navigation */}
  <nav className="flex items-center gap-10 xl:gap-14">

    {menuItems.map((item) => (
      <button
        key={item.id}
        onClick={() => onNavigate(item.id)}
        className={`group relative uppercase text-[14px] tracking-[3px] font-semibold transition-all duration-300 ${
          activeZone === item.id
            ? "text-[#18B6FF]"
            : "text-white hover:text-[#18B6FF]"
        }`}
      >
        {item.label}

        <span
          className={`absolute left-0 -bottom-3 h-[2px] rounded-full transition-all duration-300 ${
            activeZone === item.id
              ? "w-full bg-[#FF7F50]"
              : "w-0 group-hover:w-full bg-[#18B6FF]"
          }`}
        ></span>
      </button>
    ))}

  </nav>

  {/* Divider */}
  <div className="mx-8 h-16 w-px bg-white/15"></div>

  {/* Contact */}
<div className="flex flex-col gap-4 min-w-[280px]">

  {/* Phone */}
  <a
    href="tel:+919080121326"
    className="group flex items-center gap-4"
  >
    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-[#18B6FF] group-hover:bg-[#18B6FF]/10">

      <svg
        className="h-5 w-5 text-[#FF6B57]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>

    </div>

    <div>
      <p className="text-[11px] tracking-[4px] uppercase text-white/50">
        Call Us
      </p>

      <p className="text-[15px] font-semibold text-white">
        +91 9080121326
      </p>
    </div>
  </a>

  {/* Email */}
  <a
    href="mailto:rajesh@kumaraquatic.com"
    className="group flex items-center gap-4"
  >
    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-[#18B6FF] group-hover:bg-[#18B6FF]/10">

      <svg
        className="h-5 w-5 text-[#FF6B57]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>

    </div>

    <div>
      <p className="text-[11px] tracking-[4px] uppercase text-white/50">
        Email
      </p>

      <p className="text-[15px] font-semibold text-white">
        rajesh@kumaraquatic.com
      </p>
    </div>
  </a>

</div>

</div>

        {/* Hamburger Menu Toggle Button (Mobile Only) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-white hover:text-[#FF7F50] focus:outline-none p-1"
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
  <div className="lg:hidden border-t border-white/10 bg-[#071827]/95 backdrop-blur-2xl">

    <nav className="px-6 py-6">

      {/* Menu Items */}

      <div className="space-y-2">

        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              onNavigate(item.id);
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center justify-between rounded-xl px-5 py-4 transition-all duration-300 ${
              activeZone === item.id
                ? "bg-[#18B6FF]/15 text-[#18B6FF]"
                : "text-white hover:bg-white/5"
            }`}
          >

            <span className="tracking-[2px] font-semibold uppercase">
              {item.label}
            </span>

            <svg
              className="w-4 h-4 opacity-70"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>

          </button>
        ))}

      </div>

      {/* Divider */}

      <div className="my-6 h-px bg-white/10"></div>

      {/* Contact */}

      <div className="space-y-4">

        <a
          href="tel:+919080121326"
          className="flex items-center gap-4 rounded-xl bg-white/5 p-4 hover:bg-[#18B6FF]/10 transition"
        >

          <div className="h-10 w-10 rounded-full bg-[#18B6FF]/15 flex items-center justify-center">

            <svg
              className="w-5 h-5 text-[#18B6FF]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>

          </div>

          <div>

            <p className="text-xs text-white/50 uppercase tracking-[2px]">
              Call Us
            </p>

            <p className="text-white font-medium">
              +91 9080121326
            </p>

          </div>

        </a>

        <a
          href="mailto:rajesh@kumaraquatic.com"
          className="flex items-center gap-4 rounded-xl bg-white/5 p-4 hover:bg-[#18B6FF]/10 transition"
        >

          <div className="h-10 w-10 rounded-full bg-[#18B6FF]/15 flex items-center justify-center">

            <svg
              className="w-5 h-5 text-[#18B6FF]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>

          </div>

          <div>

            <p className="text-xs text-white/50 uppercase tracking-[2px]">
              Email
            </p>

            <p className="text-white font-medium normal-case break-all">
              rajesh@kumaraquatic.com
            </p>

          </div>

        </a>

      </div>
    </nav>
  </div>
)}

</div>
</header>
  );
}
