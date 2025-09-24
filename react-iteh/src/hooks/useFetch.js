import { useEffect, useState } from "react";

export default function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(url));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();
    const { signal } = controller;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(url, { ...options, signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        setData(json);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message || "Fetch error");
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}
