import { useState, useEffect } from "react";
import logo from "./assets/logo.png";

//const API_BASE = "http://localhost:5000/api";
const API_BASE = import.meta.env.VITE_API_URL;
/* ─────────────────────────── THEME ──────────────────────────────────────── */
const T = {
  bg:      "#0A2A43", surface: "#0E3C57", card: "#114B6B",
  border:  "rgba(191,234,245,0.15)", accent: "#BFEAF5", sand: "#E8DCC4",
  text:    "#F5F7F5", muted: "rgba(245,247,245,0.55)",
  danger:  "#E05C5C", success: "#4FCFA0",
};

const fonts = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;1,9..144,400&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${T.bg}; }
  input, select, textarea {
    background: rgba(191,234,245,0.06); border: 1px solid ${T.border};
    color: ${T.text}; border-radius: 8px; padding: 9px 13px;
    font-family: 'Inter', sans-serif; font-size: 14px; width: 100%;
    outline: none; transition: border 0.2s;
  }
  input:focus, select:focus, textarea:focus { border-color: ${T.accent}; }
  input::placeholder, textarea::placeholder { color: ${T.muted}; }
  select option { background: ${T.card}; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-thumb { background: rgba(191,234,245,0.2); border-radius: 4px; }
`;

/* ─────────────────────────── API HELPER ─────────────────────────────────── */
async function api(path, options = {}) {
  const token = localStorage.getItem("af_token");
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { Authorization: `Bearer ${token}`, ...options.headers },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }
  return res.json();
}

/* ─────────────────────────── SHARED UI ──────────────────────────────────── */
function Badge({ ok, children }) {
  return (
    <span style={{
      display: "inline-block", padding: "2px 10px", borderRadius: "99px",
      fontSize: "12px", fontFamily: "'JetBrains Mono', monospace",
      background: ok ? "rgba(79,207,160,0.15)" : "rgba(224,92,92,0.15)",
      color: ok ? T.success : T.danger,
      border: `1px solid ${ok ? "rgba(79,207,160,0.3)" : "rgba(224,92,92,0.3)"}`,
    }}>{children}</span>
  );
}

function Btn({ children, onClick, variant = "primary", size = "md", disabled }) {
  return (
    <button
      onClick={onClick} disabled={disabled}
      style={{
        display: "inline-flex", alignItems: "center", gap: "6px",
        borderRadius: "8px", fontFamily: "'Inter', sans-serif", fontWeight: 500,
        cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1,
        border: "none", transition: "opacity 0.15s",
        fontSize: size === "sm" ? "13px" : "14px",
        padding: size === "sm" ? "6px 13px" : "9px 18px",
        ...(variant === "primary" && { background: T.sand, color: T.bg }),
        ...(variant === "ghost"   && { background: "rgba(191,234,245,0.07)", color: T.text }),
        ...(variant === "danger"  && { background: "rgba(224,92,92,0.15)", color: T.danger }),
      }}
    >{children}</button>
  );
}

function Card({ children, style }) {
  return (
    <div style={{
      background: T.card, border: `1px solid ${T.border}`,
      borderRadius: "14px", padding: "22px", ...style,
    }}>{children}</div>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(10,42,67,0.85)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 100, padding: "20px",
    }}>
      <div style={{
        background: T.surface, border: `1px solid ${T.border}`,
        borderRadius: "16px", padding: "28px", width: "100%", maxWidth: "480px",
        maxHeight: "90vh", overflowY: "auto",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "22px" }}>
          <span style={{ fontFamily: "'Fraunces', serif", fontSize: "20px", color: T.text }}>{title}</span>
          <button onClick={onClose} style={{ background: "none", border: "none", color: T.muted, fontSize: "22px", cursor: "pointer" }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Toast({ msg, type }) {
  if (!msg) return null;
  return (
    <div style={{
      position: "fixed", bottom: "24px", right: "24px", zIndex: 200,
      background: type === "error" ? T.danger : T.success,
      color: "#fff", borderRadius: "10px", padding: "12px 20px",
      fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 500,
      boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    }}>{msg}</div>
  );
}

function Spinner() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "60px" }}>
      <div style={{
        width: "32px", height: "32px", border: `3px solid ${T.border}`,
        borderTop: `3px solid ${T.accent}`, borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function Login({ onLogin }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handle = async () => {
    if (!email || !password) return setError("Enter email and password");
    setLoading(true); setError("");
    try {
      const res  = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("af_token", data.token);
        onLogin(data.token);
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch {
      // Offline fallback bypass
      if (email === "admin" && password === "admin") {
        localStorage.setItem("af_token", "offline_token");
        onLogin("offline_token");
      } else {
        setError("Cannot reach server — is backend running? (Use username 'admin' and password 'admin' to sign in locally)");
      }
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
    background: "linear-gradient(145deg, #0A2A43 0%, #0E3C57 50%, #114B6B 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "20px", position: "relative", overflow: "hidden",
      fontFamily: "'Inter', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        /* Floating bubbles */
        @keyframes floatUp {
          0%   { transform: translateY(0) scale(1);   opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.6; }
          100% { transform: translateY(-100vh) scale(1.1); opacity: 0; }
        }
        @keyframes sway {
          0%,100% { margin-left: 0; }
          50%      { margin-left: 18px; }
        }
        .login-bubble {
          position: absolute; border-radius: 50%; pointer-events: none;
          animation: floatUp linear infinite, sway ease-in-out infinite;
        }
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .login-input {
          width: 100%;
          background: rgba(255,255,255,0.85);
          border: 1.5px solid rgba(0,123,138,0.18);
          color: #0A1C33;
          border-radius: 12px;
          padding: 14px 16px;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          outline: none;
          transition: all 0.25s;
          box-sizing: border-box;
          box-shadow: 0 2px 8px rgba(0,123,138,0.06);
        }
        .login-input:focus {
          border-color: #FF7F50;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(255,127,80,0.1), 0 2px 8px rgba(0,123,138,0.06);
        }
        .login-input::placeholder { color: rgba(10,28,51,0.3); }
        .login-btn {
          width: 100%; padding: 15px;
          background: linear-gradient(135deg, #FF7F50 0%, #E0663B 100%);
          color: #fff; border: none; border-radius: 12px;
          font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 700;
          cursor: pointer; transition: all 0.25s; letter-spacing: 0.03em;
          box-shadow: 0 6px 20px rgba(255,127,80,0.35);
          position: relative; overflow: hidden;
        }
        .login-btn::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          background-size: 400px 100%;
          animation: shimmer 2.5s infinite;
        }
        .login-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(255,127,80,0.45);
        }
        .login-btn:active:not(:disabled) { transform: translateY(0); }
        .login-btn:disabled { opacity: 0.65; cursor: not-allowed; }
        .pass-toggle {
          position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
          background: none; border: none; color: rgba(10,28,51,0.35);
          cursor: pointer; font-family: 'JetBrains Mono', monospace;
          font-size: 10px; padding: 4px; letter-spacing: 0.06em;
          transition: color 0.2s;
        }
        .pass-toggle:hover { color: #FF7F50; }
        .login-card {
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.9);
          border-radius: 24px;
          padding: 40px;
          box-shadow:
            0 32px 80px rgba(0,123,138,0.12),
            0 8px 24px rgba(0,0,0,0.06),
            inset 0 1px 0 rgba(255,255,255,0.9);
        }
        .divider-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,123,138,0.15), transparent);
          margin: 24px 0;
        }
      `}</style>

      {/* Floating bubbles background */}
      {[
        { size: 18, left: "8%",  dur: 9,  delay: 0,   color: "rgba(255,127,80,0.25)"  },
        { size: 12, left: "18%", dur: 12, delay: 2,   color: "rgba(0,123,138,0.2)"    },
        { size: 22, left: "30%", dur: 10, delay: 1,   color: "rgba(255,127,80,0.15)"  },
        { size: 8,  left: "45%", dur: 8,  delay: 3,   color: "rgba(0,210,196,0.3)"    },
        { size: 16, left: "60%", dur: 11, delay: 0.5, color: "rgba(255,127,80,0.2)"   },
        { size: 10, left: "72%", dur: 9,  delay: 4,   color: "rgba(0,123,138,0.25)"   },
        { size: 20, left: "85%", dur: 13, delay: 1.5, color: "rgba(0,210,196,0.2)"    },
        { size: 14, left: "92%", dur: 10, delay: 2.5, color: "rgba(255,127,80,0.18)"  },
      ].map((b, i) => (
        <span key={i} className="login-bubble" style={{
          width: b.size, height: b.size, left: b.left, bottom: "-30px",
          background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, ${b.color} 100%)`,
          border: `0.5px solid ${b.color}`,
          animationDuration: `${b.dur}s, ${b.dur * 1.3}s`,
          animationDelay: `${b.delay}s, ${b.delay}s`,
        }} />
      ))}

      {/* Decorative coral shape top-right */}
      <div style={{
        position: "absolute", top: "-60px", right: "-60px",
        width: "280px", height: "280px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(191,234,245,0.15) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "-40px", left: "-40px",
        width: "220px", height: "220px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,123,138,0.15) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Main card */}
      <div style={{ width: "100%", maxWidth: "420px", position: "relative", zIndex: 1 }}>

        {/* Header above card */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
   <img
  src={logo}
  alt="Kumar AquaFarm"
  style={{
    width: "140px",
    height: "140px",
    objectFit: "contain",
    display: "block",
    margin: "0 auto 14px",
    filter: "drop-shadow(0 4px 16px rgba(0,123,138,0.25))",
  }}
/>
          <h1 style={{
            fontFamily: "'Fraunces', serif", fontSize: "28px",
            color: "#F5F7F5", fontWeight: 600, margin: "0 0 4px", letterSpacing: "-0.02em",
          }}>
            Kumar AquaFarm
          </h1>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "10px",
            color: "rgba(245,247,245,0.5)"   , letterSpacing: "0.14em",
          }}>
            ADMIN PORTAL · SECURE ACCESS
          </p>
        </div>

        {/* Glass card */}
        <div className="login-card">
          <h2 style={{
            fontFamily: "'Fraunces', serif", fontSize: "19px",
            color: "#0A1C33", fontWeight: 600, margin: "0 0 4px",
          }}>
            Welcome back
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "13px",
            color: "rgba(10,28,51,0.45)", margin: "0 0 24px",
          }}>
            Sign in to manage your aquarium catalog
          </p>

          <div className="divider-line" />

          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            {/* Email */}
            <div>
              <label style={{
                fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600,
                color: "rgba(10,28,51,0.5)", display: "block",
                marginBottom: "7px", letterSpacing: "0.07em",
              }}>USER NAME</label>
              <input
                className="login-input" type="email" value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label style={{
                fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600,
                color: "rgba(10,28,51,0.5)", display: "block",
                marginBottom: "7px", letterSpacing: "0.07em",
              }}>PASSWORD</label>
              <div style={{ position: "relative" }}>
                <input
                  className="login-input"
                  type={showPass ? "text" : "password"}
                  value={password} placeholder="••••••••••"
                  onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handle()}
                  style={{ paddingRight: "56px" }}
                />
                <button className="pass-toggle" onClick={() => setShowPass(p => !p)}>
                  {showPass ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                background: "rgba(224,92,92,0.08)",
                border: "1px solid rgba(224,92,92,0.25)",
                borderRadius: "10px", padding: "11px 14px", display: "flex",
                alignItems: "center", gap: "8px",
              }}>
                <span style={{ fontSize: "14px" }}>⚠️</span>
                <span style={{
                  fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#6d0e04",
                }}>{error}</span>
              </div>
            )}

            {/* Button */}
            <button className="login-btn" onClick={handle} disabled={loading}>
              {loading ? "Signing in…" : "Sign in →"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <p style={{
          textAlign: "center", marginTop: "20px",
          fontFamily: "'JetBrains Mono', monospace", fontSize: "10px",
          color: "rgba(245,247,245,0.25)", letterSpacing: "0.08em",
        }}>
          KUMAR AQUAFARM © 2025 · ALL RIGHTS RESERVED
        </p>
      </div>
    </div>
  );
}
/* ─────────────────────────── SIDEBAR ────────────────────────────────────── */
const NAV = [
  { id: "overview", icon: "◈", label: "Overview" },
  { id: "fish",     icon: "⬡", label: "Fish"     },
  { id: "featured", icon: "★", label: "Featured"   }, 
  { id: "banners",  icon: "▣", label: "Banners"  },
  { id: "enquiries", icon: "✉", label: "Enquiries" },
];

function Sidebar({ page, onPage, onLogout }) {
  return (
    <aside style={{ width: "220px", flexShrink: 0, background: T.surface, borderRight: `1px solid ${T.border}`, display: "flex", flexDirection: "column", padding: "24px 0" }}>
      <div style={{ padding: "0 20px 24px" }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: T.accent, letterSpacing: "0.1em" }}>AQUAFARM</p>
        <p style={{ fontFamily: "'Fraunces', serif", fontSize: "17px", color: T.text, marginTop: "2px" }}>Admin Panel</p>
      </div>
      <nav style={{ flex: 1 }}>
        {NAV.map(n => (
          <button key={n.id} onClick={() => onPage(n.id)} style={{
            display: "flex", alignItems: "center", gap: "12px",
            width: "100%", padding: "11px 20px", border: "none", cursor: "pointer",
            background: page === n.id ? "rgba(191,234,245,0.1)" : "transparent",
            borderLeft: page === n.id ? `2px solid ${T.accent}` : "2px solid transparent",
            fontFamily: "'Inter', sans-serif", fontSize: "14px",
            fontWeight: page === n.id ? 600 : 400,
            color: page === n.id ? T.text : T.muted, transition: "all 0.15s",
          }}>
            <span style={{ fontSize: "16px" }}>{n.icon}</span>{n.label}
          </button>
        ))}
      </nav>
      <button onClick={onLogout} style={{
        margin: "0 20px", padding: "9px 13px", borderRadius: "8px",
        background: "rgba(224,92,92,0.1)", border: `1px solid rgba(224,92,92,0.2)`,
        color: T.danger, fontFamily: "'Inter', sans-serif", fontSize: "13px", cursor: "pointer", fontWeight: 500,
      }}>Sign out</button>
    </aside>
  );
}

/* ─────────────────────────── OVERVIEW ───────────────────────────────────── */
function Overview({ fish, banners }) {
  const stats = [
    { label: "Total Species",  value: fish.length,                         note: "in database"      },
    { label: "In Stock",       value: fish.filter(f => f.inStock).length,  note: "available now"    },
    { label: "Active Banners", value: banners.filter(b => b.isActive).length, note: "on homepage"   },
    { label: "Out of Stock",   value: fish.filter(f => !f.inStock).length, note: "needs restocking" },
  ];

  return (
    <div>
      <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "26px", color: T.text, marginBottom: "24px" }}>Overview</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "14px", marginBottom: "32px" }}>
        {stats.map(s => (
          <Card key={s.label}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "32px", color: T.sand }}>{s.value}</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: T.text, marginTop: "4px", fontWeight: 500 }}>{s.label}</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: T.muted, marginTop: "2px" }}>{s.note}</p>
          </Card>
        ))}
      </div>
      <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "18px", color: T.text, marginBottom: "14px" }}>Recent Fish</h3>
      <Card>
        {fish.length === 0 && (
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: T.muted, textAlign: "center", padding: "20px" }}>
            No fish yet — add some in the Fish tab.
          </p>
        )}
        {fish.slice(0, 5).map((f, i) => (
          <div key={f.id} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "12px 0", borderBottom: i < Math.min(fish.length, 5) - 1 ? `1px solid ${T.border}` : "none" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: T.surface, overflow: "hidden", flexShrink: 0 }}>
              {f.imageUrl && <img src={f.imageUrl} alt={f.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: T.text, fontWeight: 500 }}>{f.name}</p>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: T.muted }}>{f.category} · {f.cycle}</p>
            </div>
            <Badge ok={f.inStock}>{f.inStock ? "In stock" : "Out of stock"}</Badge>
          </div>
        ))}
      </Card>
    </div>
  );
}

/* ─────────────────────────── FISH FORM ──────────────────────────────────── */
function FishForm({ initial, onSave, onClose, toast, defaultCategory }) {
  const empty = { name: "", category: defaultCategory || "freshwater", inStock: true };
  const [form, setForm]       = useState(initial || empty);
  const [file, setFile]       = useState(null);
  const [preview, setPreview] = useState(initial?.imageUrl || null);
  const [saving, setSaving]   = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const pickFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const save = async () => {
    if (!form.name.trim()) return toast("Species name is required", "error");
    if (!initial && !file) return toast("Please upload an image", "error");
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("name",     form.name);
      fd.append("category", form.category);
      fd.append("cycle",    "");
      fd.append("note",     "");
      fd.append("inStock",  form.inStock);
      if (file) fd.append("image", file);

      let result;
      if (initial?.id) {
        result = await fetch(`${API_BASE}/fishes/${initial.id}`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${localStorage.getItem("af_token")}` },
          body: fd,
        }).then(r => r.json());
      } else {
        result = await fetch(`${API_BASE}/fishes`, {
          method: "POST",
          headers: { Authorization: `Bearer ${localStorage.getItem("af_token")}` },
          body: fd,
        }).then(r => r.json());
      }
      onSave(result);
    } catch (err) {
      toast("Save failed: " + err.message, "error");
    }
    setSaving(false);
  };

  return (
    <Modal title={initial ? "Edit fish" : "Add fish"} onClose={onClose}>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div>
          <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: T.muted, display: "block", marginBottom: "6px" }}>
            Photo {initial ? "(leave empty to keep current)" : "*"}
          </label>
          {preview && (
            <img src={preview} alt="preview" style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "8px", marginBottom: "8px" }} />
          )}
          <input type="file" accept="image/*" onChange={pickFile} style={{ cursor: "pointer" }} />
        </div>

        <div>
          <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: T.muted, display: "block", marginBottom: "6px" }}>Species name</label>
          <input type="text" value={form.name} onChange={e => set("name", e.target.value)} />
        </div>

        <div>
          <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: T.muted, display: "block", marginBottom: "6px" }}>Category</label>
          <select value={form.category} onChange={e => set("category", e.target.value)}>
            <option value="freshwater">Freshwater</option>
            <option value="shrimp">Shrimp</option>
            <option value="saltwater">Saltwater</option>
            <option value="molly">Molly</option>
            <option value="quickstock">Quick Stock</option>
          </select>
        </div>

        <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
          <input type="checkbox" checked={form.inStock} onChange={e => set("inStock", e.target.checked)} style={{ width: "auto", accentColor: T.accent }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: T.text }}>In stock</span>
        </label>

        <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "8px" }}>
          <Btn variant="ghost" onClick={onClose}>Cancel</Btn>
          <Btn onClick={save} disabled={saving}>{saving ? "Uploading…" : "Save fish"}</Btn>
        </div>
      </div>
    </Modal>
  );
}

