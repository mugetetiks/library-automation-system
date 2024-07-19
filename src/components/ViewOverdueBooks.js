import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewOverdueBooks = () => {
  const [overdueBooks, setOverdueBooks] = useState([]);

  useEffect(() => {
    const fetchOverdueBooks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/debt/overdue-books', { withCredentials: true });
        setOverdueBooks(res.data);
      } catch (err) {
        console.error('Error fetching overdue books:', err);
      }
    };

    fetchOverdueBooks();
  }, []);

  return (
    <div className="view-overdue-books">
      <h1>Overdue Books</h1>
      {overdueBooks.length > 0 ? (
        <ul>
          {overdueBooks.map(book => (
            <li key={book.debt_id}>
              {book.doc_name} - Member: {book.member_name} - Reserved on: {new Date(book.reserved_at).toLocaleDateString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No overdue books</p>
      )}
    </div>
  );
};

export default ViewOverdueBooks;
