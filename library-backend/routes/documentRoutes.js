const express = require('express');
const router = express.Router();
const { getDocuments, addDocument, deleteDocument, searchDocuments } = require('../controllers/documentController');
const { reserveBook } = require('../controllers/reserveController');
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

// Get All Documents Endpoint
router.get('/', getDocuments);

// Search Documents Endpoint
router.get('/search', searchDocuments);

// Reserve Book Endpoint
router.post('/reserve', reserveBook);

module.exports = router;
