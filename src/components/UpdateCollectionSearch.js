import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateCollectionSearch = () => {
  const [query, setQuery] = useState('');
  const [collections, setCollections] = useState([]);
  const [filteredCollections, setFilteredCollections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/collections', { withCredentials: true });
        setCollections(res.data);
        setFilteredCollections(res.data); // Başlangıçta tüm koleksiyonları göster
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

  const handleSelectCollection = (e) => {
    const id = e.target.value;
    if (id) {
      navigate(`/admin/update-collection/${id}`);
    }
  };

  return (
    <div className="update-collection-search">
      <h1>Search for Collection to Update</h1>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for collection..."
      />
      <select onChange={handleSelectCollection}>
        <option value="">Select Collection</option>
        {filteredCollections.map(col => (
          <option key={col.collection_id} value={col.collection_id}>
            {col.collection_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UpdateCollectionSearch;
