const jwt = require("jsonwebtoken");
require("dotenv").config();

JWT_SECRET = process.env.ADMIN_JWT_SECRET;

function adminAuth(req, res, next) {
    const token = req.headers.token;
    const isValid = jwt.verify(token, JWT_SECRET);
    if (!isValid) {
        res.code(403).send("unauth user");
        return;
    }

    req.userId = isValid.id;
    next();
}

module.exports = adminAuth;