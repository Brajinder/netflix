const jwt = require('jsonwebtoken');
const { SECRET } = require('./utiljs');


const verify = (req, res, next) => {

    try {
        const tokenFromHeaders = req.headers.authorization;

        console.log('tokenFromHeaders**', tokenFromHeaders);

        if (tokenFromHeaders) {
            const token = tokenFromHeaders.split(' ')[1];
            jwt.verify(token, SECRET, (err, user) => {
                if (err) {
                    res.status(403).json({ msg: 'Token is not valid' });
                } else {
                    console.log(user, 'user');
                    req.user = user;
                    next();
                }
            });

        } else {
            res.status(401).json({ msg: 'You are not authenticated' });
        }

    } catch (error) {
        res.status(500).json({ msg: 'Pls check the token' });
    }
}

module.exports = verify;