import React from 'react';
import EventCard from './EventCard';
import { Container, Row, Col } from 'react-bootstrap';

const Events = () => {
  const eventList = [
    {title: 'Midsummer Nights Dream' , src:require("../assets/eventcard1.png")},
   {title: 'Dracula Musical', src:require("../assets/eventcard2.png")}, 
   {title: 'Amadeus', src:require("../assets/eventcard3.png")}, 
   {title: 'Guernica Exhibition', src:require("../assets/eventcard4.png")}];
  return (
    <Container className="events-section">
      <h2>Upcoming Events</h2>
      <Row>
        {eventList.map((event, index) => (
          <Col key={index} sm={12} md={6} lg={3}>
            <EventCard title={event.title} src={event.src} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Events;
