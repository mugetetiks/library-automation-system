import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = ({ role }) => {
  return (
    <Navbar className="header" expand="lg">
      <Navbar.Brand as={Link} to="/">Narnia Library</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/services">Services</Nav.Link>
          <Nav.Link as={Link} to="/collections">Collections</Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          {role ? (
            <Nav.Link as={Link} to="/logout">Log out</Nav.Link>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">Log in</Nav.Link>
              <Nav.Link as={Link} to="/signup">Sign up</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
