const jwt = require('jsonwebtoken');
const secretKey = 'my_super_secret_key_12345';

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

exports.isAdmin = (req, res, next) => {
  if (req.role !== 'admin') {
    return res.status(403).json({ msg: 'Access denied' });
  }
  next();
};

exports.isMember = (req, res, next) => {
  if (req.role !== 'member') {
    return res.status(403).json({ msg: 'Access denied' });
  }
  next();
};
