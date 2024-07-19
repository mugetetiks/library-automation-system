import React, { useEffect } from 'react';
import { Accordion } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import UserProfile from '../services/userProfile';

const AdminHomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
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
                <li><Link to="/admin/update-document">Update Document</Link></li>
                <li><Link to="/admin/delete-document">Delete Document</Link></li>
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
                <li><Link to="/admin/confirm-hand-over">Confirm Hand-over</Link></li>
                <li><Link to="/admin/view-reserved-books">View Reserved Books</Link></li>
                <li><Link to="/admin/confirm-payment">Confirm Payment</Link></li>
                <li><Link to="/admin/view-overdue-books">View Overdue Books</Link></li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};

export default AdminHomePage;
