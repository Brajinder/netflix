const router = require('express').Router();
const userModel = require('../models/user');
const verify = require('../verify');
const CryptoJS = require("crypto-js");
const { SECRET } = require('../utiljs');


// update api
router.post('/:id', verify, async (req, res) => {

    if (req.user.id === req.params.id || req.user.isAdmin) {

        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(req.body.password, SECRET).toString();
        }
    }

    try {
        const updatedUser = await userModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json({ msg: 'Saved in DB', 'result': updatedUser });
    } catch (error) {
        res.status(500).json({ msg: 'failed' });
    }

});

router.get('find/:id', verify, async (req, res) => {

    try {
        const updatedUser = await userModel.findById(req.params.id);
        res.status(200).json({ msg: 'successful', result: updatedUser });
    } catch (error) {
        res.status(500).json({ msg: 'failed' });
    }

});

// ?query api
router.get('/', verify, async (req, res) => {

    try {
        const result = req.query.new;           // query
        const user = await userModel.find();
        res.status(200).json({ msg: 'successful', result: user });
    } catch (error) {
        res.status(500).json({ msg: 'failed' });
    }
});

// stats api
router.get('/stats', verify, async (req, res) => {
    try {
        const user = await userModel.aggregate([
            {
                $project: {
                    month: { $month: "$createdAt" },
                    username: 1,
                    _id: 0 // explicitly mention this to remove the "_id"
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                }
            }
        ]);
        res.status(200).json({ msg: 'successfull', result: user });
    } catch (error) {
        res.status(500).json({ msg: 'failed' });
    }
});

module.exports = router;