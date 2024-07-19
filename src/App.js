import './App.css';
import React, { useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminHomePage from './pages/AdminHomePage';
import Logout from './components/Logout';
import AddDocument from './components/AddDocument';
import UpdateDocument from './components/UpdateDocument';
import UpdateDocumentSearch from './components/UpdateDocumentSearch';
import DeleteDocumentSearch from './components/DeleteDocumentSearch';
import ReserveBook from './components/ReserveBook';
import ConfirmHandOver from './components/ConfirmHandOver';
import UserProfile from './services/userProfile';
import ViewReservedBooks from './components/ViewReservedBooks';
import ViewOverdueBooks from './components/ViewOverdueBooks';
import ConfirmPayment from './components/ConfirmPayment'; 
import Documents from './components/Documents'; // Documents bileşenini import edin
import DocumentDetails from './components/DocumentDetails'; // DocumentDetails bileşenini import edin
import Collections from './components/Collections';
import AddCollection from './components/AddCollection';
import UpdateCollection from './components/UpdateCollection';
import UpdateCollectionSearch from './components/UpdateCollectionSearch';
import DeleteCollectionSearch from './components/DeleteCollectionSearch';
const App = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/auth/verify', { withCredentials: true });
      setRole(res.data.role);
      UserProfile.setProfile(res.data.username, res.data.role);
    } catch (err) {
      setRole(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogout = () => {
    setRole(null);
  };

  const handleLogin = (userRole) => {
    setRole(userRole);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header role={role} />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<><HomePage /><Footer /></>} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={role === 'admin' ? <AdminHomePage /> : <Navigate to="/login" replace />} />
          <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
          <Route path="/admin/add-document" element={role === 'admin' ? <AddDocument /> : <Navigate to="/login" replace />} />
          <Route path="/admin/update-document" element={role === 'admin' ? <UpdateDocumentSearch /> : <Navigate to="/login" replace />} />
          <Route path="/admin/update-document/:id" element={role === 'admin' ? <UpdateDocument /> : <Navigate to="/login" replace />} />
          <Route path="/admin/delete-document" element={role === 'admin' ? <DeleteDocumentSearch /> : <Navigate to="/login" replace />} />
          <Route path="/reserve" element={role === 'member' ? <ReserveBook /> : <Navigate to="/login" replace state={{ from: '/reserve' }} />} />
          <Route path="/admin/confirm-hand-over" element={role === 'admin' ? <ConfirmHandOver /> : <Navigate to="/login" replace />} />
          <Route path="/admin/view-reserved-books" element={role === 'admin' ? <ViewReservedBooks /> : <Navigate to="/login" replace />} />
          <Route path="/admin/view-overdue-books" element={role === 'admin' ? <ViewOverdueBooks /> : <Navigate to="/login" replace />} />
          <Route path="/admin/confirm-payment" element={role === 'admin' ? <ConfirmPayment /> : <Navigate to="/login" replace />} /> 
          <Route path="/documents" element={<Documents />} /> {/* Documents bileşeni için route ekleyin */}
          <Route path="/documents/:id" element={<DocumentDetails />} /> {/* DocumentDetails bileşeni için route ekleyin */}
          <Route path="/collections" element={<Collections />} />
          <Route path="/admin/add-collection" element={role === 'admin' ? <AddCollection /> : <Navigate to="/login" replace />} />
          <Route path="/admin/update-collection" element={role === 'admin' ? <UpdateCollectionSearch /> : <Navigate to="/login" replace />} />
          <Route path="/admin/update-collection/:id" element={role === 'admin' ? <UpdateCollection /> : <Navigate to="/login" replace />} />
          <Route path="/admin/delete-collection" element={role === 'admin' ? <DeleteCollectionSearch /> : <Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
