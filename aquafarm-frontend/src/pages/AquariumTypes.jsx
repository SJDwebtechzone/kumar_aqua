import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useFishes } from "../hooks/useFishes";
import Section from "../components/Section";
import SpeciesDetailCard from "../components/SpeciesDetailCard";
import { speciesList } from "../speciesData";
import { buildDbSpecies } from "../speciesData";

const CARD_GRADIENT = "linear-gradient(160deg, rgba(255,255,255,0.95) 0%, rgba(255,127,80,0.08) 45%, rgba(0,210,196,0.10) 100%)";
const CARD_SHADOW = "0_10px_30px_rgba(0,50,60,0.08)";

const QUICK_STOCK = [
  { name: "Neon Rainbow", image: "/images/stock/neon-rainbow.jpg" },
  { name: "Feather Fin Rainbow", image: "/images/stock/feather-fin-rainbow.jpg" },
  { name: "Shrimp — 5 Colours", image: "/images/stock/shrimp-mix.jpg" },
  { name: "Guppies — 5 Varieties", image: "/images/stock/guppies-mix.jpg" },
  { name: "Ordinary Guppies", image: "/images/stock/ordinary-guppies.jpg" },
  { name: "Flowerhorn — Small Size", image: "/images/stock/flowerhorn-small.jpg" },
  { name: "Fighter — Half Moon", image: "/images/stock/betta-half-moon.jpg" },
  { name: "Fighter — Full Moon", image: "/images/stock/betta-full-moon.jpg" },
  { name: "Ordinary Fighter", image: "/images/stock/ordinary-fighter.jpg" },
  { name: "Habic", image: "/images/stock/habic.jpg" },
];
function QuickStockList({ items }) {
 const dbItems = (items && items.length > 0)
    ? items.map(f => ({ name: f.name, image: f.imageUrl }))
    : [];
  const list = [...QUICK_STOCK, ...dbItems];
  const [activeIdx, setActiveIdx] = useState(0);
  const [imgError, setImgError] = useState(false);
  const active = list[activeIdx];

  const handleHover = (idx) => {
    setActiveIdx(idx);
    setImgError(false);
  };

  return (
    <div className="mb-20">
      <div className="text-center max-w-xl mx-auto mb-10">
        <p className="font-mono text-xs text-teal-deep tracking-widest uppercase">More In Stock</p>
        <h3 className="font-display text-2xl sm:text-3xl font-semibold mt-3 text-[#0A1C33]">
          Additional Varieties Available
        </h3>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Names list */}
        <div
          className="rounded-3xl p-2 overflow-hidden shadow-[0_10px_30px_rgba(0,50,60,0.08)]"
          style={{ background: CARD_GRADIENT }}
        >
          {list.map((item, idx) => (
            <button
              key={item.name}
              onMouseEnter={() => handleHover(idx)}
              onFocus={() => handleHover(idx)}
              onClick={() => handleHover(idx)}
              className={`w-full text-left px-5 py-3.5 rounded-2xl font-body text-sm sm:text-base transition-colors flex items-center justify-between group ${
                activeIdx === idx
                  ? "bg-[#FF7F50]/15 text-[#0A1C33] font-semibold"
                  : "text-[#0A1C33]/75 hover:bg-white/50"
              }`}
            >
              <span>{item.name}</span>
              <span
                className={`text-xs transition-transform ${
                  activeIdx === idx ? "translate-x-0 opacity-100 text-[#FF7F50]" : "-translate-x-1 opacity-0"
                }`}
              >
                →
              </span>
            </button>
          ))}
        </div>

        {/* Fixed preview panel */}
        <div
          className="rounded-3xl overflow-hidden aspect-[4/3] relative sticky top-[110px] shadow-[0_10px_30px_rgba(0,50,60,0.08)]"
          style={{ background: CARD_GRADIENT }}
        >
          {!imgError ? (
            <img
              key={active.image}
              src={active.image}
              alt={active.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-center px-6">
              <span className="text-5xl mb-3">🐠</span>
              <span className="font-mono text-xs uppercase tracking-widest text-teal-deep">
                Photo coming soon
              </span>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-5 py-4">
            <span className="font-display text-lg text-white font-semibold">{active.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function GrowOut({ onNavigate, speciesData, quickStock }) {
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [firstTimeAlert, setFirstTimeAlert] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    fishType: speciesData && speciesData[0] ? speciesData[0].slug : "other",
    message: ""
  });

 const handleEnquirySubmit = async (e) => {
  e.preventDefault();
  setSubmitting(true);
  const selectedFish = speciesData.find(s => s.slug === formData.fishType)?.name || formData.fishType;

  // 1. Save to localStorage for Admin Dashboard
  const currentEnquiries = JSON.parse(localStorage.getItem("af_enquiries") || "[]");
  const newEnquiry = {
    ...formData,
    date: new Date().toISOString(),
    id: Math.random()
  };
  currentEnquiries.push(newEnquiry);
  localStorage.setItem("af_enquiries", JSON.stringify(currentEnquiries));

  // 2. Send email and save enquiry via local backend SMTP integration
  try {
    const apiBase = import.meta.env.VITE_API_URL // "http://localhost:5000/api";
    const response = await fetch(`${apiBase}/enquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || "",
        fishType: selectedFish,
        message: formData.message
      })
    });
    if (response.ok) {
      console.log("Enquiry submitted successfully to backend.");
    }
  } catch (err) {
    console.warn("Backend enquiry submission failed:", err);
  }

  setSubmitting(false);
  setEnquirySuccess(true);
};
  const benefits = [
    {
      icon: "🧪",
      title: "Quarantine Certified",
      note: "Every batch is health-screened and cleared before it ever ships out.",
    },
    {
      icon: "📦",
      title: "Safe Live Arrival",
      note: "Insulated, oxygenated packaging designed for stress-free transit.",
    },
    {
      icon: "📋",
      title: "Care Guide Included",
      note: "Species-specific setup and maintenance instructions with every order.",
    },
    {
      icon: "🤝",
      title: "Ongoing Support",
      note: "Our team is on hand for questions well after your order arrives.",
    },
  ];

  return (
    <div className="py-0">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="max-w-2xl">
          <span className="inline-block font-mono text-xs font-bold text-[#BE123C] bg-[#BE123C]/10 border border-[#BE123C]/20 px-4 py-1.5 rounded-full tracking-[0.2em] uppercase">Aquarium Types</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-3 text-[#0A1C33] flex flex-wrap gap-x-3 gap-y-1">
            <span className="relative pb-3 inline-block">
              Curated Species
              <span className="absolute bottom-0 left-0 w-16 h-[3px] bg-[#FF7F50] rounded-full"></span>
            </span>
            <span className="text-[#FF7F50] font-light italic">Catalog</span>
          </h2>
          <p className="font-body text-base font-semibold text-[#1E4D66] mt-3 leading-relaxed">
            Every specimen is quarantine-cleared and acclimated to broad environmental baselines for straightforward integration.
          </p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1.5 rounded bg-[#FF7F50]/15 text-teal-deep font-mono text-[11px] border border-[#FF7F50]/35">HEALTH CERTIFIED</span>
          <span className="px-3 py-1.5 rounded bg-[#007b8a]/10 text-teal-deep font-mono text-[11px] border border-[#007b8a]/25">QUARANTINE READY</span>
        </div>
      </div>

      {/* Species Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {speciesData.map((sp) => (
          <SpeciesDetailCard key={sp.slug} sp={sp} />
        ))}
      </div>

      {/* Quick Stock List with hover preview */}
     <QuickStockList items={quickStock} />

      {/* Why Buy From Us */}
      <div className="mb-20">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="inline-block font-mono text-xs font-bold text-[#BE123C] bg-[#BE123C]/10 border border-[#BE123C]/20 px-4 py-1.5 rounded-full tracking-[0.2em] uppercase">Why Choose Us</span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mt-3 text-[#0A1C33] flex flex-wrap justify-center gap-x-2.5 gap-y-1">
            <span className="relative pb-3 inline-block">
              Every Order
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-[2.5px] bg-[#FF7F50] rounded-full"></span>
            </span>
            <span className="text-[#FF7F50] font-light italic">Comes With</span>
          </h3>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="rounded-2xl p-6 text-center shadow-[0_10px_30px_rgba(0,50,60,0.08)] hover:shadow-[0_16px_40px_rgba(0,50,60,0.14)] hover:-translate-y-1 transition-all duration-300 group"
              style={{ background: CARD_GRADIENT }}
            >
              <div className="text-3xl mb-3">{b.icon}</div>
              <h4 className="font-display text-lg font-bold text-[#0A1C33] group-hover:text-[#FF7F50] transition-colors">{b.title}</h4>
              <p className="font-body text-base font-semibold text-[#1E4D66] mt-2 leading-relaxed">{b.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div
        className="rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left shadow-[0_10px_30px_rgba(0,50,60,0.08)]"
        style={{ background: CARD_GRADIENT }}
      >
        <div>
          <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#0A1C33] flex flex-wrap gap-x-2 gap-y-0.5">
            <span>Looking for a</span>
            <span className="text-[#FF7F50] font-light italic">species not listed here?</span>
          </h3>
          <p className="font-body text-base font-semibold text-[#1E4D66] mt-2 leading-relaxed">
            We regularly source new stock and take custom or bulk wholesale requests.
          </p>
        </div>
        <button
          onClick={() => setShowEnquiryModal(true)}
          className="px-7 py-3 rounded-full bg-[#FF7F50] text-white font-mono text-xs uppercase tracking-wider hover:bg-[#007b8a] transition-colors flex-shrink-0 cursor-pointer"
        >
          Contact Us
        </button>
      </div>

      {/* Enquiry Modal */}
      {showEnquiryModal && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg rounded-3xl p-6 sm:p-8 pt-10 sm:pt-12 border border-[#FF7F50]/30 shadow-2xl relative max-h-[90vh] overflow-y-auto" style={{ background: "rgba(255, 255, 255, 0.98)", backdropFilter: "blur(12px)" }}>
            {/* Close Button */}
            <button
              onClick={() => {
                setShowEnquiryModal(false);
                setEnquirySuccess(false);
              }}
              className="absolute top-4 right-4 text-[#0A1C33]/60 hover:text-[#0A1C33] hover:scale-110 p-1 font-bold text-xl cursor-pointer transition-transform"
            >
              ✕
            </button>

            {enquirySuccess ? (
              <div className="text-center py-6">
                <span className="text-5xl mb-3 inline-block">🐠</span>
                <h3 className="font-display text-2xl font-bold text-[#0A1C33]">Enquiry Registered!</h3>
                <p className="font-body text-sm text-[#0A1C33]/85 mt-2 leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Your request for <strong>{speciesData.find(s => s.slug === formData.fishType)?.name || formData.fishType}</strong> has been registered in the database and sent to your email.
                </p>

                {firstTimeAlert && (
                  <div className="mt-5 p-4 rounded-2xl bg-[#007b8a]/10 border border-[#007b8a]/30 text-left">
                    <p className="font-body text-[11px] text-[#007b8a] leading-relaxed">
                      💡 <strong>Note on first submission:</strong> If this is your first time using this email with the contact form, check your inbox (or spam) for an activation email from <strong>FormSubmit</strong> and click confirm to link your address.
                    </p>
                  </div>
                )}

                <button
                  onClick={() => {
                    setShowEnquiryModal(false);
                    setEnquirySuccess(false);
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      fishType: speciesData && speciesData[0] ? speciesData[0].slug : "other",
                      message: ""
                    });
                  }}
                  className="mt-6 px-6 py-2.5 rounded-full border border-gray-300 text-gray-700 hover:text-black font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <div>
                <h3 className="font-display text-2xl font-bold text-[#0A1C33] mb-1">Enquire About Specimen</h3>
                <p className="font-body text-xs text-[#0A1C33]/70 mb-6 leading-relaxed">
                  Let us know which livestock you're interested in, and we will get back to you with stocking details, pricing, and care advice.
                </p>

                <form
                  onSubmit={handleEnquirySubmit}
                  className="space-y-4 font-body"
                >
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-teal-deep font-bold mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Kumar"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#FF7F50]/20 bg-white/50 text-[#0A1C33] text-sm focus:outline-none focus:border-[#FF7F50] transition-colors"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-wider text-teal-deep font-bold mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. Kumar@example.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#FF7F50]/20 bg-white/50 text-[#0A1C33] text-sm focus:outline-none focus:border-[#FF7F50] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-wider text-teal-deep font-bold mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +91 9080121326"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#FF7F50]/20 bg-white/50 text-[#0A1C33] text-sm focus:outline-none focus:border-[#FF7F50] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-teal-deep font-bold mb-1">
                      Select Fish Species *
                    </label>
                    <select
                      value={formData.fishType}
                      onChange={(e) => setFormData({ ...formData, fishType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#FF7F50]/20 bg-white/50 text-[#0A1C33] text-sm focus:outline-none focus:border-[#FF7F50] transition-colors appearance-none"
                      style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='%23FF7F50' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`, backgroundPosition: 'right 12px center', backgroundRepeat: 'no-repeat' }}
                    >
                      {speciesData.map((s) => (
                        <option key={s.slug} value={s.slug}>{s.name}</option>
                      ))}
                      <option value="other">Other / Custom Request</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-teal-deep font-bold mb-1">
                      Message / Special Requirements *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your aquarium setup or ask your questions..."
                      className="w-full px-4 py-2.5 rounded-xl border border-[#FF7F50]/20 bg-white/50 text-[#0A1C33] text-sm focus:outline-none focus:border-[#FF7F50] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-xl bg-[#FF7F50] hover:bg-[#007b8a] disabled:bg-gray-400 text-white font-mono text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer mt-2"
                  >
                    {submitting ? "Submitting..." : "Submit Enquiry"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

export default function AquariumTypes({ sectionRefs, onNavigate }) {
  const { fishes: quickStock }  = useFishes("quickstock");
  const { fishes: featuredFish } = useFishes("featured");  // ← ADD

  // Merge static + DB featured fish for the 3-card section
  const speciesData = (featuredFish && featuredFish.length > 0)
    ? [...speciesList, ...featuredFish.map(buildDbSpecies)]
    : speciesList;

  return (
    <Section 
      id="growout" 
      refCb={(el) => {
        if (sectionRefs && sectionRefs.current) {
          sectionRefs.current.growout = el;
        }
      }} 
      zone="growout"
    >
      <title>Aquarium Types & Stock Catalog | Kumar Aqua Farm</title>
      <meta name="description" content="Browse our aquarium types and live stock catalog. Premium Cherry Shrimp, Gold Angelfish, Balloon Mollies, and a wide variety of quick stock options." />
      <meta name="keywords" content="aquarium types catalog, aquarium fish list, buy angelfish chennai, buy balloon molly, buy cherry shrimp, aquarium shop stock" />
      <link rel="canonical" href="https://kumaraquatic.com/aquarium-types" />
      <GrowOut onNavigate={onNavigate} speciesData={speciesData} quickStock={quickStock} />
    </Section>
  );
}
