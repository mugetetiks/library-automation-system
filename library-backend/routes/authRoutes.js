const express = require('express');
const { signup, login, logout, verifyToken } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.get('/verify', verifyToken, (req, res) => {
  res.status(200).json({ username: req.username, role: req.role });
});

module.exports = router;
