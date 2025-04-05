"use client";

import { CardWithStatus } from "app/lib/CardWithStatus";
import { Card, Button } from "react-bootstrap";

interface PokeCardProps {
  card: CardWithStatus;
  onRemoveAction: () => void; // Function to remove the card
  onAcquired?: (cardId: string) => void; // Optional: Mark card as acquired
}

export default function PokeCard({ card, onRemoveAction, onAcquired }: PokeCardProps) {
  return (
    <Card style={{ width: "14rem" }} >
      <Card.Img variant="top" src={card.images.large} alt={card.name} className={`zoom ${card.acquired ? 'acquired-card' : ''}`} />
      <Card.Body>
        <Card.Title>{card.name}</Card.Title>
        <Card.Text className="d-flex flex-wrap justify-content-center">
          <span className="w-100 mb-2">
            <strong>ID:</strong> {card.id} <br />
            <strong>PTCGO Code:</strong> {card.set.ptcgoCode || "N/A"} <br />
            <strong>Type:</strong> {card.types?.join(", ") || "N/A"} <br />
            <strong>Rarity:</strong> {card.rarity || "N/A"}
          </span>
          <Button variant="danger" className="me-2" onClick={onRemoveAction}>
            Delete
          </Button>

          {onAcquired && (
            <Button
              variant={card.acquired ? "outline-success" : "success"}
              onClick={() => onAcquired(card.id)}
            >
              {card.acquired ? "Unmark" : "Acquired"}
            </Button>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}