import React from 'react';
import EventCard from './EventCard';
import { Container, Row, Col } from 'react-bootstrap';

const Events = () => {
  const eventList = ['Event A', 'Event B', 'Event C', 'Event D'];
  return (
    <Container className="events-section">
      <h2>Upcoming Events</h2>
      <Row>
        {eventList.map((event, index) => (
          <Col key={index} sm={12} md={6} lg={3}>
            <EventCard title={event} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Events;
