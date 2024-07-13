import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import UserProfile from '../services/userProfile';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('member');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password, role }, { withCredentials: true });
      alert(res.data.msg);
      UserProfile.setProfile(username, role);
      onLogin(role);
      const from = location.state?.from?.pathname || '/reserve';
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      const errorMsg = err.response && err.response.data && err.response.data.msg ? err.response.data.msg : 'Error occurred during login';
      alert(errorMsg);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <label>
        <input type="radio" value="member" checked={role === 'member'} onChange={() => setRole('member')} /> Member
      </label>
      <label>
        <input type="radio" value="admin" checked={role === 'admin'} onChange={() => setRole('admin')} /> Admin
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
