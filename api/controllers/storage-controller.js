const Storage = require('../models/storage');

exports.getStorage = async (req, res, next) => {
    const id = req.params.storage_id;

    Storage.findById(id)
        .then(storage => {
            res.send({
                success: true,
                data: storage
            })
        })
        .catch(err => {
            res.send({
                success: true,
                data: err
            })
        });
}

exports.getStorages = async (req, res, next) => {
    try {
        const storages = await Storage.findAll();
        res.send({
            success: true,
            data: storages
        });
    } catch (error) {
        res.send({
            success: true,
            data: error
        })
    }
}