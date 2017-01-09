const express = require('express');
const router = express.Router();

const userCtrl = require('./user.controller');

router.get('/', userCtrl.index);

router.get('/:id', userCtrl.show);

router.delete('/:id', userCtrl.destroy);

router.post('/', userCtrl.create);

module.exports = router;