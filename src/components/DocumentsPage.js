import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DocumentsPage = () => {
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
    <div className="documents-page">
      <h1>Documents</h1>
      <ul>
        {documents.map(doc => (
          <li key={doc.doc_id}>
            <Link to={`/document/${doc.doc_id}`}>{doc.doc_name} by {doc.author}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentsPage;
