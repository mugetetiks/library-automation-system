const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const documentRoutes = require('./routes/documentRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const db = require('./config/db');

const app = express();
const port = 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});

app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes); // Bu satırın doğru olduğundan emin olun
app.use('/api/categories', categoryRoutes);
app.use('/api/departments', departmentRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
