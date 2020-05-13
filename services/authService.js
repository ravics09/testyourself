const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const secretKey = process.env.SECRET_KEY;
const expireIn = process.env.EXPIRES_IN;

const generateToken = (res, next, user, to) => {
    const payload = {
        user: user.userName
    };

    jwt.sign(payload, secretKey, { expiresIn: expireIn, algorithm: 'HS256' }, (err, token) => {
        if (err) {
            console.log("err to generate token", err);
        } else {
            res.header({ 'access_token': token });

            if (to === 'register') {
                return res.json(user);
            } else if (to === 'authentication') {
                return res.json({
                    user: { id: user.id, userName: user.userName, email: user.email, firstName: user.firstName, lastName: user.lastName, token: token }
                })
            }
        }
    });
}

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).json({ message: 'NoTokenFoundInRequest' });
    }

    jwt.verify(token, secretKey, { expiresIn: expireIn, algorithm: 'HS256' }, (err, decoded) => {
        if (err) {
            console.log("Error wile decoding token", err);
            throw err;
        }
        next();
    })
}

module.exports = { generateToken, verifyToken };