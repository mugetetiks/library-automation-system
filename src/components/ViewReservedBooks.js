import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewReservedBooks = () => {
  const [reservedBooks, setReservedBooks] = useState([]);

  useEffect(() => {
    const fetchReservedBooks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/documents/view-reserved-books', { withCredentials: true });
        setReservedBooks(res.data);
      } catch (err) {
        console.error('Error fetching reserved books:', err);
      }
    };

    fetchReservedBooks();
  }, []);

  return (
    <div className="view-reserved-books">
      <h1>Reserved Books</h1>
      {reservedBooks.length > 0 ? (
        <ul>
          {reservedBooks.map(book => (
            <li key={book.reservation_id}>
              {book.doc_name} by {book.author} - Reserved by {book.reserved_by} on {new Date(book.reserved_at).toLocaleDateString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No reserved books</p>
      )}
    </div>
  );
};

export default ViewReservedBooks;
