const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.USER_JWT_SECRET;

function userAuth(req, res, next) {
    const token = req.headers.token;
    const isValid = jwt.verify(token, JWT_SECRET);
    if (!isValid) {
        res.code(403).send("Invalid user");
        return;
    }

    req.userId = isValid.id;
    next();
}

module.exports = userAuth;