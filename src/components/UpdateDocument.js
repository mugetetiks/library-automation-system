import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateDocument = () => {
  const { id } = useParams();
  const [docName, setDocName] = useState('');
  const [author, setAuthor] = useState('');
  const [categories, setCategories] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [catId, setCatId] = useState('');
  const [depId, setDepId] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/categories', { withCredentials: true });
        setCategories(res.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    const fetchDepartments = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/departments', { withCredentials: true });
        setDepartments(res.data);
      } catch (err) {
        console.error('Error fetching departments:', err);
      }
    };

    const fetchDocument = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/documents/${id}`, { withCredentials: true });
        const document = res.data;
        setDocName(document.doc_name);
        setAuthor(document.author);
        setCatId(document.cat_id);
        setDepId(document.dep_id);
      } catch (err) {
        console.error('Error fetching document:', err);
      }
    };

    fetchCategories();
    fetchDepartments();
    fetchDocument();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('doc_name', docName);
    formData.append('author', author);
    formData.append('cat_id', catId);
    formData.append('dep_id', depId);

    if (file) {
      formData.append('document', file);
    }

    try {
      await axios.put(`http://localhost:5000/api/documents/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      alert('Document updated successfully');
    } catch (err) {
      console.error('Error updating document:', err);
      alert('Error updating document');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={docName} onChange={(e) => setDocName(e.target.value)} placeholder="Document Name" required />
      <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" required />
      <select value={catId} onChange={(e) => setCatId(e.target.value)} required>
        <option value="" disabled>Select Category</option>
        {categories.map(category => (
          <option key={category.cat_id} value={category.cat_id}>{category.cat_name}</option>
        ))}
      </select>
      <select value={depId} onChange={(e) => setDepId(e.target.value)} required>
        <option value="" disabled>Select Department</option>
        {departments.map(department => (
          <option key={department.dep_id} value={department.dep_id}>{department.dep_name}</option>
        ))}
      </select>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Update Document</button>
    </form>
  );
};

export default UpdateDocument;
