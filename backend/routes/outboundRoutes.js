const express = require('express');
const router = express.Router();
const outboundController = require('../controllers/outboundController');

router.post('/', outboundController.createOutbound);

module.exports = router;