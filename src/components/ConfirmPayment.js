import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ConfirmPayment = () => {
  const [query, setQuery] = useState('');
  const [debts, setDebts] = useState([]);
  const [filteredDebts, setFilteredDebts] = useState([]);

  useEffect(() => {
    const fetchDebts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/debt/overdue-books', { withCredentials: true });
        setDebts(res.data);
        setFilteredDebts(res.data);
      } catch (err) {
        console.error('Error fetching debts:', err);
      }
    };

    fetchDebts();
  }, []);

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    const filtered = debts.filter(debt =>
      debt.doc_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      debt.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      debt.member_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDebts(filtered);
  };

  const handleConfirmPayment = async (reservation_id) => {
    try {
      await axios.delete(`http://localhost:5000/api/debt/confirm-payment/${reservation_id}`, { withCredentials: true });
      alert('Payment confirmed successfully');
      setFilteredDebts(filteredDebts.filter(debt => debt.reservation_id !== reservation_id));
    } catch (err) {
      console.error('Error confirming payment:', err);
      alert('Error confirming payment');
    }
  };

  return (
    <div className="confirm-payment">
      <h1>Search for Debt to Confirm Payment</h1>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for debt..."
      />
      <ul>
        {filteredDebts.map(debt => (
          <li key={debt.debt_id}>
            {debt.doc_name} by {debt.author} - Reserved by {debt.member_name} on {new Date(debt.reserved_at).toLocaleDateString()}
            <button onClick={() => handleConfirmPayment(debt.reservation_id)}>Confirm Payment</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConfirmPayment;
