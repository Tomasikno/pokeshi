import { useState, useEffect } from "react";
import { fetchCard } from "@/services/cardService";
import { CardWithStatus } from "app/lib/CardWithStatus";
import { IToastState } from "@/components/MessageToast/IToastState"

export function useCardSearch() {
  const [query, setQuery] = useState("");
  const [cards, setCards] = useState<CardWithStatus[]>([]);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<IToastState | null>(null);

  // Load cards from localStorage on mount
  useEffect(() => {
    const storedCards = localStorage.getItem('savedCards');
    if (storedCards) {
      setCards(JSON.parse(storedCards));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const [ptcgoCode, pokemonNumber] = query.split(" ");
      if (!ptcgoCode || !pokemonNumber) {
        throw new Error('Invalid format. Use "SET NUMBER" (e.g., "PRE 011")');
      }

      const newCard = await fetchCard(ptcgoCode, pokemonNumber);
      const storedCards = localStorage.getItem('savedCards');
      const currentCards: CardWithStatus[] = storedCards ? JSON.parse(storedCards) : [];

      const cardExists = currentCards.some(card => card.id === newCard.id);
      if (!cardExists) {
        const updatedCards = [newCard, ...currentCards];
        localStorage.setItem('savedCards', JSON.stringify(updatedCards));
        setCards(updatedCards);
      } else {
        setToastMessage({ message: `${newCard.name} is already saved.`, variant: "info" });
        setCards(currentCards); // Keep existing cards if duplicate
      }

      setQuery(ptcgoCode);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setToastMessage({ message: error.message, variant: "danger" });
    } finally {
      setLoading(false);
    }
  };

  const removeCard = (cardId: string) => {
    const updatedCards = cards.filter(card => card.id !== cardId);
    localStorage.setItem('savedCards', JSON.stringify(updatedCards));
    setCards(updatedCards);
  };

 
  const clearSavedCards = () => {
    localStorage.removeItem('savedCards');
    setCards([]);
  };

  const toggleAcquired = (cardId: string) => {
    const updatedCards = cards.map(card =>
      card.id === cardId ? { ...card, acquired: !card.acquired } : card
    );
    localStorage.setItem('savedCards', JSON.stringify(updatedCards));
    setCards(updatedCards);
    const card = updatedCards.find(c => c.id === cardId);
    setToastMessage({
      message: `${card?.name} marked as ${card?.acquired ? 'acquired' : 'unmarked'}.`,
      variant: "success",
    });
  };
  return {
    query,
    cards,
    loading,
    toastMessage,
    handleSubmit,
    setQuery,
    removeCard,
    clearSavedCards,
    setToastMessage,
    toggleAcquired
  };
}