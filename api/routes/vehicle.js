const express = require('express');

const vehicleController = require('../controllers/vehicle-controller');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/add-vehicle', verifyToken, vehicleController.postAddVehicle);

router.post('/update-vehicle', verifyToken, vehicleController.postUpdateVehicle);

router.post('/export-vehicle', verifyToken, vehicleController.exportVehicle);

router.delete('/delete-vehicle', verifyToken, vehicleController.hardDeleteVehicle);

router.get('/vehicle/:vehicleId', verifyToken, vehicleController.getVehicle);

router.get('/vehicles', verifyToken, vehicleController.getVehicles);

router.post('/getVehiclesByType', verifyToken, vehicleController.getVehiclesByType);

router.get('/vehicles/search', verifyToken, vehicleController.searchVehicle);

router.get('/vehicles/report', verifyToken, vehicleController.reporting);

module.exports = router;
