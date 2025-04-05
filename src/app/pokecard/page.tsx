"use client";

import { Form, Button, Container } from "react-bootstrap";
import SetsList from "@/components/SetsList";
import PokeCard from "@/components/PokeCard";
import { useCardSearch } from "@/hooks/useCardSearch";


export default function Search() {
  const { query, cards, error, loading, handleSubmit, setQuery, } = useCardSearch();

  return (
    <>
      <h2 className="text-center mb-2">Search Pokémon Cards by code</h2>
      <Form onSubmit={handleSubmit} className="d-flex justify-content-center gap-4 mb-4 p-2 shadow-sm sticky-top bg-light">
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
        <Button variant="primary" type="submit" disabled={loading} className="border border-dark text-dark bg-light ">
          {loading ? "Searching..." : "Search"}
        </Button>
      </Form>

      <Container className="mb-4">
        {loading && <p className="mt-3">Loading...</p>}
        {error && <p className="text-danger mt-3">{error}</p>}
        {cards.length > 0 && (
          <div className="d-flex flex-row gap-2 flex-wrap justify-content-center">
            {cards.map((cardItem, index) => (
              <PokeCard key={index} card={cardItem} />
            ))}
          </div>
        )}
      </Container>
      <SetsList />
    </>
  );
}
