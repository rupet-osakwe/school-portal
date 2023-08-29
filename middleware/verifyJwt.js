const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    console.log(authHeader);
    if (!authHeader?.startsWith('Bearer ')) {
        return res.sendStatus(401)
    };
    //Bearer  token
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req.userName = decoded.User.userName;
            req.role = decoded.User.role;

            console.log(err)
            next();
        }
    );
}

module.exports = verifyJWT
