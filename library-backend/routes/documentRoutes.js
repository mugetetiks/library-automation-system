const express = require('express');
const router = express.Router();
const db = require('../config/db');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

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

module.exports = router;