/* ─────────────────────────── FISH PAGE ──────────────────────────────────── */
function FishPage({ toast }) {
  const [fish, setFish]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal]     = useState(null);
  const [search, setSearch]   = useState("");
  const [catFilter, setCatFilter] = useState("all");

  // Load fish from API on mount
  useEffect(() => {
    api("/fishes")
      .then(data => { setFish(data); setLoading(false); })
      .catch(() => { toast("Could not load fish", "error"); setLoading(false); });
  }, []);

  const onSave = (saved) => {
    setFish(prev => prev.find(f => f.id === saved.id)
      ? prev.map(f => f.id === saved.id ? saved : f)
      : [...prev, saved]
    );
    setModal(null);
    toast("Fish saved ✓");
  };

  const del = async (id) => {
    if (!window.confirm("Delete this fish?")) return;
    try {
      await api(`/fishes/${id}`, { method: "DELETE" });
      setFish(prev => prev.filter(f => f.id !== id));
      toast("Fish deleted");
    } catch (err) {
      toast("Delete failed: " + err.message, "error");
    }
  };

  const visible = fish.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) &&
    (catFilter === "all" || f.category === catFilter)
  );

  const cats = ["all", ...new Set(fish.map(f => f.category))];

  if (loading) return <Spinner />;

  return (
    <div>
      {modal === "add" && <FishForm onSave={onSave} onClose={() => setModal(null)} toast={toast} />}
      {modal?.fish     && <FishForm initial={modal.fish} onSave={onSave} onClose={() => setModal(null)} toast={toast} />}

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "22px", flexWrap: "wrap", gap: "12px" }}>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "26px", color: T.text }}>Fish</h2>
        <Btn onClick={() => setModal("add")}>+ Add fish</Btn>
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "18px", flexWrap: "wrap" }}>
        <input placeholder="Search species…" value={search} onChange={e => setSearch(e.target.value)} style={{ maxWidth: "260px" }} />
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)} style={{ width: "auto" }}>
          {cats.map(c => <option key={c} value={c}>{c === "all" ? "All categories" : c}</option>)}
        </select>
      </div>

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${T.border}` }}>
              {["Photo", "Species", "Category", "Cycle", "Status", "Actions"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: T.muted, letterSpacing: "0.06em", fontWeight: 400 }}>
                  {h.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 && (
              <tr><td colSpan={6} style={{ padding: "32px", textAlign: "center", color: T.muted, fontFamily: "'Inter', sans-serif", fontSize: "14px" }}>
                No fish found — add one above.
              </td></tr>
            )}
            {visible.map((f, i) => (
              <tr key={f.id} style={{ borderBottom: i < visible.length - 1 ? `1px solid ${T.border}` : "none" }}>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "8px", background: T.surface, overflow: "hidden" }}>
                    {f.imageUrl && <img src={f.imageUrl} alt={f.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                  </div>
                </td>
                <td style={{ padding: "12px 16px", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: T.text, fontWeight: 500 }}>{f.name}</td>
                <td style={{ padding: "12px 16px", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: T.muted }}>{f.category}</td>
                <td style={{ padding: "12px 16px", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: T.muted }}>{f.cycle}</td>
                <td style={{ padding: "12px 16px" }}><Badge ok={f.inStock}>{f.inStock ? "In stock" : "Out of stock"}</Badge></td>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <Btn variant="ghost" size="sm" onClick={() => setModal({ fish: f })}>Edit</Btn>
                    <Btn variant="danger" size="sm" onClick={() => del(f.id)}>Delete</Btn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

/* ─────────────────────────── BANNER FORM ────────────────────────────────── */

  function BannerForm({ initial, onSave, onClose, toast }) {
  const empty = { title: "", subtitle: "", isActive: true };
  const [form, setForm]       = useState(initial || empty);
  const [file, setFile]       = useState(null);
  const [preview, setPreview] = useState(initial?.imageUrl || null);
  const [saving, setSaving]   = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const pickFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const save = async () => {
    if (!form.title.trim()) return toast("Title is required", "error");
    if (!initial && !file) return toast("Please upload an image", "error");
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("title",    form.title);
      fd.append("subtitle", form.subtitle);
      fd.append("isActive", form.isActive);
      if (file) fd.append("image", file);

      let result;
      if (initial?.id) {
        result = await fetch(`${API_BASE}/banners/${initial.id}`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${localStorage.getItem("af_token")}` },
          body: fd,
        }).then(r => r.json());
      } else {
        result = await fetch(`${API_BASE}/banners`, {
          method: "POST",
          headers: { Authorization: `Bearer ${localStorage.getItem("af_token")}` },
          body: fd,
        }).then(r => r.json());
      }
      onSave(result);
    } catch (err) {
      toast("Save failed: " + err.message, "error");
    }
    setSaving(false);
  };

  return (
    <Modal title={initial ? "Edit banner" : "Add banner"} onClose={onClose}>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div>
          <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: T.muted, display: "block", marginBottom: "6px" }}>
            Banner image {initial ? "(leave empty to keep current)" : "*"}
          </label>
          {preview && (
            <img src={preview} alt="preview" style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "8px", marginBottom: "8px" }} />
          )}
          <input type="file" accept="image/*" onChange={pickFile} style={{ cursor: "pointer" }} />
        </div>

        {[["title","Headline"],["subtitle","Subtitle"]].map(([k, lbl]) => (
          <div key={k}>
            <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: T.muted, display: "block", marginBottom: "6px" }}>{lbl}</label>
            <input value={form[k]} onChange={e => set(k, e.target.value)} />
          </div>
        ))}

        <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
          <input type="checkbox" checked={form.isActive} onChange={e => set("isActive", e.target.checked)} style={{ width: "auto", accentColor: T.accent }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: T.text }}>Show on homepage</span>
        </label>

        <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "8px" }}>
          <Btn variant="ghost" onClick={onClose}>Cancel</Btn>
          <Btn onClick={save} disabled={saving}>{saving ? "Uploading…" : "Save banner"}</Btn>
        </div>
      </div>
    </Modal>
  );
}

