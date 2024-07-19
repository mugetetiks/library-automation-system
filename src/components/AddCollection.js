import React, { useState } from 'react';
import axios from 'axios';

const AddCollection = () => {
  const [collectionName, setCollectionName] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('collection', file);
    formData.append('collection_name', collectionName);

    try {
      await axios.post('http://localhost:5000/api/collections', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      alert('Collection added successfully');
    } catch (err) {
      console.error('Error adding collection:', err);
      alert('Error adding collection');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={collectionName} onChange={(e) => setCollectionName(e.target.value)} placeholder="Collection Name" required />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
      <button type="submit">Add Collection</button>
    </form>
  );
};

export default AddCollection;
