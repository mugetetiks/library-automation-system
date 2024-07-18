import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DocumentDetails = () => {
  const { id } = useParams();
  const [document, setDocument] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/documents/${id}`, { withCredentials: true });
        setDocument(res.data);
      } catch (err) {
        console.error('Error fetching document:', err);
      }
    };

    fetchDocument();
  }, [id]);

  if (!document) return <div>Loading...</div>;

  return (
    <div className="container mt-4 document-details">
      <h1>{document.doc_name}</h1>
      <img src={`http://localhost:5000/${document.doc_path}`} alt={document.doc_name} />
      <p>Author: {document.author}</p>
      <p>Category ID: {document.cat_id}</p>
      <p>Department ID: {document.dep_id}</p>
    </div>
  );
};

export default DocumentDetails;
