import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateDocumentSearch = () => {
  const [query, setQuery] = useState('');
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/documents', { withCredentials: true });
        setDocuments(res.data);
        setFilteredDocuments(res.data); // Başlangıçta tüm documentleri göster
      } catch (err) {
        console.error('Error fetching documents:', err);
      }
    };

    fetchDocuments();
  }, []); // Burada bağımlılık dizisi boş olmalı, sadece bir kez çalışacak

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    const filtered = documents.filter(doc =>
      doc.doc_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDocuments(filtered);
  };

  const handleSelectDocument = (e) => {
    const id = e.target.value;
    if (id) {
      navigate(`/admin/update-document/${id}`);
    }
  };

  return (
    <div className="update-document-search">
      <h1>Search for Document to Update</h1>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for document..."
      />
      <select onChange={handleSelectDocument}>
        <option value="">Select Document</option>
        {filteredDocuments.map(doc => (
          <option key={doc.doc_id} value={doc.doc_id}>
            {doc.doc_name} - {doc.author}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UpdateDocumentSearch;
