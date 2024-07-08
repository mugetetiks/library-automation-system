import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
        navigate('/login');
        window.location.reload(); // Navbar güncellenmesi için sayfayı yenile
      } catch (err) {
        console.error('Logout error:', err);
      }
    };

    logout();
  }, [navigate]);

  return null;
};

export default Logout;
