const jwt = require('jsonwebtoken')

const generate_jwt = (id) => {
    return jwt.sign({id},process.env.JWT_SPECIAL_VALUE, {
        expiresIn: "1000d"
    });
};

module.exports = generate_jwt;