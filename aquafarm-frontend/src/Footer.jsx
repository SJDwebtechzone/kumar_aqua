import React from "react";
import { Link } from "react-router-dom";
import logo from "./assets/logo.png";

/* Simple inline SVG icons — no extra dependencies needed */
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.79c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M23.5 6.5s-.23-1.64-.94-2.36c-.9-.94-1.9-.94-2.36-1C17.06 3 12 3 12 3h-.01s-5.06 0-8.19.14c-.46.06-1.46.06-2.36 1C.74 4.86.5 6.5.5 6.5S.25 8.42.25 10.35v1.3c0 1.93.25 3.85.25 3.85s.24 1.64.94 2.36c.9.94 2.08.9 2.6 1.01C5.94 21 12 21 12 21s5.06 0 8.19-.14c.46-.06 1.46-.06 2.36-1 .71-.72.94-2.36.94-2.36s.25-1.92.25-3.85v-1.3c0-1.93-.25-3.85-.25-3.85ZM9.75 14.98V8.87l6.16 3.06-6.16 3.05Z" />
    </svg>
  );
}
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M17.47 14.38c-.29-.15-1.72-.85-1.99-.94-.27-.1-.46-.15-.66.15-.19.29-.75.94-.92 1.13-.17.19-.34.22-.63.07-.29-.15-1.22-.45-2.32-1.43-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.15-.15.34-.39.51-.58.17-.19.22-.34.34-.56.11-.22.06-.41-.03-.56-.09-.15-.63-1.51-.86-2.07-.23-.55-.46-.48-.63-.49-.16-.01-.34-.01-.53-.01-.19 0-.5.07-.75.34-.26.27-1 .98-1 2.39 0 1.41 1.03 2.77 1.17 2.96.15.19 2.04 3.11 4.95 4.24 2.9 1.13 2.9.75 3.42.7.52-.04 1.72-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.27-.19-.56-.34ZM12.02 21.5h-.01c-1.7 0-3.36-.45-4.81-1.32l-.35-.21-3.58.94.95-3.49-.23-.36A9.42 9.42 0 0 1 2.5 12c0-5.24 4.28-9.5 9.53-9.5 2.54 0 4.93.99 6.73 2.79a9.42 9.42 0 0 1 2.79 6.73c0 5.24-4.28 9.48-9.53 9.48Zm8.1-17.6A11.4 11.4 0 0 0 12.03.5C5.94.5 1 5.44 1 11.5c0 2.03.55 4 1.6 5.73L1 23.5l6.44-1.69a11.5 11.5 0 0 0 4.58.95h.01c6.09 0 11.03-4.94 11.03-11a10.9 10.9 0 0 0-3.94-8.86Z" />
    </svg>
  );
}

export default function Footer({ onNavigate }) {
 if (window.location.pathname === "/admin") return null; 
  const quickLinks = [
    { label: "Home", id: "surface" },
    { label: "About Us", id: "shallows" },
    { label: "Aquarium Types", id: "growout" },
    { label: "Contact Us", id: "harbor" },
  ];
  const speciesLinks = [
    { label: "Cherry Shrimp", slug: "shrimp" },
    { label: "Gold Angelfish", slug: "gold-angelfish" },
    { label: "Balloon Molly", slug: "balloon-molly" },
  ];
  const socials = [
    { label: "Facebook", Icon: FacebookIcon, href: "#" },
    { label: "Instagram", Icon: InstagramIcon, href: "#" },
    { label: "YouTube", Icon: YouTubeIcon, href: "#" },
    { label: "WhatsApp", Icon: WhatsAppIcon, href: "https://wa.me/919080121326" },
  ];

  return (
<footer
  className="relative w-full text-white font-body px-6 md:px-16 pt-8 pb-6 border-t border-[#FF7F50]/20"
  style={{
    background: "linear-gradient(180deg, rgba(6, 17, 31, 0.92) 0%, rgba(5, 13, 24, 0.96) 100%)",
    backdropFilter: "blur(10px)"
  }}
>
  <div className="flex items-center justify-center gap-5 mb-10">

  <div className="w-32 h-px bg-gradient-to-r from-transparent to-cyan-400/60"></div>

  <div className="w-12 h-12 rounded-full border border-cyan-400/30 flex items-center justify-center bg-white/5">
    🌊
  </div>

  <div className="w-32 h-px bg-gradient-to-l from-transparent to-cyan-400/60"></div>

</div>
      <div className="max-w-6xl mx-auto">
        {/* Top grid */}
        <div className="grid md:grid-cols-5 gap-8 md:gap-6 pb-8 border-b border-[#FF7F50]/20">
          {/* Brand column - spans 2 cols for balance */}
          <div className="md:col-span-2">
            <img
              src={logo}
              alt="Kumar Aqua Farm"
              className="h-20 md:h-24 w-auto max-w-none object-contain mb-3 -ml-1"
            />
            <p className="font-body text-xs sm:text-sm text-white leading-relaxed max-w-xs">
              Biologically conditioned husbandry for hobbyists and retailers. Ethically bred, quarantine-cleared, and ready for your aquarium.
            </p>
            <div className="flex gap-2.5 mt-4">
              {socials.map(({ label, Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="
w-10
h-10
rounded-full
border
border-cyan-400/20
bg-white/5
flex
items-center
justify-center
text-white
hover:bg-[#FF7F50]
hover:border-[#FF7F50]
hover:scale-110
transition-all
duration-300
"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono text-sm font-bold uppercase tracking-widest text-[#FF7F50] mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => onNavigate(l.id)}
                    className="text-xs sm:text-sm text-white hover:text-[#FF7F50] transition-colors focus:outline-none"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Species */}
          <div>
            <h4 className="font-mono text-sm font-bold uppercase tracking-widest text-[#FF7F50] mb-3">Species Catalog</h4>
            <ul className="space-y-2">
              {speciesLinks.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/aquarium-types#${s.slug}`}
                    className="text-xs sm:text-sm text-white hover:text-[#FF7F50] transition-colors block"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-sm font-bold uppercase tracking-widest text-[#FF7F50] mb-3">Contact</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white">
              <li className="flex items-start gap-2">
                <span>📞</span>
                <a href="tel:+919080121326" className="hover:text-[#FF7F50] transition-colors">9080121326</a>
              </li>
              <li className="flex items-start gap-2">
                <span>✉️</span>
                <a href="mailto:rajesh@kumaraquatic.com" className="hover:text-[#FF7F50] transition-colors">rajesh@kumaraquatic.com</a>
              </li>
           <li className="flex items-start gap-2">
                <span>📍</span>
                <span className="text-xs sm:text-sm leading-relaxed">
<span className="whitespace-nowrap block">264, Mahatma Gandhi Nagar,</span>
                  200ft Road,
                  <br />
                  Kolattur, Chennai-99.
                </span>
              </li>
            </ul>
          </div>
        </div>
        {/* Developer credit line */}
        <div className="pt-4 text-center text-[10px] sm:text-[11px] font-mono text-white">
          Copyright © 2026 All rights reserved | by{" "}
          <a
            href="https://devspectra.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FF7F50] hover:text-white transition-colors font-bold"
          >
            DevSpectra
          </a>
        </div>
      </div>
    </footer>
  );
}
