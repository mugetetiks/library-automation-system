import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const Collections = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/collections', { withCredentials: true });
        setCollections(res.data);
      } catch (err) {
        console.error('Error fetching collections:', err);
      }
    };

    fetchCollections();
  }, []);

  return (
    <div className="container mt-4">
      <h1>Collections</h1>
      <div className="collections">
        {collections.map(col => (
          <div className="collection-card" key={col.collection_id}>
            <img src={`http://localhost:5000/${col.collection_path}`} alt={col.collection_name} />
            <h3>{col.collection_name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collections;
