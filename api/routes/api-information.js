const express = require('express');
const verifyToken = require('../middlewares/authMiddleware');
const {
    addApiInformation,
    getAllApiInformation,
    getApiInformationByPlatformName,
} = require('../controllers/api-information-controller');

const router = express.Router();

router.post('/add-api-information', verifyToken, addApiInformation);

router.get('/api-informations', verifyToken, getAllApiInformation);

router.get('/api-information', verifyToken, getApiInformationByPlatformName);

module.exports = router;
