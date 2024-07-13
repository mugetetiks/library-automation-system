import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReserveBook = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [documents, setDocuments] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [reservedBook, setReservedBook] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/documents', { withCredentials: true });
        setDocuments(res.data);
      } catch (err) {
        console.error('Error fetching documents:', err);
      }
    };

    fetchDocuments();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const results = documents.filter((doc) =>
      doc.doc_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleReserve = async (bookId) => {
    try {
      const res = await axios.post('http://localhost:5000/api/documents/reserve', { bookId }, { withCredentials: true });
      alert('Book reserved successfully');
      setReservedBook(res.data);
    } catch (err) {
      console.error('Error reserving book:', err);
      alert('Error reserving book');
    }
  };

  return (
    <div className="reserve-book">
      <h1>Reserve Book</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a book..."
          required
        />
        <button type="submit">Search</button>
      </form>
      <div className="search-results">
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((book) => (
              <li key={book.doc_id}>
                {book.doc_name} by {book.author}
                <button onClick={() => handleReserve(book.doc_id)}>Reserve</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No books found</p>
        )}
      </div>
      {reservedBook && (
        <div className="reserved-book">
          <h2>Reserved Book:</h2>
          <p>{reservedBook.doc_name} by {reservedBook.author}</p>
        </div>
      )}
    </div>
  );
};

export default ReserveBook;
