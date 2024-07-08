const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretKey = 'my_super_secret_key_12345';

exports.signup = (req, res) => {
  const { username, firstName, lastName, password, role } = req.body;

  bcrypt.hash(password, 8, (err, hash) => {
    if (err) return res.status(500).json({ msg: 'Error hashing password', error: err });

    let table = role === 'admin' ? 'admin' : 'member';
    db.query(`INSERT INTO ${table} (username, firstName, lastName, password) VALUES (?, ?, ?, ?)`, [username, firstName, lastName, hash], (err, results) => {
      if (err) return res.status(500).json({ msg: 'Database error', error: err });
      res.status(201).json({ msg: 'Signup successful' });
    });
  });
};

exports.login = (req, res) => {
  const { username, password, role } = req.body;

  let table = role === 'admin' ? 'admin' : 'member';
  db.query(`SELECT * FROM ${table} WHERE username = ?`, [username], async (err, results) => {
    if (err) return res.status(500).json({ msg: 'Database error', error: err });
    if (results.length === 0) return res.status(401).json({ msg: 'User not found' });

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ msg: 'Incorrect password' });

    const token = jwt.sign({ username, role }, secretKey, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'Lax' }); // secure: true production'da kullanılmalı
    res.status(200).json({ msg: 'Login successful', role });
  });
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ msg: 'Logout successful' });
};

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token;
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
