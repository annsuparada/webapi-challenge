const express = require('express');
const router = express.Router();
const db = require('../data/helpers/actionModel.js')

router.use(express.json())

router.get('/', (req, res) => {
    res.status(200).send('hello from action router')
})

module.exports = router;