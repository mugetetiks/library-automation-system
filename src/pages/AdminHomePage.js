import React from 'react';
import { Accordion } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import UserProfile from '../services/userProfile';

const AdminHomePage = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const username = UserProfile.getName();
    const role = UserProfile.getRole();

    if (!username || role !== 'admin') {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="admin-homepage">
      <div className="container mt-4">
        <h1>Admin Dashboard</h1>
        <Accordion defaultActiveKey="0" flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Home</Accordion.Header>
            <Accordion.Body>
              <Link to="/">Go to Home</Link>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Catalogue</Accordion.Header>
            <Accordion.Body>
              <ul>
                <li><Link to="/admin/add-document">Add Document</Link></li>
                <li>Update Document</li>
                <li>Delete Document</li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Collections</Accordion.Header>
            <Accordion.Body>
              <ul>
                <li>Add Collection</li>
                <li>Update Collection</li>
                <li>Delete Collection</li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Services</Accordion.Header>
            <Accordion.Body>
              <ul>
                <li>Confirm Hand-over</li>
                <li>Confirm Payment</li>
                <li>View Reserved Books</li>
                <li>View Overdue Books</li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};

export default AdminHomePage;
