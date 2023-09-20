const Vehicle = require('../models/vehicle');
const { ADMIN } = require('../constants/roles');
const { INSUFFICIENT_PERMISSION_MESSAGE } = require('../constants/messages');
const errorHelper = require('../helpers/errorHelper');
const { status } = require('../constants/common');
const { Op } = require('sequelize');

exports.postAddVehicle = async (req, res, next) => {
    const plateNumber = req.body.plate_number;
    const vehicleType = req.body.vehicle_type;
    const classify = req.body.classify;
    const dateOfEntry = req.body.date_of_entry;
    const dateOfExit = req.body.date_of_exit;
    const rowNo = req.body.row_no;
    const note = req.body.note;
    const storageId = req.body.storage_id;
    const importerId = req.body.importer_id;

    let vehicle = await Vehicle.count({ where: { plate_number: plateNumber.trim() } });

    if (vehicle > 0) {
        return res.status(400).json({
            success: false,
            message: 'Biển kiểm soát này đã tồn tại',
        });
    }

    Vehicle.create({
        plate_number: plateNumber,
        vehicle_type: vehicleType,
        classify: classify,
        date_of_entry: dateOfEntry,
        date_of_exit: dateOfExit,
        importer_id: importerId,
        storage_id: storageId,
        row_no: rowNo,
        note: note,
        status: status.imported,
        user_id: req.userId,
    })
        .then((result) => {
            res.send({
                success: true,
                data: result,
            });
        })
        .catch((err) => {
            res.send({
                success: false,
                data: err,
            });
        });
};

exports.postUpdateVehicle = async (req, res, next) => {
    const id = req.body.id;
    const updatedPlateNumber = req.body.plate_number;
    const updatedVehicleType = req.body.vehicle_type;
    const updatedClassify = req.body.classify;
    const updatedDateOfEntry = req.body.date_of_entry;
    const updatedDateOfExit = req.body.date_of_exit;
    const updatedRowNo = req.body.row_no;
    const updatedNote = req.body.note;
    const updatedStatus = req.body.status;
    const updatedStorageId = req.body.storage_id;
    const updatedImporterId = req.body.importer_id;
    const updatedStorageChangedId = req.body.storage_changed_id;

    let isDuplication = false;

    Vehicle.findById(id)
        .then(async (vehicle) => {
            if (updatedPlateNumber !== vehicle.plate_number) {
                let count = await Vehicle.count({
                    where: { plate_number: updatedPlateNumber },
                });

                if (count > 0) {
                    isDuplication = true;
                    return res.status(400).json({
                        success: false,
                        message: 'Biển kiểm soát này đã tồn tại',
                    });
                }
            }

            vehicle.plate_number = updatedPlateNumber;
            vehicle.date_of_entry = updatedDateOfEntry;
            vehicle.date_of_exit = updatedDateOfExit;
            vehicle.importer_id = updatedImporterId;
            vehicle.storage_id = updatedStorageId;
            vehicle.row_no = updatedRowNo;
            vehicle.note = updatedNote;
            vehicle.storage_changed_id = updatedStorageChangedId;
            vehicle.status = updatedStatus;
            vehicle.vehicle_type = updatedVehicleType;
            vehicle.classify = updatedClassify;

            return vehicle.save();
        })
        .then((result) => {
            if (!isDuplication) {
                res.send({
                    success: true,
                    data: result,
                });
            }
        })
        .catch((err) => {
            res.send({
                success: false,
                data: err,
            });
        });
};

