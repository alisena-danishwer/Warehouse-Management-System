const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');
const { verifyToken, verifyRole } = require('../middleware/authMiddleware');

router.get('/', 
  verifyToken, 
  verifyRole(['Admin', 'Manager']), 
  logController.getLogs
);

module.exports = router;