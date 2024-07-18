const express = require('express');
const router = express.Router();
const { addDocument, deleteDocument, reserveDocument, getDocuments, getDocumentById, updateDocument, confirmHandOver, getReservedBooks } = require('../controllers/documentController');
const { verifyToken } = require('../middleware/authMiddleware');
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

router.post('/', upload.single('document'), addDocument);
router.delete('/:id', deleteDocument);
router.post('/reserve', verifyToken, reserveDocument);
router.get('/reserved', verifyToken, getReservedBooks); // Bu rotanın doğru olduğundan emin olun
router.get('/:id', getDocumentById);
router.put('/:id', upload.single('document'), updateDocument);
router.delete('/confirm-hand-over/:id', verifyToken, confirmHandOver);
router.get('/search', (req, res) => {
  const { query } = req.query;
  db.query('SELECT * FROM document WHERE doc_name LIKE ? OR author LIKE ?', [`%${query}%`, `%${query}%`], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ msg: 'Database error', error: err });
    }
    res.status(200).json(results);
  });
});
router.get('/', getDocuments);

module.exports = router;
