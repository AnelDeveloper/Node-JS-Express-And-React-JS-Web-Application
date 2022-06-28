const express = require('express');
const router = express.Router();
const { Categories } = require('../models');
const { Subcategories } = require('../models');


router.get('/', async (req, res) => {
    const categories = await Categories.findAll()
                            .then(function (categories) {
                                console.log(categories);
                                res.json(categories);
                            })
                            .catch(function (err) {
                                // every error
                                res.json(err);
                            });
});


router.get('/allinfo', async (req, res) => {
    const data = await Categories.findAll({ include: Subcategories })
                            .then(function (data) {
                                console.log(data);
                                res.json(data);
                            })
                            .catch(function (err) {
                                // every error
                                res.json(err);
                            });
});





module.exports = router;
