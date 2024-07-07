import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('member');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/signup', { username, firstName, lastName, password, role });
      alert(res.data.msg);
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('Signup error:', err);
      const errorMsg = err.response && err.response.data && err.response.data.msg ? err.response.data.msg : 'Error occurred during signup';
      alert(errorMsg);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
      <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" required />
      <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <label>
        <input type="radio" value="member" checked={role === 'member'} onChange={() => setRole('member')} /> Member
      </label>
      <label>
        <input type="radio" value="admin" checked={role === 'admin'} onChange={() => setRole('admin')} /> Admin
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
