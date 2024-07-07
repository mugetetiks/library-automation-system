import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfile from '../services/userProfile';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    UserProfile.clearProfile();
    navigate('/login');
  }, [navigate]);

  return null;
};

export default Logout;