/* ─────────────────────────── BANNERS PAGE ───────────────────────────────── */
function BannersPage({ toast }) {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal]     = useState(null);

  // Load banners from API — include all (active + hidden) for admin
  useEffect(() => {
    fetch(`${API_BASE}/banners/all`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("af_token")}` },
    })
      .then(r => r.json())
      .then(data => { setBanners(data); setLoading(false); })
      .catch(() => {
        // fallback: try public endpoint
        fetch(`${API_BASE}/banners`)
          .then(r => r.json())
          .then(data => { setBanners(data); setLoading(false); })
          .catch(() => { toast("Could not load banners", "error"); setLoading(false); });
      });
  }, []);

  const onSave = (saved) => {
    setBanners(prev => prev.find(b => b.id === saved.id)
      ? prev.map(b => b.id === saved.id ? saved : b)
      : [...prev, saved]
    );
    setModal(null);
    toast("Banner saved ✓");
  };

  const del = async (id) => {
    if (!window.confirm("Delete this banner?")) return;
    try {
      await api(`/banners/${id}`, { method: "DELETE" });
      setBanners(prev => prev.filter(b => b.id !== id));
      toast("Banner deleted");
    } catch (err) {
      toast("Delete failed: " + err.message, "error");
    }
  };

  const toggle = async (banner) => {
    try {
      const fd = new FormData();
      fd.append("title",    banner.title);
      fd.append("subtitle", banner.subtitle);
      fd.append("isActive", !banner.isActive);
      const result = await fetch(`${API_BASE}/banners/${banner.id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${localStorage.getItem("af_token")}` },
        body: fd,
      }).then(r => r.json());
      setBanners(prev => prev.map(b => b.id === banner.id ? result : b));
      toast(result.isActive ? "Banner is now live ✓" : "Banner hidden");
    } catch (err) {
      toast("Update failed: " + err.message, "error");
    }
  };

  if (loading) return <Spinner />;

  return (
    <div>
      {modal === "add"  && <BannerForm onSave={onSave} onClose={() => setModal(null)} toast={toast} />}
      {modal?.banner    && <BannerForm initial={modal.banner} onSave={onSave} onClose={() => setModal(null)} toast={toast} />}

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "22px" }}>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "26px", color: T.text }}>Banners</h2>
        <Btn onClick={() => setModal("add")}>+ Add banner</Btn>
      </div>

      {banners.length === 0 && (
        <Card>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: T.muted, textAlign: "center", padding: "20px" }}>
            No banners yet — add one above.
          </p>
        </Card>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
        {banners.map(b => (
          <Card key={b.id} style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ aspectRatio: "16/6", background: T.surface, overflow: "hidden", position: "relative" }}>
              {b.imageUrl && <img src={b.imageUrl} alt={b.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
              <div style={{ position: "absolute", top: "10px", right: "10px" }}>
                <Badge ok={b.isActive}>{b.isActive ? "Active" : "Hidden"}</Badge>
              </div>
            </div>
            <div style={{ padding: "16px" }}>
              <p style={{ fontFamily: "'Fraunces', serif", fontSize: "16px", color: T.text, fontWeight: 500 }}>{b.title}</p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: T.muted, marginTop: "4px" }}>{b.subtitle}</p>
              <div style={{ display: "flex", gap: "8px", marginTop: "14px" }}>
                <Btn variant="ghost" size="sm" onClick={() => toggle(b)}>{b.isActive ? "Hide" : "Show"}</Btn>
                <Btn variant="ghost" size="sm" onClick={() => setModal({ banner: b })}>Edit</Btn>
                <Btn variant="danger" size="sm" onClick={() => del(b.id)}>Delete</Btn>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
function FeaturedForm({ initial, onSave, onClose, toast }) {
  const empty = {
    name: "", cycle: "", note: "", inStock: true,
    temp: "", ph: "", tank: "", diet: "", lifespan: "", tankMates: "",
    category: "featured",
  };
  const [form, setForm]       = useState(initial || empty);
  const [file, setFile]       = useState(null);
  const [preview, setPreview] = useState(initial?.imageUrl || null);
  const [saving, setSaving]   = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const pickFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const save = async () => {
    if (!form.name.trim()) return toast("Species name is required", "error");
    if (!initial && !file) return toast("Please upload an image", "error");
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("name",      form.name);
      fd.append("category",  "featured");
      fd.append("cycle",     form.cycle     || "");
      fd.append("note",      form.note      || "");
      fd.append("inStock",   form.inStock);
      fd.append("temp",      form.temp      || "");
      fd.append("ph",        form.ph        || "");
      fd.append("tank",      form.tank      || "");
      fd.append("diet",      form.diet      || "");
      fd.append("lifespan",  form.lifespan  || "");
      fd.append("tankMates", form.tankMates || "");
      if (file) fd.append("image", file);

      let result;
      if (initial?.id) {
        result = await fetch(`${API_BASE}/fishes/${initial.id}`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${localStorage.getItem("af_token")}` },
          body: fd,
        }).then(r => r.json());
      } else {
        result = await fetch(`${API_BASE}/fishes`, {
          method: "POST",
          headers: { Authorization: `Bearer ${localStorage.getItem("af_token")}` },
          body: fd,
        }).then(r => r.json());
      }
      onSave(result);
    } catch (err) {
      toast("Save failed: " + err.message, "error");
    }
    setSaving(false);
  };

  const fields = [
    ["name",      "Species name *",              "text"],
    ["cycle",     "Scientific name / cycle",      "text"],
    ["temp",      "Temperature (e.g. 22°C - 28°C)", "text"],
    ["ph",        "pH Range (e.g. 7.0 - 8.5)",   "text"],
    ["tank",      "Tank Size (e.g. 75L min)",     "text"],
    ["diet",      "Diet",                         "text"],
    ["lifespan",  "Lifespan",                     "text"],
    ["tankMates", "Tank Mates",                   "text"],
  ];

  return (
    <Modal title={initial ? "Edit featured fish" : "Add featured fish"} onClose={onClose}>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <div>
          <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: T.muted, display: "block", marginBottom: "6px" }}>
            Photo {initial ? "(leave empty to keep current)" : "*"}
          </label>
          {preview && (
            <img src={preview} alt="preview" style={{ width: "100%", height: "140px", objectFit: "cover", borderRadius: "8px", marginBottom: "8px" }} />
          )}
          <input type="file" accept="image/*" onChange={pickFile} style={{ cursor: "pointer" }} />
        </div>

        {fields.map(([k, lbl]) => (
          <div key={k}>
            <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: T.muted, display: "block", marginBottom: "6px" }}>{lbl}</label>
            <input type="text" value={form[k] || ""} onChange={e => set(k, e.target.value)} />
          </div>
        ))}

        <div>
          <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: T.muted, display: "block", marginBottom: "6px" }}>Short description</label>
          <textarea rows={3} value={form.note || ""} onChange={e => set("note", e.target.value)} />
        </div>

        <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "8px" }}>
          <Btn variant="ghost" onClick={onClose}>Cancel</Btn>
          <Btn onClick={save} disabled={saving}>{saving ? "Uploading…" : "Save"}</Btn>
        </div>
      </div>
    </Modal>
  );
}
function FeaturedPage({ toast }) {
  const [fish, setFish]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal]   = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/fishes?category=featured`)
      .then(r => r.json())
      .then(data => { setFish(data); setLoading(false); })
      .catch(() => { toast("Could not load featured fish", "error"); setLoading(false); });
  }, []);

  const onSave = (saved) => {
    setFish(prev => prev.find(f => f.id === saved.id)
      ? prev.map(f => f.id === saved.id ? saved : f)
      : [...prev, saved]
    );
    setModal(null);
    toast("Featured fish saved ✓");
  };

  const del = async (id) => {
    if (!window.confirm("Remove from featured?")) return;
    try {
      await api(`/fishes/${id}`, { method: "DELETE" });
      setFish(prev => prev.filter(f => f.id !== id));
      toast("Removed from featured");
    } catch (err) {
      toast("Delete failed: " + err.message, "error");
    }
  };

  if (loading) return <Spinner />;

  return (
    <div>
{modal === "add" && (
  <FeaturedForm onSave={onSave} onClose={() => setModal(null)} toast={toast} />
)}
{modal?.fish && (
  <FeaturedForm initial={modal.fish} onSave={onSave} onClose={() => setModal(null)} toast={toast} />
)}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "26px", color: T.text }}>Featured Specimens</h2>
        <Btn onClick={() => setModal("add")}>+ Add featured fish</Btn>
      </div>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: T.muted, marginBottom: "24px" }}>
        These appear as cards in the Featured Specimens section on the homepage.
      </p>

      {fish.length === 0 && (
        <Card>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: T.muted, textAlign: "center", padding: "20px" }}>
            No featured fish yet — add one above.
          </p>
        </Card>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px" }}>
        {fish.map(f => (
          <Card key={f.id} style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ aspectRatio: "4/3", background: T.surface, overflow: "hidden" }}>
              {f.imageUrl && (
                <img src={f.imageUrl} alt={f.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              )}
            </div>
            <div style={{ padding: "14px" }}>
              <p style={{ fontFamily: "'Fraunces', serif", fontSize: "15px", color: T.text, fontWeight: 500 }}>{f.name}</p>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: T.muted, marginTop: "3px" }}>{f.cycle}</p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: T.muted, marginTop: "6px", lineHeight: 1.5 }}>{f.note}</p>
              <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                <Btn variant="ghost" size="sm" onClick={() => setModal({ fish: f })}>Edit</Btn>
                <Btn variant="danger" size="sm" onClick={() => del(f.id)}>Remove</Btn>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────── ENQUIRIES ──────────────────────────────────── */
function EnquiriesPage({ toast }) {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = async () => {
    setLoading(true);
    let allEnquiries = [];
    
    // 1. Fetch from local storage
    const local = JSON.parse(localStorage.getItem("af_enquiries") || "[]");
    allEnquiries = [...local];

    // 2. Fetch from backend if available
    try {
      const res = await fetch(`${API_BASE}/enquiries`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          // Merge and avoid duplicate local IDs
          const apiIds = new Set(data.map(item => item.id));
          const filteredLocal = allEnquiries.filter(item => !apiIds.has(item.id));
          allEnquiries = [...data, ...filteredLocal];
        }
      }
    } catch (err) {
      console.log("No backend connection for enquiries list. Showing local database.");
    }

    // Sort by date (descending)
    allEnquiries.sort((a, b) => {
      const dateA = a.date ? new Date(a.date) : new Date(0);
      const dateB = b.date ? new Date(b.date) : new Date(0);
      return dateB - dateA;
    });

    setEnquiries(allEnquiries);
    setLoading(false);
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const del = (id, isLocalOnly) => {
    if (!window.confirm("Delete this enquiry?")) return;
    
    // Delete local
    const local = JSON.parse(localStorage.getItem("af_enquiries") || "[]");
    const updatedLocal = local.filter(e => e.id !== id);
    localStorage.setItem("af_enquiries", JSON.stringify(updatedLocal));

    // Also attempt deleting on backend if not local only
    if (!isLocalOnly) {
      fetch(`${API_BASE}/enquiries/${id}`, { method: "DELETE" })
        .catch(() => {});
    }

    setEnquiries(prev => prev.filter(e => e.id !== id));
    toast("Enquiry deleted ✓");
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "26px", color: T.text, marginBottom: "8px" }}>Customer Enquiries</h2>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: T.muted, marginBottom: "24px" }}>
        View and manage livestock enquiries submitted by customers.
      </p>

      {enquiries.length === 0 && (
        <Card>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: T.muted, textAlign: "center", padding: "40px" }}>
            No enquiries received yet.
          </p>
        </Card>
      )}

      {enquiries.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {enquiries.map((e) => (
            <Card key={e.id || Math.random()} style={{ position: "relative" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: `1px solid ${T.border}`, paddingBottom: "12px", marginBottom: "12px" }}>
                <div>
                  <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: "18px", color: T.text, margin: 0 }}>{e.name}</h4>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: T.muted, marginTop: "4px" }}>
                    {e.date ? new Date(e.date).toLocaleString() : "Date Unknown"}
                  </p>
                </div>
                <Btn variant="danger" size="sm" onClick={() => del(e.id, true)}>Delete</Btn>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "12px" }}>
                <div>
                  <span style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, color: T.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>Email Address</span>
                  <a href={`mailto:${e.email}`} style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: T.accent, textDecoration: "none", fontWeight: 500 }}>{e.email}</a>
                </div>
                <div>
                  <span style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, color: T.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>Phone Number</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: T.text }}>{e.phone || "Not provided"}</span>
                </div>
              </div>

              <div style={{ marginBottom: "12px" }}>
                <span style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, color: T.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>Requested Species</span>
                <span style={{
                  display: "inline-block",
                  background: "rgba(191,234,245,0.15)",
                  border: `1px solid ${T.accent}30`,
                  borderRadius: "6px",
                  padding: "4px 8px",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: T.accent,
                  marginTop: "4px",
                  textTransform: "capitalize"
                }}>
                  {e.fishType.replace("-", " ")}
                </span>
              </div>

              <div>
                <span style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, color: T.muted, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>Customer Message</span>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: T.text, lineHeight: 1.5, margin: 0, padding: "12px", background: "rgba(255,255,255,0.03)", borderRadius: "8px", border: `1px solid ${T.border}`, whiteSpace: "pre-wrap" }}>
                  {e.message}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────── ROOT APP ───────────────────────────────────── */
export default function AdminDashboard() {
  const [token, setToken]     = useState(() => localStorage.getItem("af_token"));
  const [page, setPage]       = useState("overview");
  const [fish, setFish]       = useState([]);
  const [banners, setBanners] = useState([]);
  const [toastMsg, setToastMsg] = useState({ msg: "", type: "success" });

  const toast = (msg, type = "success") => {
    setToastMsg({ msg, type });
    setTimeout(() => setToastMsg({ msg: "", type: "success" }), 2800);
  };

  // Load overview data
  useEffect(() => {
    if (!token) return;
    if (token === "offline_token") {
      setFish([]);
      setBanners([]);
      return;
    }
    api("/fishes").then(setFish).catch(() => {});
    fetch(`${API_BASE}/banners`).then(r => r.json()).then(setBanners).catch(() => {});
  }, [token]);

  const logout = () => {
    localStorage.removeItem("af_token");
    setToken(null);
  };

  if (!token) return <Login onLogin={t => { localStorage.setItem("af_token", t); setToken(t); }} />;

  const isOffline = token === "offline_token";

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: T.bg, fontFamily: "'Inter', sans-serif" }}>
      <style>{fonts}</style>
      <Sidebar page={page} onPage={setPage} onLogout={logout} />
      <main style={{ flex: 1, padding: "36px 32px", overflowY: "auto" }}>
        {isOffline && (
          <div style={{
            background: "rgba(232,220,196,0.06)",
            border: "1px solid rgba(232,220,196,0.22)",
            borderRadius: "10px", padding: "12px 16px",
            color: T.sand, fontSize: "13px", fontFamily: "'Inter', sans-serif",
            marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px"
          }}>
            <span>⚠️</span>
            <span>Running in <strong>Offline Mode</strong>. Live database actions are disabled, but you can view and manage enquiries stored locally.</span>
          </div>
        )}
        {page === "overview" && <Overview fish={fish} banners={banners} />}
        {page === "fish"     && <FishPage toast={toast} />}
        {page === "featured" && <FeaturedPage toast={toast} />}
        {page === "banners"  && <BannersPage toast={toast} />}
        {page === "enquiries" && <EnquiriesPage toast={toast} />}
      </main>
      <Toast msg={toastMsg.msg} type={toastMsg.type} />
    </div>
  );
}
