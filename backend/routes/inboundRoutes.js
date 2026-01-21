const express = require('express');
const router = express.Router();
const inboundController = require('../controllers/inboundController');

router.post('/', inboundController.createInbound);
router.get('/', inboundController.getInboundHistory);

module.exports = router;