const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM department', (err, results) => {
    if (err) {
      return res.status(500).json({ msg: 'Database error', error: err });
    }
    res.status(200).json(results);
  });
});

module.exports = router;
