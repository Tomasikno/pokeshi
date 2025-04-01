// hooks/useCardSearch.ts
import { useState } from "react";
import { fetchCard } from "@/services/cardService";
import { Card } from "pokemon-tcg-sdk-typescript/dist/sdk";

export function useCardSearch() {
  const [query, setQuery] = useState("");
  const [cards, setCards] = useState<Card[]>([]);
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { query, setQuery, cards, error, loading, handleSubmit };
}
