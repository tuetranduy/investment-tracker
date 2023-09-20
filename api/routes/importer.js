const express = require('express');

const importerController = require('../controllers/importer-controller');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/importers', verifyToken, importerController.getImporters);

router.get('/importer/:importer_id', verifyToken, importerController.getImporter);

module.exports = router;