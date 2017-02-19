const express = require('express');
const router = express.Router();

const controller = require('./search.controller');

router.get('/', controller.index);

router.get('/:keyword', controller.show);

module.exports = router;