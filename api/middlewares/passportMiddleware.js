const passportJWT = require('passport-jwt');
const { SECRET_KEY } = require('../config/index');

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = SECRET_KEY;

const strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);
    let user = User.findOne({
        where: { id: jwt_payload.id }
    });
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});

exports.strategy = strategy;
exports.jwtOptions = jwtOptions;