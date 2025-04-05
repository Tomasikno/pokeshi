"use client";

import { useSetsSearch } from "@/hooks/useSetsSearch";
import { ListGroup, Accordion } from "react-bootstrap";

export default function PokemonSetsList() {
  const { sets, loading, error } = useSetsSearch();
  return (
    <>
        <div className="d-flex justify-content-center">
            {loading && <div className="mt-3 loader"></div>}
        </div>
        {error && <p className="text-danger mt-3">{error}</p>}
        {sets.length > 0 && (
        <Accordion className="mt-3 mb-4 p-2">
            <Accordion.Item eventKey="0">
                <Accordion.Header>List of sets</Accordion.Header>
                <Accordion.Body>
                    <ListGroup style={{ maxHeight: "400px", overflowY: "auto" }}>
                        {sets && sets.map((set, index) => (
                            <ListGroup.Item key={index}>
                                <b>{ set.code }</b> - { set.name } 
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
        )}
    </>
  );
}
