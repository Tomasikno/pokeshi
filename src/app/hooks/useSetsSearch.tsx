import { useState, useEffect } from "react";

export function useSetsSearch() {
  const [sets, setSets] = useState<{ code: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSets = async () => {
      try {
        const response = await fetch("/api/searchSets");
        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon sets");
        }
        const result = await response.json();

        setSets(result.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchSets();
  }, []);

  return { sets, loading, error };
}
