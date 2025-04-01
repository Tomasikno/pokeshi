// hooks/useCardSearch.ts
import { useState } from "react";
import { fetchCard } from "@/services/cardService";

export function useCardSearch() {
  const [query, setQuery] = useState("");
  const [cards, setCards] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setCards([]);
    setLoading(true);

    try {
      const [ptcgoCode, pokemonNumber] = query.split(" ");
      const card = await fetchCard(ptcgoCode, pokemonNumber);
      setCards([card]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { query, setQuery, cards, error, loading, handleSubmit };
}
