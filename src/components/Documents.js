import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const Documents = () => {
  const [documents, setDocuments] = useState([]);

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

  return (
    <div className="container mt-4">
      <h1>Documents</h1>
      <div className="documents">
        {documents.map(doc => (
          <div className="document-card" key={doc.doc_id}>
            <img src={`http://localhost:5000/${doc.doc_path}`} alt={doc.doc_name} />
            <h3>{doc.doc_name}</h3>
            <p>{doc.author}</p>
            <Link to={`/documents/${doc.doc_id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Documents;
