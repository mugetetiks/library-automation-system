const db = require('../config/db');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

exports.getDocuments = (req, res) => {
  db.query('SELECT * FROM document', (err, results) => {
    if (err) return res.status(500).json({ msg: 'Database error', error: err });
    res.status(200).json(results);
  });
};

exports.addDocument = [upload.single('document'), (req, res) => {
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
}];

exports.deleteDocument = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM document WHERE doc_id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ msg: 'Database error', error: err });
    res.status(200).json({ msg: 'Document deleted successfully' });
  });
};

exports.reserveBook = (req, res) => {
  const { member_id, doc_id } = req.body;

  db.query('SELECT * FROM reserved_books WHERE doc_id = ?', [doc_id], (err, results) => {
    if (err) return res.status(500).json({ msg: 'Database error', error: err });
    if (results.length > 0) return res.status(400).json({ msg: 'Book already reserved' });

    db.query('INSERT INTO reserved_books (member_id, doc_id) VALUES (?, ?)', [member_id, doc_id], (err, result) => {
      if (err) return res.status(500).json({ msg: 'Database error', error: err });
      res.status(201).json({ msg: 'Book reserved successfully' });
    });
  });
};
