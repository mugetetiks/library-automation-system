import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminHomePage from './pages/AdminHomePage';
import MemberHomePage from './pages/MemberHomePage';
import Logout from './components/Logout';
import AddDocument from './components/AddDocument';

const App = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/verify', { withCredentials: true });
        setRole(res.data.role);
      } catch (err) {
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header role={role} />
        <Routes>
          <Route path="/" element={role ? (role === 'admin' ? <Navigate to="/admin" /> : <Navigate to="/member" />) : <><HomePage /><Footer /></>} />
          <Route path="/login" element={role ? (role === 'admin' ? <Navigate to="/admin" /> : <Navigate to="/member" />) : <><Login /><Footer /></>} />
          <Route path="/signup" element={<><Signup /><Footer /></>} />
          <Route path="/admin" element={role === 'admin' ? <AdminHomePage /> : <Navigate to="/login" />} />
          <Route path="/member" element={role === 'member' ? <MemberHomePage /> : <Navigate to="/login" />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/admin/add-document" element={role === 'admin' ? <AddDocument /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
