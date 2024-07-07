const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 5000;

// CORS middleware
app.use(cors({
  origin: 'http://localhost:3000', // React uygulamanızın çalıştığı port
  credentials: true
}));

app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'library-automation'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});

const secretKey = 'your_secret_key';

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  const { username, firstName, lastName, password, role } = req.body;

  if (!username || !firstName || !lastName || !password || !role) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const table = role === 'admin' ? 'admin' : 'member';

    db.query(
      `INSERT INTO ${table} (userName, firstName, lastName, password) VALUES (?, ?, ?, ?)`,
      [username, firstName, lastName, hashedPassword],
      (err, result) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ msg: 'Database error', error: err });
        }
        res.status(201).json({ msg: 'User created' });
      }
    );
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ msg: 'Internal server error', error: error.message });
  }
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  const table = role === 'admin' ? 'admin' : 'member';

  db.query(
    `SELECT * FROM ${table} WHERE userName = ?`,
    [username],
    async (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ msg: 'Database error', error: err });
      }
      if (results.length === 0) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const token = jwt.sign({ username: user.userName, role }, secretKey, { expiresIn: '1h' });

      res.status(200).json({ msg: 'Logged in successfully', token, role });
    }
  );
});

// Token verification middleware
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ msg: 'No token provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(500).json({ msg: 'Failed to authenticate token' });
    }

    req.username = decoded.username;
    req.role = decoded.role;
    next();
  });
};

// Set up storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Get categories endpoint
app.get('/api/categories', verifyToken, (req, res) => {
  db.query('SELECT * FROM category', (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ msg: 'Database error', error: err });
    }
    res.status(200).json(results);
  });
});

// Get departments endpoint
app.get('/api/departments', verifyToken, (req, res) => {
  db.query('SELECT * FROM department', (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ msg: 'Database error', error: err });
    }
    res.status(200).json(results);
  });
});

// Add document endpoint
app.post('/api/documents', verifyToken, upload.single('document'), (req, res) => {
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

// Logout endpoint
app.post('/api/logout', verifyToken, (req, res) => {
  res.status(200).json({ msg: 'Logged out successfully' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
