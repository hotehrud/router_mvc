const router = require('express').Router();

const controller = require('./search.controller');

// Through redis, select the target
router.get('/show/:keyword', controller.init);

// naver search contents get
router.get('/naver', controller.getNaver);

// naver search contents insert
router.post('/naver', controller.insertNaver);

// daum search contents get
router.get('/daum', controller.getDaum);

// daum search contents insert
router.post('/daum', controller.insertDaum);

// google search contents insert
router.get('/google', controller.getGoogle);

// google search contents insert
router.post('/google', controller.insertGoogle);

module.exports = router;