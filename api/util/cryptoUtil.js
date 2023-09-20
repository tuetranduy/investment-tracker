const crypto = require('crypto');

exports.setPassword = (password) => {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);

    return [salt, hash]
};

exports.validPassword = (password, salt, hash) => {
    const enCrypthash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);

    return hash === enCrypthash;
}; 
