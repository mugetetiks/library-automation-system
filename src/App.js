import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/homePage';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminHomePage from './pages/AdminHomePage';
import Logout from './components/Logout';
import AddDocument from './components/AddDocument';

const App = () => {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Routes>
          <Route path="/" element={<><Header /><HomePage /><Footer /></>} />
          <Route path="/login" element={<><Header /><Login /><Footer /></>} />
          <Route path="/signup" element={<><Header /><Signup /><Footer /></>} />
          <Route path="/admin" element={<AdminHomePage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/admin/add-document" element={<AddDocument />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
