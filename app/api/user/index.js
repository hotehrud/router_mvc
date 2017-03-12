const express = require('express');
const router = express.Router();

const passport = require('./passport');

const controller = require('./user.controller');

router.get('/', controller.index);

router.get('/:id', controller.show);

router.delete('/:id', controller.destroy);

router.post('/', controller.create);

router.put('/:id', controller.update);

router.get('/auth/naver/callback', passport.authenticate('naver'), (req, res) => {
    req.user ? res.status(200).json({msg: req.user}) : res.status(500).json({msg: "Interal Error"});
});

router.get('/auth/daum/callback', passport.authenticate('daum'), (req, res) => {
    req.user ? res.status(200).json({msg: req.user}) : res.status(500).json({msg: "Interal Error"});
});

router.get('/auth/kakao/callback', passport.authenticate('kakao'), (req, res) => {
    req.user ? res.status(200).json({msg: req.user}) : res.status(500).json({msg: "Interal Error"});
});

module.exports = router;