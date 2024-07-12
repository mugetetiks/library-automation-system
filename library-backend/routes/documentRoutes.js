const express = require('express');
const router = express.Router();
const db = require('../config/db');
const multer = require('multer');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Add Document Endpoint
router.post('/', upload.single('document'), (req, res) => {
  const { doc_name, author, cat_id, dep_id } = req.body;
  const doc_path = req.file.path;

  if (!doc_name || !author || !cat_id || !dep_id) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  db.query(
    `INSERT INTO document (doc_name, author, cat_id, dep_id, doc_path) VALUES (?, ?, ?, ?, ?)`,
    [doc_name, author, cat_id, dep_id, doc_path],
    (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ msg: 'Database error', error: err });
      }
      res.status(201).json({ msg: 'Document added successfully' });
    }
  );
});

// Update Document Endpoint
router.put('/:id', upload.single('document'), (req, res) => {
  const { id } = req.params;
  const { doc_name, author, cat_id, dep_id } = req.body;
  const doc_path = req.file ? req.file.path : undefined;

  if (!doc_name || !author || !cat_id || !dep_id) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  let query = `UPDATE document SET doc_name = ?, author = ?, cat_id = ?, dep_id = ?`;
  let values = [doc_name, author, cat_id, dep_id];

  if (doc_path) {
    query += `, doc_path = ?`;
    values.push(doc_path);
  }

  query += ` WHERE doc_id = ?`;
  values.push(id);

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ msg: 'Database error', error: err });
    }
    res.status(200).json({ msg: 'Document updated successfully' });
  });
});

// Get Document by ID Endpoint
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM document WHERE doc_id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ msg: 'Database error', error: err });
    }
    res.status(200).json(results[0]);
  });
});

// Search Documents Endpoint
router.get('/search', (req, res) => {
  const { query } = req.query;
  console.log(`Search query: ${query}`); // Loglama için eklendi
  db.query('SELECT * FROM document WHERE doc_name LIKE ? OR author LIKE ?', [`%${query}%`, `%${query}%`], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ msg: 'Database error', error: err });
    }
    console.log('Search results:', results); // Loglama için eklendi
    res.status(200).json(results);
  });
});

// Get All Documents Endpoint
router.get('/', (req, res) => {
  db.query('SELECT * FROM document', (err, results) => {
    if (err) {
      return res.status(500).json({ msg: 'Database error', error: err });
    }
    res.status(200).json(results);
  });
});

module.exports = router;
