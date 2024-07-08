const express = require('express');
const { getDocuments, addDocument } = require('../controllers/documentController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', verifyToken, getDocuments);
router.post('/', verifyToken, isAdmin, addDocument);

module.exports = router;
