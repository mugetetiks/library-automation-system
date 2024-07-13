import React, { useState } from 'react';
import axios from 'axios';
import UserProfile from '../services/userProfile';

const ReserveBook = () => {
  const [docId, setDocId] = useState('');
  const [message, setMessage] = useState('');

  const handleReserve = async () => {
    try {
      const memberId = UserProfile.getName(); // Member ID'yi alalım
      const res = await axios.post('http://localhost:5000/api/documents/reserve', {
        member_id: memberId,
        doc_id: docId
      }, { withCredentials: true });
      setMessage(res.data.msg);
    } catch (err) {
      setMessage(err.response.data.msg);
    }
  };

  return (
    <div>
      <h2>Reserve Book</h2>
      <input 
        type="text" 
        value={docId} 
        onChange={(e) => setDocId(e.target.value)} 
        placeholder="Document ID" 
      />
      <button onClick={handleReserve}>Reserve</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ReserveBook;
