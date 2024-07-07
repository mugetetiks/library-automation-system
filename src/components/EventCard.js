import React from 'react';
import { Card } from 'react-bootstrap';

const EventCard = ({ title, src }) => {
  return (
    <Card className="event-card">
      <Card.Img variant="top" src={src} alt={title} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default EventCard;

