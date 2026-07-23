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
      label: "Ring the Line",
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
      href: "https://maps.google.com/?q=13.1186,80.2078",
      cta: "Get Directions",
    },
  ];

  return (
    <div className="py-0 w-full relative">
   {/* ==========================================================
                        PREMIUM HERO
========================================================== */}

{/* ===========================================================
                    CONTACT HERO
=========================================================== */}
<section className="relative overflow-hidden rounded-[40px] bg-[#051726]">

  {/* Background */}
  <div className="absolute inset-0">
    <img
      src="/images/contact/contact-bg.jpg"
      alt=""
      className="w-full h-full object-cover"
    />

    <div className="absolute inset-0 bg-[#031521]/85"></div>

    <div className="absolute inset-0 bg-gradient-to-r from-[#031521] via-[#031521]/90 to-[#031521]/40"></div>
  </div>

  {/* Glow */}
  <div className="absolute -left-32 top-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-[120px]" />

  <div className="absolute right-0 bottom-0 w-96 h-96 bg-[#FF7F50]/10 rounded-full blur-[180px]" />

  {/* Bubbles */}
  <div className="absolute top-20 left-20 w-3 h-3 rounded-full bg-cyan-300/40 animate-pulse"></div>
  <div className="absolute top-44 right-52 w-5 h-5 rounded-full bg-cyan-300/20"></div>
  <div className="absolute bottom-32 left-1/2 w-4 h-4 rounded-full bg-white/10"></div>

  {/* Content */}
  <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 py-24">

    <div className="grid lg:grid-cols-2 gap-20 items-center">

      {/* Left */}

      <div>

        <div className="flex items-center gap-4 mb-8">

          <span className="w-16 h-px bg-[#FF7F50]" />

          <span className="text-[#FF7F50] uppercase tracking-[0.35em] text-xs font-mono">

            Drop Anchor Here

          </span>

        </div>

        <h1 className="mt-8 text-4xl sm:text-6xl md:text-7xl font-display font-bold leading-tight text-white">
          Let's Start a{" "}
          <span className="block italic text-[#FF7F50] font-light">Conversation</span>
        </h1>

        <p className="mt-10 max-w-xl text-lg leading-9 text-slate-300">

          Whether you're setting up your first aquarium,
          sourcing ornamental fish, or planning wholesale
          orders, our aquaculture experts are here to help
          you every step of the way.

        </p>

        <div className="flex flex-wrap gap-5 mt-12">

          <a
            href="tel:+919080121326"
            className="px-8 py-4 rounded-full bg-[#FF7F50] hover:bg-[#ff6d3f] transition text-white font-semibold"
          >
            Call Us
          </a>

          <a
            href="mailto:rajesh@kumaraquatic.com"
            className="px-8 py-4 rounded-full border border-cyan-400/30 hover:bg-cyan-400/10 text-cyan-300 transition"
          >
            Email Us
          </a>

        </div>

      </div>

      {/* Right */}

      <div className="hidden lg:flex justify-end">

        <div className="w-full max-w-md">

          <div className="max-w-md ml-auto">

            <h3 className="text-white text-2xl font-display mb-8">

              Get In Touch

            </h3>

            <div className="space-y-8">

              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                  Phone
                </p>

                <p className="text-white text-xl font-semibold mt-2">
                  +91 90801 21326
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                  Email
                </p>

                <p className="text-white text-xl font-semibold mt-2 break-all">
                  rajesh@kumaraquatic.com
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                  Location
                </p>

                <p className="text-slate-300 leading-8 mt-2">
                  No.264, Mahatma Gandhi Nagar,<br />
                  200ft Road,<br />
                  Kolathur, Chennai - 600099
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

</section>
     
      {/* ==========================================================
                    LOCATION SECTION
========================================================== */}

<section className="relative mt-28 mb-28">

  {/* Heading */}

  <div className="text-center max-w-3xl mx-auto mb-14">

    <span className="inline-flex items-center gap-3">

      <span className="w-14 h-px bg-[#FF7F50]" />

      <span className="uppercase tracking-[0.35em] text-xs font-mono text-[#FF7F50]">

        Visit Our Farm

      </span>

      <span className="w-14 h-px bg-[#FF7F50]" />

    </span>

    <h2 className="mt-6 font-display text-4xl lg:text-5xl font-bold text-white">

      Find Us On The Map

    </h2>

    <p className="mt-5 text-slate-300 leading-8 max-w-2xl mx-auto">

      Visit Kumar Aqua Farm in Kolathur, Chennai.
      Our team is always happy to welcome aquarium
      enthusiasts and wholesale buyers.

    </p>

  </div>

  {/* Map */}

  <div className="relative">

    {/* Glow */}

    <div className="absolute inset-0 rounded-[36px] bg-cyan-500/10 blur-3xl scale-95"></div>

    <div className="relative overflow-hidden rounded-[36px] border border-cyan-400/20 shadow-[0_30px_80px_rgba(0,0,0,.45)]">

      <iframe
        title="Kumar Aqua Farm"
        src="https://maps.google.com/maps?q=13.1186,80.2078+(Kumar+Aqua+Farm)&t=&z=16&ie=UTF8&iwloc=&output=embed"
        className="w-full h-[520px]"
        loading="lazy"
        allowFullScreen
      />

    </div>

  </div>

</section>

      {/* Tides We're Open (Business Hours) */}
      <div
        className="glass-panel p-6 md:p-7 flex flex-col sm:flex-row items-center sm:items-stretch justify-between gap-6 mb-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-[#FF7F50]/12 border border-[#FF7F50]/25 flex items-center justify-center text-[#FF7F50] flex-shrink-0">
            <WaveIcon />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-[#0A1C33]">The Tides We're Open</h3>
           
          </div>
        </div>
        <div className="flex gap-8 sm:gap-10">
          <div className="text-center sm:text-left">
            <span className="block font-mono text-xs uppercase tracking-widest text-[#FF7F50] font-bold">Mon – Fri</span>
            <span className="block font-body text-lg text-[#0A1C33] font-bold mt-1">9:00 AM – 6:00 PM</span>
          </div>
          <div className="text-center sm:text-left">
            <span className="block font-mono text-xs uppercase tracking-widest text-[#FF7F50] font-bold">Saturday</span>
            <span className="block font-body text-lg text-[#0A1C33] font-bold mt-1">10:00 AM – 4:00 PM</span>
          </div>
        </div>
      </div>

      {/* Closing tagline */}
      <p className="text-center font-mono text-sm uppercase tracking-widest text-[#0A1C33] mt-10 font-bold">
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
      <title>Contact Us | Kumar Aqua Farm - Kolathur, Chennai Location</title>
      <meta name="description" content="Get in touch with Kumar Aqua Farm. Visit our breeding site at 200ft Inner Ring Road, Kolathur, Chennai, or email us at rajesh@kumaraquatic.com." />
      <meta name="keywords" content="contact kumar aqua farm, fish farm location chennai, aquarium fish shop kolathur, phone number kumar aqua farm" />
      <link rel="canonical" href="https://kumaraquatic.com/contact" />
      <Harbor />
    </Section>
  );
}
