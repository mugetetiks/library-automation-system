import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import UserProfile from '../services/userProfile';

const Header = () => {
  const isLoggedIn = UserProfile.getName() !== null;

  return (
    <Navbar className="header" expand="lg">
      <Navbar.Brand href="/">Narnia Library</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/services">Services</Nav.Link>
          <Nav.Link href="/collections">Collections</Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          {isLoggedIn ? (
            <Nav.Link href="/logout" className='login-signup-link'>
              <i className="bi bi-person-fill"></i> Log out
            </Nav.Link>
          ) : (
            <>
              <Nav.Link href="/login" className='login-signup-link'>
                <i className="bi bi-person-fill"></i> Log in
              </Nav.Link>
              <Nav.Link href="/signup" className='login-signup-link'>
                <i className="bi bi-person-plus-fill"></i> Sign up
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
