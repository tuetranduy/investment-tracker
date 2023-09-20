const express = require('express');

const storageController = require('../controllers/storage-controller');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/storages', verifyToken, storageController.getStorages);

router.get('/storage/:storage_id', verifyToken, storageController.getStorage);

module.exports = router;