// components/Search.tsx
"use client";

import { Form, Button, Card, Container } from "react-bootstrap";
import SetsList from "@/components/SetsList";
import { useCardSearch } from "@/hooks/useCardSearch";

export default function Search() {
  const { query, setQuery, cards, error, loading, handleSubmit } = useCardSearch();

  return (
    <Container className="mt-4">
      <h2>Search Pokémon Cards by code</h2>
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group className="mb-2" controlId="cardQuery">
          <Form.Label>Enter card code (e.g., PRE 011)</Form.Label>
          <Form.Control
            type="text"
            placeholder="PTCGO Code"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </Button>
      </Form>

      {loading && <p className="mt-3">Loading...</p>}
      {error && <p className="text-danger mt-3">{error}</p>}
      {cards.length > 0 && (
        <div className="mt-4">
          {cards.map((card) => (
            <Card key={card.id} className="mb-4">
              <Card.Img variant="top" src={card.images.large} alt={card.name} />
              <Card.Body>
                <Card.Title>{card.name}</Card.Title>
                <Card.Text>
                  <strong>ID:</strong> {card.id} <br />
                  <strong>PTCGO Code:</strong> {card.set.ptcgoCode || "N/A"} <br />
                  <strong>Type:</strong> {card.types?.join(", ") || "N/A"} <br />
                  <strong>Rarity:</strong> {card.rarity || "N/A"}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}

      <SetsList />
    </Container>
  );
}
