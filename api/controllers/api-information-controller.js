const ApiInformation = require('../models/api-information');

exports.getAllApiInformation = (req, res, next) => {
    ApiInformation.findAll().then((apiInformations) => {
        res.json({ success: true, data: apiInformations });
    });
};

exports.getApiInformationByPlatformName = (req, res, next) => {
    const { description } = req.query;
    ApiInformation.findOne({ where: { description: description } }).then((apiInformation) => {
        res.json({ success: true, data: apiInformation });
    });
};

exports.addApiInformation = (req, res, next) => {
    const { description, api_key, api_secret } = req.body;

    ApiInformation.create({ description, api_key, api_secret }).then((apiInformation) =>
        res.json({
            data: {
                description: apiInformation.description,
                api_key: apiInformation.api_key,
                api_secret: apiInformation.api_secret,
            },
            message: 'New api information created successfully',
            success: true,
        })
    );
};
