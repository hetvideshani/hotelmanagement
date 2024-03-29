const jwt = require('jsonwebtoken');
const user = require('../schema/userSchema')
const dotenv = require('dotenv');

const authenticate = async (req, res, next) => {
    try {
        let token;
        if (req.cookies.jwtToken) {
            token = req.cookies.jwtToken;
        } else if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }
        else {
            return res.status(200).json({});
        }
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const currentUser = await user.findOne({ _id: verifyToken._id });
        console.log(currentUser);

        req.user = currentUser;
        next();

    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

module.exports = authenticate;