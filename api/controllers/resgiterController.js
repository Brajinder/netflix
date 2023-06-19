// logic of the Contacts routes.

const express = require("express");
const router = express();
const usersModel = require('../models/user');

router.post('/', async (req, res) => {

    try {
        const newUser = new usersModel({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        const resUser = await newUser.save();

        const response = { msg: "success", code: "200", result: resUser };
        res.json(response);

    }
    catch (err) {
        console.log(err, 'err while saving user');

    }
});

router.get('/', (req, res) => {
    res.json({ msg: 'get' });
});

router.delete('/', (req, res) => {
    res.json({ msg: 'deleted' });
});

// exports.get = getContacts;
// exports.post = postContacts;
// exports.delete = deleteContacts;
// module.exports = { get: getContacts, postContacts, deleteContacts };

module.exports = router;

