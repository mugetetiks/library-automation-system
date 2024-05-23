import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar className="header" expand="lg">
      <Navbar.Brand href="/">Library System</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/books">Books</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          <Nav.Link href="/login" className='login-signup-link'>
            <i className="bi bi-person-fill"></i> Log in
          </Nav.Link>
          <Nav.Link href="/signup" className='login-signup-link'>
            <i className="bi bi-person-plus-fill"></i> Sign up
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
