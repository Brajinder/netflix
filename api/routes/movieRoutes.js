const router = require('express').Router();
const movieModel = require('../models/movie');
const verify = require('../verify');

// create
router.post('/', verify, async (req, res) => {

    if (req.user.isAdmin) {
        const movie = new movieModel(req.body);

        try {
            const savedMovie = await movie.save();
            res.status(200).json({ msg: 'Movie saved', result: savedMovie });
        } catch (error) {
            res.status(500).json({ msg: 'Movie not saved' });
        }
    } else {
        res.status(401).json({ msg: 'Not Allowed' });
    }
});

// update
router.post('/:id', verify, async (req, res) => {

    if (req.user.isAdmin) {

        try {
            const updatedMovie = await movieModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            res.status(200).json({ msg: 'Movie updated', result: updatedMovie });
        } catch (error) {
            res.status(500).json({ msg: 'Movie not updated' });
        }
    } else {
        res.status(403).json({ msg: 'Not Allowed' });
    }
});

// delete
router.post('/delete/:id', verify, async (req, res) => {

    if (req.user.isAdmin) {
        try {
            const deletedMovie = await movieModel.findByIdAndDelete(req.params.id);
            res.status(200).json({ msg: 'Movie deleted', result: deletedMovie });
        } catch (error) {
            res.status(500).json({ msg: 'Movie not deleted' });
        }
    } else {
        res.status(403).json({ msg: 'Not Allowed' });
    }
});

// Random Get
router.get('/randomMovie', verify, async (req, res) => {

    const type = req.query.type;
    if (!type) {
        return res.status(400).json({ msg: 'Please select the type' });
    }
    let movie;
    try {
        if (type === 'series') {
            movie = await movieModel.aggregate([
                { $match: { isSeries: true } },
                { $sample: { size: 1 } }
            ]);
        } else {
            movie = await movieModel.aggregate([
                { $match: { isSeries: false } },
                { $sample: { size: 1 } }
            ]);
        }
        res.status(200).json({ msg: 'successful', result: movie });
    } catch (err) {
        res.status(500).json({ msg: 'Fail' });
    }

});


module.exports = router;