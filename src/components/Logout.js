import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserProfile from '../services/userProfile';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
        UserProfile.clearProfile();
        navigate('/login', { replace: true });
      } catch (err) {
        console.error('Logout error:', err);
      }
    };

    performLogout();
  }, [navigate]);

  return null;
};

export default Logout;
