const express = require('express');
const router = express.Router();

const controller = require('./keyword.controller');

router.get('/', controller.index);

// Specific Keyword
router.get('/:keyword', controller.show);

// All Keyword
router.get('/list/:keyword', controller.list);

// Keyword is store in redis. The reason is the number of keyword to check in real-time.
router.post('/', controller.create);

module.exports = router;