const express = require('express');
const verifyToken = require('../middlewares/authMiddleware');
const { getBinanceBalance } = require('../controllers/binance-controller');

const router = express.Router();

router.get('/balance', verifyToken, getBinanceBalance);

module.exports = router;
