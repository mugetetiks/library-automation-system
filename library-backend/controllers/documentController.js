const db = require('../config/db');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

exports.getDocuments = (req, res) => {
  db.query('SELECT * FROM document', (err, results) => {
    if (err) return res.status(500).json({ msg: 'Database error', error: err });
    res.status(200).json(results);
  });
};

exports.getDocumentById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM document WHERE doc_id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ msg: 'Database error', error: err });
    if (results.length === 0) return res.status(404).json({ msg: 'Document not found' });
    res.status(200).json(results[0]);
  });
};

exports.addDocument = (req, res) => {
  const { doc_name, author, cat_id, dep_id } = req.body;
  const doc_path = req.file.path;

  if (!doc_name || !author || !cat_id || !dep_id) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  db.query(
    `INSERT INTO document (doc_name, author, cat_id, dep_id, doc_path) VALUES (?, ?, ?, ?, ?)`,
    [doc_name, author, cat_id, dep_id, doc_path],
    (err, result) => {
      if (err) return res.status(500).json({ msg: 'Database error', error: err });
      res.status(201).json({ msg: 'Document added successfully' });
    }
  );
};

exports.updateDocument = (req, res) => {
  const { id } = req.params;
  const { doc_name, author, cat_id, dep_id } = req.body;
  const doc_path = req.file ? req.file.path : null;

  db.query('SELECT * FROM document WHERE doc_id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ msg: 'Database error', error: err });
    if (results.length === 0) return res.status(404).json({ msg: 'Document not found' });

    const query = doc_path
      ? `UPDATE document SET doc_name = ?, author = ?, cat_id = ?, dep_id = ?, doc_path = ? WHERE doc_id = ?`
      : `UPDATE document SET doc_name = ?, author = ?, cat_id = ?, dep_id = ? WHERE doc_id = ?`;

    const values = doc_path
      ? [doc_name, author, cat_id, dep_id, doc_path, id]
      : [doc_name, author, cat_id, dep_id, id];

    db.query(query, values, (err, result) => {
      if (err) return res.status(500).json({ msg: 'Database error', error: err });
      res.status(200).json({ msg: 'Document updated successfully' });
    });
  });
};

exports.deleteDocument = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM document WHERE doc_id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting document:', err);
      return res.status(500).json({ msg: 'Database error', error: err });
    }
    res.status(200).json({ msg: 'Document deleted successfully' });
  });
};

exports.reserveDocument = (req, res) => {
  const { bookId } = req.body;
  const username = req.username; // Get the username from the middleware

  // Get the member_id based on the username
  db.query('SELECT memberID FROM member WHERE userName = ?', [username], (err, results) => {
    if (err) return res.status(500).json({ msg: 'Database error', error: err });
    if (results.length === 0) return res.status(404).json({ msg: 'User not found' });

    const memberId = results[0].memberID;

    // Check if the book is already reserved
    db.query('SELECT * FROM reserved_books WHERE doc_id = ? AND status = "reserved"', [bookId], (err, results) => {
      if (err) return res.status(500).json({ msg: 'Database error', error: err });
      if (results.length > 0) return res.status(400).json({ msg: 'Book is already reserved' });

      // Reserve the book
      db.query('INSERT INTO reserved_books (member_id, doc_id, status) VALUES (?, ?, "reserved")', [memberId, bookId], (err, result) => {
        if (err) return res.status(500).json({ msg: 'Database error', error: err });

        // Get the reserved book details
        db.query('SELECT d.doc_name, d.author FROM document d WHERE d.doc_id = ?', [bookId], (err, bookDetails) => {
          if (err) return res.status(500).json({ msg: 'Database error', error: err });
          const reservedBook = { doc_id: bookId, member_id: memberId, status: "reserved", ...bookDetails[0] };
          res.status(201).json({ msg: 'Book reserved successfully', reservedBook });
        });
      });
    });
  });
};

exports.getReservedBooks = (req, res) => {
  db.query(`
    SELECT rb.reservation_id, d.doc_name, d.author 
    FROM reserved_books rb 
    JOIN document d ON rb.doc_id = d.doc_id
  `, (err, results) => {
    if (err) return res.status(500).json({ msg: 'Database error', error: err });
    res.status(200).json(results);
  });
};

exports.confirmHandOver = (req, res) => {
  const { id } = req.params; // reserved_book id

  db.query('DELETE FROM reserved_books WHERE reservation_id = ?', [id], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ msg: 'Database error', error: err });
    }
    res.status(200).json({ msg: 'Book hand-over confirmed successfully' });
  });
};

exports.viewReservedBooks = (req, res) => {
  const query = `
    SELECT rb.reservation_id, rb.reserved_at, m.userName as reserved_by, d.doc_name, d.author
    FROM reserved_books rb
    JOIN member m ON rb.member_id = m.memberID
    JOIN document d ON rb.doc_id = d.doc_id
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ msg: 'Database error', error: err });
    }
    res.status(200).json(results);
  });
};
