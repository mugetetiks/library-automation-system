import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const books = [
  { id: 1, title: 'Book One', author: 'Author One' },
  { id: 2, title: 'Book Two', author: 'Author Two' },
  { id: 3, title: 'Book Three', author: 'Author Three' },
];

const BookList = () => {
  return (
    <Row>
      {books.map((book) => (
        <Col key={book.id} sm={12} md={6} lg={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>{book.title}</Card.Title>
              <Card.Text>{book.author}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default BookList;
