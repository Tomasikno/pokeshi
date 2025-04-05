import { useState } from "react";
import { fetchCard } from "@/services/cardService";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";

export function useCardSearch() {
  const [query, setQuery] = useState("");
  const [cards, setCards] = useState<PokemonTCG.Card[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const [ptcgoCode, pokemonNumber] = query.split(" ");
      const cards = await fetchCard(ptcgoCode, pokemonNumber);
      setCards((prevCards) => [...prevCards, cards]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { query, cards, error, loading, handleSubmit, setQuery };
}
