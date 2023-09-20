const Importer = require('../models/importer');

exports.getImporter = (req, res, next) => {
    const id = req.params.importer_id;

    Importer.findById(id)
        .then(importer => {
            res.send({
                success: true,
                data: importer
            })
        })
        .catch(err => {
            res.send({
                success: true,
                data: err
            })
        });
};

exports.getImporters = async (req, res, next) => {
    try {
        const importers = await Importer.findAll();
        res.send({
            success: true,
            data: importers
        });
    } catch (error) {
        res.send({
            success: true,
            data: error
        })
    }
};