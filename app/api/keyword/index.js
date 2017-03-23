const express = require('express');
const router = express.Router();

const controller = require('./keyword.controller');

router.get('/', controller.index);

// Specific Keyword
router.get('/spec/:keyword', controller.show);

// All Keyword
router.get('/list', controller.list);

// Rank Keyword
router.get('/rank', controller.rank);

// Keyword is store in redis. The reason is the number of keyword to check in real-time.
router.post('/create', controller.createOrIncrease);

module.exports = router;