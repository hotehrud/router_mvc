const express = require('express');
const router = express.Router();

const passport = require('./passport');

const controller = require('./user.controller');

router.get('/', controller.index);

router.get('/:id', controller.show);

router.delete('/:id', controller.destroy);

router.post('/', controller.create);

router.put('/:id', controller.update);

// SNS login callback
router.get('/auth/naver', passport.authenticate('naver'));

router.get('/auth/naver/callback', passport.authenticate('naver', {
    failureRedirect: 'signin',
    successRedirect: '/'
}));

router.get('/auth/daum', passport.authenticate('daum'));

router.get('/auth/daum/callback', passport.authenticate('daum', {
    failureRedirect: 'signin',
    successRedirect: '/'
}));

router.get('/auth/kakao', passport.authenticate('kakao'));

router.get('/auth/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: 'signin',
    successRedirect: '/'
}));

module.exports = router;