import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateCollection = () => {
  const { id } = useParams();
  const [collectionName, setCollectionName] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/collections/${id}`, { withCredentials: true });
        const collection = res.data;
        setCollectionName(collection.collection_name);
      } catch (err) {
        console.error('Error fetching collection:', err);
      }
    };

    fetchCollection();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('collection_name', collectionName);

    if (file) {
      formData.append('collection', file);
    }

    try {
      await axios.put(`http://localhost:5000/api/collections/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      alert('Collection updated successfully');
    } catch (err) {
      console.error('Error updating collection:', err);
      alert('Error updating collection');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={collectionName}
        onChange={(e) => setCollectionName(e.target.value)}
        placeholder="Collection Name"
        required
      />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Update Collection</button>
    </form>
  );
};

export default UpdateCollection;
