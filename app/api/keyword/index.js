const express = require('express');
const router = express.Router();

const controller = require('./keyword.controller');

router.get('/', controller.index);

// Keyword is store in redis. The reason is the number of keyword to check in real-time.
router.post('/', controller.create);

module.exports = router;