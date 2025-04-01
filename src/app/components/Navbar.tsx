"use client";

import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

export default function NavBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className='mb-4' >
      <Container>
        <Navbar.Brand href="/">Pokeshi</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/pokecard">Search</Nav.Link>
            <NavDropdown title="Cards" id="basic-nav-dropdown">
              <NavDropdown.Item href="/cards/fire">Fire Types</NavDropdown.Item>
              <NavDropdown.Item href="/cards/water">Water Types</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/cards/all">All Cards</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}