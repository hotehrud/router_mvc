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

router.get('/auth/naver/callback', passport.authenticate('naver'));

module.exports = router;