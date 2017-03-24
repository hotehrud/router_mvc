const express = require('express');
const router = express.Router();

const passport = require('./passport');

const controller = require('./user.controller');

router.get('/', controller.index);

router.get('/:id', controller.show);

router.delete('/:id', controller.destroy);

router.post('/', controller.create);

router.put('/:id', controller.update);

router.get('/auth/naver/callback', passport.authenticate('naver'), controller.authCallback);

router.get('/auth/daum/callback', passport.authenticate('daum'), controller.authCallback);

router.get('/auth/kakao/callback', passport.authenticate('kakao'), controller.authCallback);

module.exports = router;