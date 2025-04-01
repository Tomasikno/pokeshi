"use client";

import { useSetsSearch } from "@/hooks/useSetsSearch";
import { ListGroup, Accordion } from "react-bootstrap";

export default function PokemonSetsList() {
  const { sets } = useSetsSearch();

  return (
    <Accordion>
        <Accordion.Item eventKey="0">
            <Accordion.Header>List of sets</Accordion.Header>
            <Accordion.Body>
                <ListGroup style={{ maxHeight: "400px", overflowY: "auto" }}>
                    {sets && sets.map((set, index) => (
                        <ListGroup.Item key={index}>
                            <strong> { set.code }</strong> - { set.name } 
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Accordion.Body>
        </Accordion.Item>
    </Accordion>
  );
}
