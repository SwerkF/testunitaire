import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/global.css';

const NavbarComponent = () => {
    return (
        <Navbar expand="lg" className="navBarBg">
        <Container fluid>
          <Link to="/" className="nav-link" ><Navbar.Brand className='fw-semibold text-light fs-3'>LE HARVRE</Navbar.Brand></Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Link to="/" className="nav-link text-light fw-semibold">ACCUEIL</Link>
              <Link to="/events" className="nav-link text-light fw-semibold">EVENEMENTS</Link>
              <Link to="/calendar" className="nav-link text-light fw-semibold">CALENDRIER</Link>
              {/* <Link to="/reservations" className="nav-link text-light fw-semibold">RESERVATIONS (A SUPPRIMER)</Link> */}
              <Link to="/login" className="nav-link text-light fw-semibold">SE CONNECTER</Link>
              {/* <Link to="/admin" className="nav-link text-light fw-semibold">ADMIN (A SUPPRIMER)</Link> */}
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
};

export default NavbarComponent;