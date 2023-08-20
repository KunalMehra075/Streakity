const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JSON_SECRET;
const Authentication = async (req, res, next) => {

    try {
        const token = req.headers?.authorization?.split(" ")[1];
        if (!token) return res.status(403).send({ msg: "Un-authorized. Token Not Found" })

        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) return res.json({ msg: err.message, status: "error" })
            req.headers.userID = decoded.id;
            req.headers.role = decoded.role;
            next();
        })
    } catch (error) {
        res.status(500).send({ msg: "Something went wrong while authorizing user", "err": error })
    }

}
module.exports = Authentication;