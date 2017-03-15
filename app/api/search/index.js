const router = require('express').Router();

const controller = require('./search.controller');

// Through redis, select the target
router.get('/', controller.index);

// Temporary
router.get('/:keyword', controller.show);

// naver search contents insert
router.post('/naver', controller.create);

// daum search contents insert
router.post('/daum', controller.create);

// google search contents insert
router.post('/google', controller.create);

module.exports = router;