// logic of the Contacts routes.
const express = require('express');
const router = express();
// const router = require('express').Router(); 
const contactsModel = require('../models/contact');


router.get('/', async (req, res) => {
    // put in try catch    
    const response = await contactsModel.find();
    res.json(response);
});

router.post('/', (req, res) => {
    res.json({ msg: 'posted' });
});

router.delete('/', (req, res) => {
    res.json({ msg: 'deleted' });
});

module.exports = router;

// module.exports = { get: getContacts, postContacts, deleteContacts };
// exports.get = getContacts;
// exports.post = postContacts;
// exports.delete = deleteContacts;
