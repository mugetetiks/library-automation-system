import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserProfile from '../services/userProfile';

const AddDocument = () => {
  const [docName, setDocName] = useState('');
  const [author, setAuthor] = useState('');
  const [categories, setCategories] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [catId, setCatId] = useState('');
  const [depId, setDepId] = useState('');
  const [documentFile, setDocumentFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/categories', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setCategories(res.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    const fetchDepartments = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/departments', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setDepartments(res.data);
      } catch (err) {
        console.error('Error fetching departments:', err);
      }
    };

    fetchCategories();
    fetchDepartments();
  }, []);

  const handleFileChange = (e) => {
    setDocumentFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('doc_name', docName);
    formData.append('author', author);
    formData.append('cat_id', catId);
    formData.append('dep_id', depId);
    formData.append('document', documentFile);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/documents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      alert(res.data.msg);
      navigate('/admin');
    } catch (err) {
      console.error('Error adding document:', err);
      alert('Error adding document');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={docName} onChange={(e) => setDocName(e.target.value)} placeholder="Document Name" required />
      <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" required />
      <select value={catId} onChange={(e) => setCatId(e.target.value)} required>
        <option value="">Select Category</option>
        {categories.map(category => (
          <option key={category.cat_id} value={category.cat_id}>{category.cat_name}</option>
        ))}
      </select>
      <select value={depId} onChange={(e) => setDepId(e.target.value)} required>
        <option value="">Select Department</option>
        {departments.map(department => (
          <option key={department.dep_id} value={department.dep_id}>{department.dep_name}</option>
        ))}
      </select>
      <input type="file" onChange={handleFileChange} required />
      <button type="submit">Add Document</button>
    </form>
  );
};

export default AddDocument;
