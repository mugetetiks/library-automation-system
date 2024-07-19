const db = require('../config/db');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

exports.getCollections = (req, res) => {
  db.query('SELECT * FROM collections', (err, results) => {
    if (err) return res.status(500).json({ msg: 'Database error', error: err });
    res.status(200).json(results);
  });
};

exports.getCollectionById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM collections WHERE collection_id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ msg: 'Database error', error: err });
    if (results.length === 0) return res.status(404).json({ msg: 'Collection not found' });
    res.status(200).json(results[0]);
  });
};

exports.addCollection = (req, res) => {
  const { collection_name } = req.body;
  const collection_path = req.file.path;

  if (!collection_name) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  db.query(
    `INSERT INTO collections (collection_name, photo_path) VALUES (?, ?)`,
    [collection_name, collection_path],
    (err, result) => {
      if (err) return res.status(500).json({ msg: 'Database error', error: err });
      res.status(201).json({ msg: 'Collection added successfully' });
    }
  );
};

exports.updateCollection = (req, res) => {
  const { id } = req.params;
  const { collection_name } = req.body;
  const collection_path = req.file ? req.file.path : null;

  db.query('SELECT * FROM collections WHERE collection_id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ msg: 'Database error', error: err });
    if (results.length === 0) return res.status(404).json({ msg: 'Collection not found' });

    const query = collection_path
      ? `UPDATE collections SET collection_name = ?, photo_path = ? WHERE collection_id = ?`
      : `UPDATE collections SET collection_name = ? WHERE collection_id = ?`;

    const values = collection_path
      ? [collection_name, collection_path, id]
      : [collection_name, id];

    db.query(query, values, (err, result) => {
      if (err) return res.status(500).json({ msg: 'Database error', error: err });
      res.status(200).json({ msg: 'Collection updated successfully' });
    });
  });
};

exports.deleteCollection = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM collections WHERE collection_id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting collection:', err);
      return res.status(500).json({ msg: 'Database error', error: err });
    }
    res.status(200).json({ msg: 'Collection deleted successfully' });
  });
};
