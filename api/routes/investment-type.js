const express = require('express');
const { getAllInvestmentTypes, addInvestmentType } = require('../controllers/investment-type-controller');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/investment-types', verifyToken, getAllInvestmentTypes);

router.post('/add-investment-type', verifyToken, addInvestmentType);

module.exports = router;
