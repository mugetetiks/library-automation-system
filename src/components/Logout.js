import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserProfile from '../services/userProfile';

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        console.log('Attempting to logout');
        await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
        console.log('Logout successful');
        UserProfile.clearProfile();
        console.log('UserProfile cleared');
        onLogout();
        navigate('/home', { replace: true });
      } catch (err) {
        console.error('Logout error:', err);
      }
    };

    performLogout();
  }, [navigate, onLogout]);

  return <div>Logging out...</div>;
};

export default Logout;
