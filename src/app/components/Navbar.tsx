"use client";

import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

export default function NavBar() {
  return (
  <Navbar bg="light" expand="lg" className='shadow-sm p-3 mb-5 bg-body rounded'>
      <Container>
        {/* Brand/Logo Section */}
        <Navbar.Brand href="/">
          <span className="logo">
            {/* Placeholder for the logo (two semi-circles) */}
            <span className="logo-circles">⬤◐</span> Pokeshi
          </span>
        </Navbar.Brand>

        {/* Toggle for mobile view */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Nav Links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/pokecard">Search a card</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}