exports.hardDeleteVehicle = (req, res, next) => {
    const { id } = req.body;
    const roleId = req.roleId;

    console.log('api debug: ' + req.body);

    Vehicle.findById(id)
        .then((vehicle) => {
            if (roleId === ADMIN) {
                return vehicle.destroy();
            }

            return false;
        })
        .then((result) => {
            if (!result) {
                return errorHelper.permissionInsufficient(req, res, next, INSUFFICIENT_PERMISSION_MESSAGE);
            }
            res.send({
                success: true,
                message: 'Vehicle deleted!',
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getVehicle = (req, res, next) => {
    const id = req.params.vehicleId;

    Vehicle.findById(id)
        .then((vehicle) => {
            res.send({
                success: true,
                data: vehicle,
            });
        })
        .catch((err) => {
            res.send({
                success: true,
                data: err,
            });
        });
};

exports.getVehicles = async (req, res, next) => {
    try {
        const vehicles = await Vehicle.findAll();
        res.send({
            success: true,
            data: vehicles,
        });
    } catch (error) {
        res.send({
            success: true,
            data: error,
        });
    }
};

exports.exportVehicle = async (req, res, next) => {
    const id = req.body.id;

    Vehicle.findById(id)
        .then((vehicle) => {
            vehicle.status = status.exported;
            vehicle.date_of_exit = new Date().setUTCHours(0, 0, 0, 0);

            return vehicle.save();
        })
        .then((result) => {
            res.send({
                success: true,
                data: result,
            });
        })
        .catch((err) => {
            res.send({
                success: false,
                data: err,
            });
        });
};

exports.getVehiclesByType = async (req, res, next) => {
    const { vehicle_type } = req.body;

    try {
        const vehicles = await Vehicle.findAll({ where: { vehicle_type } });
        res.send({
            success: true,
            data: vehicles,
        });
    } catch (error) {
        res.send({
            success: true,
            data: error,
        });
    }
};

exports.searchVehicle = async (req, res, next) => {
    const filters = req.query;

    try {
        const vehicles = await Vehicle.findAll();

        const filteredVehicle = vehicles.filter((vehicle) => {
            let isValid = true;

            for (key in filters) {
                console.log(
                    '==> param: ' + key,
                    '==> database value: ' + vehicle[key],
                    '==> request value: ' + filters[key]
                );

                isValid = isValid && checkValid(vehicle[key], filters[key], key);
            }

            console.log('valid:', isValid);

            return isValid;
        });
        res.send({
            success: true,
            data: filteredVehicle,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Đã xảy ra lỗi!',
        });
    }
};

exports.reporting = async (req, res, next) => {
    const type = req.query.type;
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;

    let query;

    try {
        if (type === 'importDate') {
            query = {
                date_of_entry: {
                    [Op.and]: {
                        [Op.gte]: new Date(fromDate),
                        [Op.lte]: new Date(toDate),
                    },
                },
            };
        } else if (type === 'exportDate') {
            query = {
                date_of_exit: {
                    [Op.and]: {
                        [Op.gte]: new Date(fromDate),
                        [Op.lte]: new Date(toDate),
                    },
                },
            };
        } else if (type === 'all') {
            query = {
                [Op.or]: {
                    date_of_entry: {
                        [Op.and]: {
                            [Op.gte]: new Date(fromDate),
                            [Op.lte]: new Date(toDate),
                        },
                    },
                    date_of_exit: {
                        [Op.and]: {
                            [Op.gte]: new Date(fromDate),
                            [Op.lte]: new Date(toDate),
                        },
                    },
                },
            };
        } else {
            return res.status(400).json({
                success: false,
                message: 'Invalid type!',
            });
        }

        const result = await Vehicle.findAll({ where: query });

        return res.send({
            success: true,
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Đã xảy ra lỗi! ' + error + '',
        });
    }
};

function checkValid(vehicle, filter, key) {
    let isMatch = vehicle === filter;

    if (key === 'date_of_entry') {
        if (filter === '') {
            isMatch = true;
        } else {
            isMatch = filter === vehicle;
        }
    } else if (key === 'importer_id') {
        if (filter === '') {
            isMatch = true;
        } else {
            isMatch = parseInt(filter) === vehicle;
        }
    } else {
        isMatch = vehicle === filter || vehicle.includes(filter);
    }

    return isMatch;
}
