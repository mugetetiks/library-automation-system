import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeleteCollectionSearch = () => {
  const [query, setQuery] = useState('');
  const [collections, setCollections] = useState([]);
  const [filteredCollections, setFilteredCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/collections', { withCredentials: true });
        setCollections(res.data);
        setFilteredCollections(res.data);
      } catch (err) {
        console.error('Error fetching collections:', err);
      }
    };

    fetchCollections();
  }, []);

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    const filtered = collections.filter(col =>
      col.collection_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCollections(filtered);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/collections/${id}`, { withCredentials: true });
      alert('Collection deleted successfully');
      setFilteredCollections(filteredCollections.filter(col => col.collection_id !== id));
    } catch (err) {
      console.error('Error deleting collection:', err);
      alert('Error deleting collection');
    }
  };

  return (
    <div className="delete-collection-search">
      <h1>Search for Collection to Delete</h1>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for collection..."
      />
      <ul>
        {filteredCollections.map(col => (
          <li key={col.collection_id}>
            {col.collection_name}
            <button onClick={() => handleDelete(col.collection_id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteCollectionSearch;
