import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

const NavbarComponent = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#">Nom du projet</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="#action1">Accueil</Nav.Link>
   
            </Nav>
            <Button variant="btn btn-success me-4">Connexion</Button>

            <Button variant="outline-success">Inscription</Button>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
};

export default NavbarComponent;