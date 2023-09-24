const InvestmentType = require('../models/investment-type');

exports.getAllInvestmentTypes = (req, res, next) => {
    InvestmentType.findAll().then((investmentTypes) => {
        res.json({ success: true, data: investmentTypes });
    });
};

exports.addInvestmentType = (req, res, next) => {
    const { name } = req.body;
    InvestmentType.count({ where: { name: name } }).then((result) => {
        if (result > 0) {
            return res.status(400).json({
                success: false,
                message: 'Investment type already existed',
            });
        }
        InvestmentType.create({ name }).then((investmentType) =>
            res.json({
                data: {
                    name: investmentType.name,
                },
                message: 'Investment type created successfully',
                success: true,
            })
        );
    });
};
