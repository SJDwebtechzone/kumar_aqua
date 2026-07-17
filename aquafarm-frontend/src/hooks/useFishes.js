import { useState, useEffect } from "react";

const rawApiUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE;
const API_BASE = (rawApiUrl && rawApiUrl !== "undefined") ? rawApiUrl : "http://localhost:5000/api";

// ── Fetch all fish (optional category filter) ──
export function useFishes(category = "") {
  const [fishes, setFishes]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    const url = category
      ? `${API_BASE}/fishes?category=${category}`
      : `${API_BASE}/fishes`;

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(data => { setFishes(data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, [category]);

  return { fishes, loading, error };
}

// ── Fetch all active banners ──
export function useBanners() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/banners`)
      .then(res => res.json())
      .then(data => { setBanners(data); setLoading(false); });
  }, []);

  return { banners, loading };
}