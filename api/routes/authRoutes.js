const router = require('express').Router();
const userModel = require('../models/user');
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
const { SECRET } = require('../utiljs');
const verify = require('../verify');



router.post('/register', async (req, res) => {

    try {
        const newUser = new userModel({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, SECRET).toString()
        });

        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ msg: 'Please provide the values in the POST request' });
        console.log('error', error);
    }
});

router.post('/login', async (req, res) => {

    // use "if else" here to improve the logic and readability.....

    if (!req.body.email || !req.body.password) {
        return res.json({ msg: 'Please enter the credentials' });
    }

    try {
        const user = await userModel.findOne({ email: req.body.email });

        // if email is not found in db, it still goes to the catch block;
        !user && res.status(400).json({ msg: 'No Such email found!' });

        // code continues further. it does not return here!!

        const bytes = CryptoJS.AES.decrypt(user.password, SECRET);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);

        if (originalText !== req.body.password) {
            res.status(400).json({ msg: 'Password not matched!' });
        }
        else {
            const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, SECRET, { expiresIn: 60 * 60 }); // JWT token
            const { password, ...info } = user._doc; // destructuring password
            res.status(200).json({ msg: 'Login successful!', res: { ...info, token } });
        }
    } catch (error) {
        console.log('error');
    }
});

router.get('/data', verify, (req, res) => {


    res.json({ msg: 'data' });

})

module.exports = router;