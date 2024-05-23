import React from 'react';
import { Card } from 'react-bootstrap';

const EventCard = ({ title }) => {
  return (
    <Card className="event-card">
      <Card.Img variant="top" src="https://via.placeholder.com/150x200" alt={title} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default EventCard;
