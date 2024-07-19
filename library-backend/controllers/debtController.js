const db = require('../config/db');

exports.markAsDebt = (req, res) => {
  const { reservation_id } = req.body;

  // Önce, bu reservation_id için reserved_books tablosundan doc_id ve member_id bilgilerini alalım
  const query = `
    SELECT doc_id, member_id 
    FROM reserved_books 
    WHERE reservation_id = ?
  `;

  db.query(query, [reservation_id], (err, results) => {
    if (err) {
      return res.status(500).json({ msg: 'Database error', error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ msg: 'Reservation not found' });
    }

    const { doc_id, member_id } = results[0];

    // debt tablosuna eklemeden önce kontrol edelim
    const checkQuery = `
      SELECT * FROM debt WHERE reservation_id = ?
    `;

    db.query(checkQuery, [reservation_id], (err, results) => {
      if (err) {
        return res.status(500).json({ msg: 'Database error', error: err });
      }

      if (results.length > 0) {
        return res.status(400).json({ msg: 'This book is already marked as debt' });
      }

      // Eğer kayıt yoksa, debt tablosuna ekleyelim
      const insertQuery = `
        INSERT INTO debt (doc_id, member_id, reservation_id) 
        VALUES (?, ?, ?)
      `;

      db.query(insertQuery, [doc_id, member_id, reservation_id], (err, result) => {
        if (err) {
          return res.status(500).json({ msg: 'Database error', error: err });
        }
        res.status(201).json({ msg: 'Book marked as debt successfully' });
      });
    });
  });
};


exports.getOverdueBooks = (req, res) => {
    const query = `
      SELECT d.debt_id, d.reservation_id, d.doc_id, d.member_id, rb.reserved_at, doc.doc_name, m.userName as member_name
      FROM debt d
      JOIN reserved_books rb ON d.reservation_id = rb.reservation_id
      JOIN document doc ON d.doc_id = doc.doc_id
      JOIN member m ON d.member_id = m.memberID
    `;
  
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ msg: 'Database error', error: err });
      }
      res.status(200).json(results);
    });
  };
  
  exports.confirmPayment = (req, res) => {
    const { reservation_id } = req.params;
  
    const deleteDebtQuery = `
      DELETE FROM debt WHERE reservation_id = ?
    `;
  
    db.query(deleteDebtQuery, [reservation_id], (err, result) => {
      if (err) {
        return res.status(500).json({ msg: 'Database error', error: err });
      }
  
      const deleteReservedBookQuery = `
        DELETE FROM reserved_books WHERE reservation_id = ?
      `;
  
      db.query(deleteReservedBookQuery, [reservation_id], (err, result) => {
        if (err) {
          return res.status(500).json({ msg: 'Database error', error: err });
        }
        res.status(200).json({ msg: 'Payment confirmed and book record deleted successfully' });
      });
    });
  };
  
