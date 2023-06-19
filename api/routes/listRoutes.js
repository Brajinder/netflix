const router = require('express').Router();
const listModel = require('../models/list');
const verify = require('../verify');

// create
router.post('/', verify, async (req, res) => {

    if (req.user.isAdmin) {
        const movie = new listModel(req.body);
        try {
            const savedList = await movie.save();
            res.status(200).json({ msg: 'List saved', result: savedList });
        } catch (error) {
            res.status(500).json({ msg: 'List not saved' });
        }
    } else {
        res.status(401).json({ msg: 'Not Allowed' });
    }
});

// delete
router.post('/delete/:id', verify, async (req, res) => {

    if (req.user.isAdmin) {
        try {
            const deletedList = await listModel.findByIdAndDelete(req.params.id);
            res.status(200).json({ msg: 'List deleted', result: deletedList });
        } catch (error) {
            res.status(500).json({ msg: 'List not deleted' });
        }
    } else {
        res.status(403).json({ msg: 'Not Allowed' });
    }
});

// Random Get
router.get('/randomMovie', verify, async (req, res) => {

    const type = req.query.type;
    const genre = req.query.genre;
    if (!type) {
        return res.status(400).json({ msg: 'Please select the type' });
    }
    let list;
    try {
        if (type) {
            if (genre) {
                list = await movieModel.aggregate([
                    { $match: { type: type, genre: genre } },
                    { $sample: { size: 10 } }
                ]);
            }
            else {
                list = await movieModel.aggregate([
                    { $match: { type: type } },
                    { $sample: { size: 10 } }
                ]);
            }
        } else {
            list = await movieModel.aggregate([
                { $sample: { size: 10 } }
            ]);
        }
        res.status(200).json({ msg: 'successful', result: list });
    } catch (err) {
        res.status(500).json({ msg: 'Fail' });
    }
});

module.exports = router;