import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const AdminNavbar = () => {
  return (
    <Navbar className="header" expand="lg">
      <Navbar.Brand as={Link} to="/admin">Narnia Library Admin</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/admin">Home</Nav.Link>
          <Nav.Link as={Link} to="/admin/services">Services</Nav.Link>
          <Nav.Link as={Link} to="/admin/collections">Collections</Nav.Link>
          <Nav.Link as={Link} to="/admin/catalogue">Catalogue</Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          <Nav.Link as={Link} tcuo="/logout" className='login-signup-link'>
            <i className="bi bi-person-fill"></i> Log out
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AdminNavbar;
