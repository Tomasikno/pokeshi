'use client';

import { Card } from "react-bootstrap";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import Button from 'react-bootstrap/Button';

interface PokeCardProps {
    card: PokemonTCG.Card;
}

export default function PokeCard({ card }: PokeCardProps) {
    return(
        <Card key={card.id} style={{'width':"14rem"}}>
            <Card.Img variant="top" src={card.images.large} alt={card.name} />
            <Card.Body>
            <Card.Title>{card.name}</Card.Title>
            <Card.Text className="d-flex flex-wrap justify-content-center">
                <span className="w-100 mb-2">
                    <strong>ID:</strong> {card.id} <br />
                    <strong>PTCGO Code:</strong> {card.set.ptcgoCode || "N/A"} <br />
                    <strong>Type:</strong> {card.types?.join(", ") || "N/A"} <br />
                    <strong>Rarity:</strong> {card.rarity || "N/A"}
                </span>
                <Button variant="danger" className="me-2" >Delete</Button>
                <Button variant="success">Aquired</Button>
            </Card.Text>
            </Card.Body>
        </Card>
    );
}