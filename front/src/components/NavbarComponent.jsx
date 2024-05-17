import React, { useEffect, useContext, useState } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/global.css';
import { UserContext } from '../App';

const NavbarComponent = () => {

    const { user } = useContext(UserContext);
    const [userState, setUserState] = useState(null);

    useEffect(() => {
      const user = localStorage.getItem('user');
      if (user) {
        setUserState(user);
      } else {
        setUserState(null);
      }
    }
    , [user]);
    
    console.log(userState);

    const handleLogout = () => {
      localStorage.removeItem('user');
      window.location.reload();
    }
    
    return (
        <Navbar expand="lg" className="navBarBg">
        <Container fluid>
          <Link to="/" className="nav-link" ><Navbar.Brand className='fw-semibold text-light fs-3'>LE HAVRE</Navbar.Brand></Link>
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
              {!userState && <Link to="/login" className="nav-link text-light fw-semibold">CONNEXION</Link>}
              {userState && (
                <React.Fragment> 
                  <Link to="/reservations" className="nav-link text-light fw-semibold">RESERVATIONS</Link>
                  <button onClick={() => handleLogout()} className="fw-semibold btn btn-danger ms-4">DECONNEXION</button>
                </React.Fragment>
              )}
              {userState && user.role == "admin" && <Link to="/admin" className="nav-link text-light fw-semibold">ADMIN</Link>}

            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
};

export default NavbarComponent;