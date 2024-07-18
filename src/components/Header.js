import React from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import UserProfile from '../services/userProfile';

const Header = ({ role }) => {
  const navigate = useNavigate();

  const handleLogoClick = (e) => {
    e.preventDefault();
    navigate(role === 'admin' ? '/admin' : '/home');
  };

  return (
    <Navbar className="header" expand="lg">
      <Navbar.Brand as={Link} to="#" onClick={handleLogoClick}>Narnia Library</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Dropdown as={Nav.Item}>
            <Dropdown.Toggle as={Nav.Link}>Home</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/home">Go to Home</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown as={Nav.Item}>
            <Dropdown.Toggle as={Nav.Link}>Services</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/reserve">Reserve Book</Dropdown.Item>
              <Dropdown.Item as={Link} to="/pay-debt">Pay Debt</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown as={Nav.Item}>
            <Dropdown.Toggle as={Nav.Link}>Collections</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/collections">Collections</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown as={Nav.Item}>
            <Dropdown.Toggle as={Nav.Link}>Documents</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/documents">View Documents</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
