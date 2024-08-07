import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeleteDocumentSearch = () => {
  const [query, setQuery] = useState('');
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/documents', { withCredentials: true });
        setDocuments(res.data);
        setFilteredDocuments(res.data);
      } catch (err) {
        console.error('Error fetching documents:', err);
      }
    };

    fetchDocuments();
  }, []);

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    const filtered = documents.filter(doc =>
      doc.doc_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDocuments(filtered);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/documents/${id}`, { withCredentials: true });
      alert('Document deleted successfully');
      setFilteredDocuments(filteredDocuments.filter(doc => doc.doc_id !== id));
    } catch (err) {
      console.error('Error deleting document:', err);
      alert('Error deleting document');
    }
  };

  return (
    <div className="delete-document-search">
      <h1>Search for Document to Delete</h1>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for document..."
      />
      <ul>
        {filteredDocuments.map(doc => (
          <li key={doc.doc_id}>
            {doc.doc_name} - {doc.author}
            <button onClick={() => handleDelete(doc.doc_id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteDocumentSearch;
