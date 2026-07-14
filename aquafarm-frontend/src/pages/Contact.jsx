import React from "react";
import Section from "../components/Section";

function AnchorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <circle cx="12" cy="5" r="2" />
      <path strokeLinecap="round" d="M12 7v14M7 12H2a10 10 0 0 0 10 9 10 10 0 0 0 10-9h-5" />
      <path strokeLinecap="round" d="M8.5 9.5 12 12l3.5-2.5" />
    </svg>
  );
}
function MessageBottleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 2h6M10 2v3.5c0 .8-.3 1.6-.9 2.2C7.7 9 7 10.6 7 12.3V19a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3v-6.7c0-1.7-.7-3.3-2.1-4.6-.6-.6-.9-1.4-.9-2.2V2" />
      <path strokeLinecap="round" d="M8 14c1.2.8 2.5 1.2 4 1.2s2.8-.4 4-1.2" />
    </svg>
  );
}
function CompassIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m14.5 9.5-2 5-3 1.5 2-5 3-1.5Z" />
    </svg>
  );
}
function WaveIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <path strokeLinecap="round" d="M2 15c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0" />
      <path strokeLinecap="round" d="M2 10c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0" opacity="0.5" />
    </svg>
  );
}

function Harbor() {
  const contactItems = [
    {
      Icon: AnchorIcon,
      label: "Ring the  Line",
      note: "Speak directly with our aquaculture team",
      value: "9080121326",
      href: "tel:+919080121326",
      cta: "Call Now",
    },
    {
      Icon: MessageBottleIcon,
      label: "Send a Message in a Bottle",
      note: "We reply within one tide cycle (24hrs)",
      value: "rajesh@kumaraquatic.com",
      href: "mailto:rajesh@kumaraquatic.com",
      cta: "Send Email",
    },
    {
      Icon: CompassIcon,
      label: "Chart a Course to Our Dock",
      note: "Visit the source of your next aquarium",
      value: "NO:264, Mahatma Gandhi Nagar, 200ft Road, Kolattur, Chennai-99",
      href: null,
      cta: null,
    },
  ];

  return (
    <div className="py-0 w-full relative">
      {/* Decorative wave icon strip */}
      <div className="flex justify-center mb-4 text-[#FF7F50]/50">
        <WaveIcon />
      </div>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="inline-block font-mono text-xs font-bold text-[#BE123C] bg-[#BE123C]/10 border border-[#BE123C]/20 px-4 py-1.5 rounded-full tracking-[0.2em] uppercase">
          Drop Anchor Here
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-3 text-[#0A1C33] flex flex-wrap justify-center gap-x-3 gap-y-1">
          <span className="relative pb-3 inline-block">
            Dive into
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-[3px] bg-[#FF7F50] rounded-full"></span>
          </span>
          <span className="text-[#FF7F50] font-light italic">conversation with us</span>
        </h2>
        <p className="font-body text-[#0A1C33]/80 mt-4 leading-relaxed text-sm sm:text-base max-w-xl mx-auto">
          Whether you're stocking your first nano tank or sourcing a wholesale shipment, our team is ready to help you navigate every ripple of the process.
        </p>
      </div>

      {/* Contact Info Cards — clean, light cards matching the species card style */}
      <div className="grid sm:grid-cols-3 gap-6 mb-10">
        {contactItems.map((item) => (
          <div
            key={item.label}
            className="rounded-3xl p-6 flex flex-col items-start text-left shadow-[0_10px_30px_rgba(0,50,60,0.08)] hover:shadow-[0_16px_40px_rgba(0,50,60,0.14)] hover:-translate-y-1 transition-all duration-300"
            style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.95) 0%, rgba(255,127,80,0.08) 45%, rgba(0,210,196,0.10) 100%)" }}
          >
            <div className="w-11 h-11 rounded-full bg-[#FF7F50]/12 border border-[#FF7F50]/25 flex items-center justify-center text-[#FF7F50] mb-4">
              <item.Icon />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-teal-deep">
              {item.label}
            </span>
            <span className="font-body text-[11px] text-[#0A1C33]/55 italic mt-0.5">
              {item.note}
            </span>
            <span className="font-body text-sm sm:text-base text-[#0A1C33] font-medium mt-2 mb-4">
              {item.value}
            </span>
            {item.href && (
              <a
                href={item.href}
                className="mt-auto text-xs font-mono uppercase tracking-wider text-[#FF7F50] hover:text-teal-deep transition-colors inline-flex items-center gap-1"
              >
                {item.cta} →
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Google Map Section */}
      <div 
        className="rounded-3xl p-4 md:p-5 shadow-[0_10px_30px_rgba(0,50,60,0.08)] mb-6 overflow-hidden border border-[#FF7F50]/20"
        style={{ background: "rgba(255, 255, 255, 0.9)" }}
      >
        <iframe
          title="Kumar Aqua Farm Google Map Location"
          src="https://maps.google.com/maps?q=13.1186,80.2078+(Kumar+Aqua+Farm)&t=&z=17&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="340"
          className="rounded-2xl border-0 w-full"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Tides We're Open (Business Hours) */}
      <div
        className="rounded-3xl p-6 md:p-7 flex flex-col sm:flex-row items-center sm:items-stretch justify-between gap-6 shadow-[0_10px_30px_rgba(0,50,60,0.08)] mb-4"
        style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.95) 0%, rgba(0,210,196,0.10) 60%, rgba(255,127,80,0.08) 100%)" }}
      >
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-[#FF7F50]/12 border border-[#FF7F50]/25 flex items-center justify-center text-[#FF7F50] flex-shrink-0">
            <WaveIcon />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-[#0A1C33]">The Tides We're Open</h3>
           
          </div>
        </div>
        <div className="flex gap-8 sm:gap-10">
          <div className="text-center sm:text-left">
            <span className="block font-mono text-[10px] uppercase tracking-widest text-[#0A1C33]/60">Mon – Fri</span>
            <span className="block font-body text-sm sm:text-base text-[#0A1C33] font-medium mt-1">9:00 AM – 6:00 PM</span>
          </div>
          <div className="text-center sm:text-left">
            <span className="block font-mono text-[10px] uppercase tracking-widest text-[#0A1C33]/60">Saturday</span>
            <span className="block font-body text-sm sm:text-base text-[#0A1C33] font-medium mt-1">10:00 AM – 4:00 PM</span>
          </div>
        </div>
      </div>

      {/* Closing tagline */}
      <p className="text-center font-mono text-[11px] uppercase tracking-widest text-[#0A1C33] mt-8">
        Fair winds and healthy fins — we'll be in touch soon 🐠
      </p>
    </div>
  );
}

export default function Contact({ sectionRefs }) {
  return (
    <Section
      id="harbor"
      refCb={(el) => {
        if (sectionRefs && sectionRefs.current) {
          sectionRefs.current.harbor = el;
        }
      }}
      zone="harbor"
    >
      <Harbor />
    </Section>
  );
}
