const db = require('../config/db');

exports.reserveBook = (req, res) => {
  const { bookId } = req.body;
  const username = req.cookies.username; // Assume you store username in cookie during login

  db.query('SELECT * FROM reserved_books WHERE book_id = ?', [bookId], (err, results) => {
    if (err) return res.status(500).json({ msg: 'Database error', error: err });

    if (results.length > 0) {
      return res.status(400).json({ msg: 'Book is already reserved' });
    }

    db.query('INSERT INTO reserved_books (book_id, username) VALUES (?, ?)', [bookId, username], (err, result) => {
      if (err) return res.status(500).json({ msg: 'Database error', error: err });

      db.query('SELECT * FROM document WHERE doc_id = ?', [bookId], (err, book) => {
        if (err) return res.status(500).json({ msg: 'Database error', error: err });

        res.status(200).json(book[0]);
      });
    });
  });
};
