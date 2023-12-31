const jwt = require('jsonwebtoken');
const User = require('../models/user');
const cryptoUtil = require('../util/cryptoUtil');
const { jwtOptions } = require('../middlewares/passportMiddleware');
const errorHelper = require('../helpers/errorHelper');
const {
    PROCESS_ERROR_MESSAGE,
    CONFIRMATION_PASSWORD_NOT_MATCH,
    OLD_PASSWORD_INCORRECT,
    INSUFFICIENT_PERMISSION_MESSAGE,
} = require('../constants/messages');

exports.getAllUsers = (req, res, next) => {
    let query = {
        attributes: ['id', 'name', 'username', 'isActive'],
    };

    User.findAll(query).then((users) => {
        res.json({ success: true, data: users });
    });
};

exports.createUser = (req, res, next) => {
    const { username, name } = req.body;
    let { password } = req.body;
    const isActive = true;

    User.count({ where: { username: username } }).then((result) => {
        if (result > 0) {
            return res.status(401).json({
                success: false,
                message: 'Username is existed',
            });
        }
        // create default password
        if (!password) {
            password = '12345678';
        }
        const [salt, hash] = cryptoUtil.setPassword(password);

        User.create({ username, salt, hash, name, isActive }).then((user) =>
            res.json({
                data: {
                    username: user.username,
                    name: user.name,
                    isActive: user.isActive,
                },
                message: 'account created successfully',
                success: true,
            })
        );
    });
};

exports.login = async function (req, res, next) {
    const { username, password } = req.body;

    if (username && password) {
        let user = await User.findOne({
            where: { username },
        });
        if (!user) {
            return res.status(401).json({ msg: 'Username / Password is incorrect' });
        }
        if (!user.isActive) {
            return res.json({ isSuccess: false, msg: 'User is disabled' });
        }
        if (cryptoUtil.validPassword(password, user.salt, user.hash)) {
            let payload = {
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
            };
            let token = jwt.sign(payload, jwtOptions.secretOrKey, { expiresIn: '1day' });
            res.json({
                success: true,
                data: {
                    token: token,
                    user: {
                        username: user.username,
                        email: user.email,
                        name: user.name,
                    },
                },
            });
        } else {
            res.status(401).json({ msg: 'Username / Password is incorrect' });
        }
    }
};

exports.updatePassword = async function (req, res, next) {
    const { username, oldPassword, newPassword, confirmNewPassword } = req.body;

    if (username && oldPassword && newPassword && confirmNewPassword) {
        await User.findOne({ where: { username } })
            .then((user) => {
                if (!user) {
                    res.status(400).json({ success: false, message: 'User not found!' });
                }
                // Check old password
                if (cryptoUtil.validPassword(oldPassword, user.salt, user.hash)) {
                    // check if newPassword match confirmNewPassword
                    if (newPassword === confirmNewPassword) {
                        const [salt, hash] = cryptoUtil.setPassword(newPassword);

                        user.salt = salt;
                        user.hash = hash;
                        return user.save();
                    }
                    return errorHelper.badRequest(req, res, next, CONFIRMATION_PASSWORD_NOT_MATCH);
                }
                return errorHelper.badRequest(req, res, next, OLD_PASSWORD_INCORRECT);
            })
            .then((result) => {
                if (result) {
                    res.send({
                        success: true,
                        message: 'Change password successfully',
                        data: {
                            id: result.id,
                            name: result.name,
                            email: result.email,
                            username: result.username,
                        },
                    });
                }
            })
            .catch((err) => errorHelper.requestProcessError(req, res, next, PROCESS_ERROR_MESSAGE));
    }
    errorHelper.badRequest(req, res, next, 'username, oldPassword, newPassword, confirmNewPassword must be supplied');
};

exports.updateUserInformation = async function (req, res, next) {
    const { userId } = req;
    const id = req.body.id;
    const updateName = req.body.name;
    const updateUsername = req.body.username;
    const updateIsActive = req.body.isActive;

    if (userId === id) {
        User.findByPk(id)
            .then((user) => {
                user.name = updateName;
                user.username = updateUsername;
                user.isActive = updateIsActive;

                return user.save();
            })
            .then((result) => {
                if (result) {
                    return res.send({
                        success: true,
                        message: 'User updated successfully',
                        data: {
                            id: result.id,
                            name: result.name,
                            username: result.username,
                            isActive: result.isActive,
                        },
                    });
                }
            })
            .catch((error) => errorHelper.requestProcessError(req, res, next, error));
    } else {
        return errorHelper.permissionInsufficient(req, res, next, INSUFFICIENT_PERMISSION_MESSAGE);
    }
};
