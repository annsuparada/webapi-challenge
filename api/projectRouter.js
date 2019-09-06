const express = require('express');
const router = express.Router();
const db = require('../data/helpers/projectModel.js')

router.use(express.json())

router.get('/', (req, res) => {
    res.status(200).send('hello from project router')
})

module.exports = router;