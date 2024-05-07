const jwt = require('jsonwebtoken')

const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SPECIAL_VALUE, {
        expiresIn: "100d"
    });
};

module.exports = generateToken;