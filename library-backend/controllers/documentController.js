const db = require('../config/db');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

exports.getDocuments = (req, res) => {
  db.query('SELECT * FROM document', (err, results) => {
    if (err) return res.status(500).json({ msg: 'Database error', error: err });
    res.status(200).json(results);
  });
};

exports.addDocument = [upload.single('document'), (req, res) => {
  const { doc_name, author, cat_id, dep_id } = req.body;
  const doc_path = req.file.path;

  if (!doc_name || !author || !cat_id || !dep_id) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  db.query(
    `INSERT INTO document (doc_name, author, cat_id, dep_id, doc_path) VALUES (?, ?, ?, ?, ?)`,
    [doc_name, author, cat_id, dep_id, doc_path],
    (err, result) => {
      if (err) return res.status(500).json({ msg: 'Database error', error: err });
      res.status(201).json({ msg: 'Document added successfully' });
    }
  );
}];

exports.deleteDocument = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM document WHERE doc_id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ msg: 'Database error', error: err });
    res.status(200).json({ msg: 'Document deleted successfully' });
  });
};

exports.searchDocuments = (req, res) => {
  const { query } = req.query;

  console.log('Search query:', query); // Hata ayıklama için eklendi

  const sqlQuery = 'SELECT * FROM document WHERE doc_name LIKE ? OR author LIKE ?';
  const values = [`%${query}%`, `%${query}%`];

  console.log('SQL Query:', sqlQuery); // Hata ayıklama için eklendi
  console.log('Values:', values); // Hata ayıklama için eklendi

  db.query(sqlQuery, values, (err, results) => {
    if (err) {
      console.error('Database error:', err); // Hata ayıklama için eklendi
      return res.status(500).json({ msg: 'Database error', error: err });
    }
    console.log('Search results:', results); // Hata ayıklama için eklendi
    res.status(200).json(results);
  });
};
