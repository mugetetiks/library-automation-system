import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ConfirmHandOver = () => {
  const [reservedBooks, setReservedBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchReservedBooks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/documents/reserved', { withCredentials: true });
        setReservedBooks(res.data);
      } catch (err) {
        console.error('Error fetching reserved books:', err);
      }
    };

    fetchReservedBooks();
  }, []);

  const handleConfirmHandOver = async () => {
    if (selectedBook) {
      try {
        await axios.delete(`http://localhost:5000/api/documents/confirm-hand-over/${selectedBook}`, { withCredentials: true });
        setReservedBooks(prevBooks => prevBooks.filter(book => book.reservation_id !== selectedBook));
        alert('Hand-over confirmed successfully');
        setSelectedBook(null);
      } catch (err) {
        console.error('Error confirming hand-over:', err);
        alert(err.response?.data?.msg || 'Error confirming hand-over');
      }
    } else {
      alert('Please select a book to confirm hand-over.');
    }
  };

  return (
    <div className="confirm-hand-over">
      <h1>Confirm Hand-Over</h1>
      <div>
        <label htmlFor="bookSelect">Select Book:</label>
        <select
          id="bookSelect"
          value={selectedBook || ''}
          onChange={(e) => setSelectedBook(e.target.value)}
        >
          <option value="" disabled>Select a book</option>
          {reservedBooks.map(book => (
            <option key={book.reservation_id} value={book.reservation_id}>
              {book.doc_name} by {book.author}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleConfirmHandOver}>Confirm Hand-Over</button>
    </div>
  );
};

export default ConfirmHandOver;
