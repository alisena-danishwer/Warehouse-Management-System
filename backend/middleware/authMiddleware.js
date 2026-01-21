const jwt = require('jsonwebtoken');
const SECRET_KEY = 'super_secret_key_123';

const verifyToken = (req, res, next) => {
  // 1. Get the token from the request header
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ error: 'A token is required for authentication' });
  }

  try {
    // 2. Check if the token is valid
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Save user info for later use
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid Token' });
  }
};

const verifyRole = (allowedRoles) => {
  return (req, res, next) => {
    // 3. Check if the user has the right role (Admin/Manager)
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access Denied: Insufficient Permissions' });
    }
    next();
  };
};

// EXPORT THESE SO OTHER FILES CAN USE THEM
module.exports = { verifyToken, verifyRole };