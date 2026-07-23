
import React, { useEffect, useState } from "react";
import Section from "../components/Section";
import {
  Dna,
  ShieldCheck,
  Sprout,
  GraduationCap,
} from "lucide-react";


function CountUpStat({ value }) {
  const [display, setDisplay] = useState("0");
  const match = value.match(/^(\d+)(.*)$/); // splits "20+" into "20" and "+"
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    let start = null;
    const duration = 1600; // ms

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.round(eased * target);
      setDisplay(current.toString());
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    const frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  return <>{display}{suffix}</>;
}
function Shallows() {
  const stats = [
    { value: "20+", label: "Years of Aquaculture" },
    { value: "40+", label: "Species Raised" },
    
    { value: "98%", label: "Quarantine Success Rate" },
  ];
 const values = [
  {
    icon: <Dna className="w-8 h-8 text-cyan-600" />,
    title: "Ethical Breeding",
    note: "Selective breeding programs prioritize genetic diversity and long-term species health over rapid turnover.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-cyan-600" />,
    title: "Quarantine Protocols",
    note: "Every batch passes through isolated quarantine tanks with strict health screening before ever reaching a customer.",
  },
  {
    icon: <Sprout className="w-8 h-8 text-cyan-600" />,
    title: "Sustainable Practices",
    note: "Closed-loop water systems and responsible sourcing reduce our environmental footprint at every stage.",
  },
  {
    icon: <GraduationCap className="w-8 h-8 text-cyan-600" />,
    title: "Expert Care Team",
    note: "Our biologists and aquaculture technicians bring decades of combined experience in freshwater husbandry.",
  },
];
  const steps = [
    { name: "Hatchery Nurseries", count: "01", note: "Selective egg hatching under controlled salinity. Larvae fed microscopic rotifers to boost early shell and skeletal health." },
    { name: "Planted Shallow Growouts", count: "02", note: "Cherry shrimp are raised in sub-tropical, high-oxygen moss jungles, allowing natural biofilm feeding and pigmentation enhancement." },
    { name: "Current Conditioning", count: "03", note: "Gold Angelfish and Mollies are conditioned in gentle circular flow channels, building fin strength and symmetric body structure." },
  ];
return (
 <div className="py-0 w-full">

  {/* Header */}

<div className="relative pt-8 pb-20">

    <div className="absolute inset-0 bg-slate-900/55"></div>

    <div className="relative z-10 text-center max-w-4xl mx-auto">

      <span className="inline-flex items-center px-5 py-2 rounded-full bg-[#BE123C]/10 border border-[#BE123C]/20 text-[#BE123C] uppercase tracking-[0.3em] text-xs font-semibold">
        ABOUT US
      </span>

      <h2 className="font-display mt-6 text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
        Raising Aquatic Life

        <span className="block text-[#FF7F50] italic font-light mt-2">
          with Precision
        </span>
      </h2>

      <div className="w-24 h-1 rounded-full bg-gradient-to-r from-[#18B6FF] to-[#FF7F50] mx-auto mt-8"></div>

      <p className="mt-8 text-lg leading-9 text-slate-200 max-w-3xl mx-auto">
        Our bio-secured pools recreate the ideal aquatic ecosystem,
        ensuring every fish grows in a healthy, stress-free and
        balanced environment.
      </p>

    </div>

    </div>
  
      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        {stats.map((s) => (
          <div
            key={s.label}
            className="glass-panel py-8 px-6 text-center flex flex-col justify-center items-center w-full"
          ><div className="font-display text-4xl sm:text-5xl font-bold text-teal-deep">
  <CountUpStat value={s.value} />
</div>
            <div className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-[#FF7F50] font-bold mt-3">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Story + Image Block */}
      <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center mb-20">
       <div className="relative group">

  {/* Glow */}
  <div className="absolute -inset-3 rounded-[42px] bg-gradient-to-br from-cyan-400/20 via-transparent to-[#FF7F50]/20 blur-2xl group-hover:blur-3xl transition-all duration-700"></div>

  {/* Border */}
  <div className="relative rounded-[36px] p-[2px] bg-gradient-to-br from-cyan-300 via-white to-[#FF7F50] shadow-[0_25px_60px_rgba(0,0,0,0.25)]">

    <div className="overflow-hidden rounded-[34px] bg-white">

      <img
        src="/images/three-fish-banner.jpg"
        alt="Kumar Aqua Farm"
        loading="lazy"
        className="
          w-full
          aspect-[4/3]
          object-cover
          transition-all
          duration-700
          group-hover:scale-110
          group-hover:rotate-[1deg]
        "
      />

    </div>

  </div>

  

</div>
        <div>
          <span className="inline-block font-mono text-xs font-bold text-[#BE123C] bg-[#BE123C]/10 border border-[#BE123C]/20 px-4 py-1.5 rounded-full tracking-[0.2em] uppercase">Our Story</span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mt-3 text-[#0A1C33] flex flex-wrap gap-x-2.5 gap-y-1">
            <span className="relative pb-1.5 inline-block">
              Born from a
              <span className="absolute bottom-0 left-0 w-10 h-[2.5px] bg-[#FF7F50] rounded-full"></span>
            </span>
            <span className="text-[#FF7F50] font-light italic">passion for aquatic life</span>
          </h3>
       <p className="mt-8 max-w-xl text-[16px] leading-10 text-white font-medium text-justify">
  Kumar Aqua Farm began as a small backyard hatchery focused on cherry
  shrimp and grew into a full-scale aquaculture operation supplying
  hobbyists and retailers alike. Every specimen that leaves our facility
  has been raised, conditioned, and health-checked according to the same
  standards we'd want for our own home aquariums.
</p>

<p className="mt-8 max-w-xl text-[16px] leading-10 text-white font-medium text-justify">
  We believe healthy aquatic ecosystems start with responsible breeding —
  not mass production. That philosophy shapes every tank, every water
  change, and every animal we send out the door.
</p>
        </div>
      </div>
{/* ================= Core Values ================= */}

<div className="mb-28">

  <div className="text-center max-w-3xl mx-auto mb-14">

    <span className="inline-flex items-center px-6 py-2 rounded-full bg-[#BE123C]/10 border border-[#BE123C]/20 text-[#BE123C] uppercase tracking-[0.3em] text-xs font-semibold">
      WHAT GUIDES US
    </span>

    <h3 className="font-display text-3xl md:text-4xl font-bold text-white mt-6">
      Our Core
      <span className="text-[#FF7F50] italic font-light"> Values</span>
    </h3>

    <div className="w-20 h-1 rounded-full bg-gradient-to-r from-[#18B6FF] to-[#FF7F50] mx-auto mt-5"></div>

  </div>

  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

    {values.map((v) => (

      <div
        key={v.title}
        className="
group
relative
overflow-hidden
rounded-[28px]
bg-white/95
backdrop-blur-xl
border
border-white/30
shadow-lg
hover:-translate-y-2
hover:shadow-2xl
transition-all
duration-500
p-6
"
      >

        {/* Top Accent */}
        <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[#18B6FF] to-[#FF7F50]" />

        {/* Icon */}
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-100 to-cyan-50 flex items-center justify-center text-3xl shadow-md mb-4">
          {v.icon}
        </div>

        {/* Title */}
        <h4 className="font-display text-xl font-bold text-[#081B33] mb-3 leading-snug">
          {v.title}
        </h4>

        {/* Divider */}
        <div className="w-8 h-[2px] bg-[#FF7F50] mb-4 group-hover:w-14 transition-all duration-300"></div>

        {/* Description */}
        <p className="text-[15px] leading-7 text-slate-700 text-justify">
          {v.note}
        </p>

      </div>

    ))}

  </div>

</div>

     {/* ================= Rearing Process ================= */}

<div className="mb-28">

  {/* Heading */}

  <div className="text-center max-w-3xl mx-auto mb-14">

    <span className="inline-flex items-center px-6 py-2 rounded-full bg-[#BE123C]/10 border border-[#BE123C]/20 text-[#BE123C] uppercase tracking-[0.3em] text-xs font-semibold">
      HOW WE RAISE THEM
    </span>

    <h3 className="font-display text-3xl md:text-4xl font-bold text-white mt-6">

      Our Rearing

      <span className="text-[#FF7F50] italic font-light">
        {" "}Process
      </span>

    </h3>

    <div className="w-20 h-1 rounded-full bg-gradient-to-r from-[#18B6FF] to-[#FF7F50] mx-auto mt-5"></div>

  </div>

  {/* Cards */}

  <div className="grid lg:grid-cols-3 gap-8">

    {steps.map((s) => (
<div
  key={s.name}
  className="
    group
    relative
    overflow-hidden
    rounded-[24px]
    bg-white/95
    backdrop-blur-xl
    border
    border-white/30
    shadow-lg
    hover:-translate-y-2
    hover:shadow-2xl
    transition-all
    duration-500
    p-5
    h-full
  "
>
  {/* Top Accent */}
  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#18B6FF] to-[#FF7F50]" />

  {/* Stage */}
  <div className="flex justify-between items-center mb-3">
    <span className="px-3 py-1 rounded-full bg-[#FF7F50]/10 text-[#FF7F50] text-[11px] font-semibold tracking-[0.18em] uppercase">
      Stage {s.count}
    </span>
  </div>

  {/* Title */}
  <h4 className="font-display text-xl font-bold text-[#081B33] leading-tight">
    {s.name}
  </h4>

  {/* Divider */}
  <div className="w-10 h-[2px] bg-[#FF7F50] mt-3 mb-4 group-hover:w-14 transition-all duration-300"></div>

  {/* Description */}
  <p className="text-[15px] leading-7 text-slate-700 text-justify">
    {s.note}
  </p>
</div>
    ))}
</div>
</div>
</div>

);
}

export default function About({ sectionRefs }) {
  return (
    <Section
      id="shallows"
      refCb={(el) => {
        if (sectionRefs && sectionRefs.current) {
          sectionRefs.current.shallows = el;
        }
      }}
      zone="shallows"
    >
      <title>About Us | Kumar Aqua Farm - 20+ Years of Quality Aquaculture</title>

      <meta
        name="description"
        content="Discover Kumar Aqua Farm's 20-year history of breeding premium, healthy freshwater aquarium fish in Chennai. Learn about our ethical breeding and quarantine protocols."
      />

      <meta
        name="keywords"
        content="about kumar aqua farm, ethical breeding fish, aquarium fish quarantine chennai, fish farm history"
      />

      <link
        rel="canonical"
        href="https://kumaraquatic.com/about"
      />

      <Shallows />
    </Section>
  );
}