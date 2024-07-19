import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewReservedBooks = () => {
  const [reservedBooks, setReservedBooks] = useState([]);
  const [debts, setDebts] = useState({}); // Borç olarak işaretlenen kitapların durumunu tutmak için ek state

  useEffect(() => {
    const fetchReservedBooks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/documents/view-reserved-books', { withCredentials: true });
        setReservedBooks(res.data);

        // debt tablosundaki kitapları kontrol ederek borç durumunu güncelle
        const debtRes = await axios.get('http://localhost:5000/api/debt/overdue-books', { withCredentials: true });
        const debtMap = {};
        debtRes.data.forEach(debt => {
          debtMap[debt.reservation_id] = true;
        });
        setDebts(debtMap);
      } catch (err) {
        console.error('Error fetching reserved books:', err);
      }
    };

    fetchReservedBooks();
  }, []);

  const handleMarkAsDebt = async (book) => {
    try {
      const { doc_id, member_id, reservation_id } = book;
      await axios.post('http://localhost:5000/api/debt/mark-as-debt', { doc_id, member_id, reservation_id }, { withCredentials: true });
      alert('Book marked as debt successfully');
      
      // Butonun durumunu güncelle
      setDebts(prevDebts => ({ ...prevDebts, [reservation_id]: true }));
    } catch (err) {
      console.error('Error marking book as debt:', err);
      alert(err.response?.data?.msg || 'Error marking book as debt');
    }
  };

  return (
    <div className="view-reserved-books">
      <h1>Reserved Books</h1>
      {reservedBooks.length > 0 ? (
        <ul>
          {reservedBooks.map(book => (
            <li key={book.reservation_id}>
              {book.doc_name} by {book.author} - Reserved by {book.reserved_by} on {new Date(book.reserved_at).toLocaleDateString()}
              {debts[book.reservation_id] ? (
                <button style={{ backgroundColor: 'green', color: 'white' }} disabled>Debt</button>
              ) : (
                <button onClick={() => handleMarkAsDebt(book)}>Mark as Debt</button>
              )}
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
