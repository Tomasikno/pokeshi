"use client";

import { Form, Button, Container } from "react-bootstrap";
import SetsList from "@/components/SetsList";
import PokeCard from "@/components/PokeCard";
import { useCardSearch } from "@/hooks/useCardSearch";
import ToastMessage from "@/components/MessageToast";


export default function Search() {
  const {
    query,
    cards,
    loading,
    handleSubmit,
    setQuery,
    removeCard,
    clearSavedCards,
    toastMessage,
    setToastMessage,
  } = useCardSearch();
  return (
    <>
      <h2 className="text-center mb-2">Search Pokémon Cards by code</h2>
      <div className=" shadow-sm sticky-top bg-light">
      
        <Form onSubmit={handleSubmit} className="d-flex justify-content-center gap-4 mb-4 p-2">
          <Form.Group className="mb-2" controlId="cardQuery">
            <Form.Label>Enter card code (e.g., PRE 011)</Form.Label>
            <Form.Control
              type="text"
              placeholder="PTCGO Code"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{'width':"12rem"}}
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading} className="zoom border border-dark text-dark bg-light ">
            {loading ? <div className="loader"></div> : "Search and add"}
          </Button>
        </Form>
      </div>

      <Container className="mb-4">
        {cards.length > 0 ? (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3>Saved Cards</h3>
              <Button variant="danger" size="sm" onClick={clearSavedCards}>
                Clear Saved Cards
              </Button>
            </div>
            <div className="d-flex flex-row gap-4 flex-wrap justify-content-center">
              {cards.map((cardItem) => (
                <PokeCard key={cardItem.id} card={cardItem} onRemoveAction={() => removeCard(cardItem.id)} />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center">No saved cards yet. Search to add some!</p>
        )}
      </Container>

      <SetsList />
      
      <Container className="mb-4 position-relative">
        <ToastMessage
          message={toastMessage?.message || null}
          variant={toastMessage?.variant}
          onClose={() => setToastMessage(null)}
        />
      </Container>
    </>
  );
}
