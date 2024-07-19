const express = require('express');
const router = express.Router();
const { addCollection, deleteCollection, getCollections, getCollectionById, updateCollection } = require('../controllers/collectionController');
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

router.get('/', getCollections);
router.get('/:id', getCollectionById);
router.post('/', verifyToken, upload.single('collection'), addCollection);
router.put('/:id', verifyToken, upload.single('collection'), updateCollection);
router.delete('/:id', verifyToken, deleteCollection);




module.exports = router;
