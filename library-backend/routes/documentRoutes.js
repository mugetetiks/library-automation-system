const express = require('express');
const router = express.Router();
const { getDocuments, addDocument, deleteDocument, reserveBook } = require('../controllers/documentController');
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
router.post('/', upload.single('document'), addDocument);

// Delete Document Endpoint
router.delete('/:id', deleteDocument);

// Reserve Book Endpoint
router.post('/reserve', reserveBook);

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
router.get('/', getDocuments);

module.exports = router;
