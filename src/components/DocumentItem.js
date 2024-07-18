import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DocumentItem = () => {
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const [reserved, setReserved] = useState(false);

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

  const handleReserve = async () => {

    try {
      await axios.post('http://localhost:5000/api/documents/reserve', { bookId: id }, { withCredentials: true });
      setReserved(true);
      alert('Book reserved successfully');
    } catch (err) {
      console.error('Error reserving book:', err);
      alert('Error reserving book');
    }
  };

  if (!document) return <div>Loading...</div>;

  return (
    <div className="document-item">
      <h1>{document.doc_name}</h1>
      <p>Author: {document.author}</p>
      <p>Category ID: {document.cat_id}</p>
      <p>Department ID: {document.dep_id}</p>
      <button onClick={handleReserve} disabled={reserved}>
        {reserved ? 'Reserved' : 'Reserve'}
      </button>
    </div>
  );
};

export default DocumentItem;
