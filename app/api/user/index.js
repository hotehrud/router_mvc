const express = require('express');
const router = express.Router();

const controller = require('./user.controller');

router.get('/', controller.index);

router.get('/:id', controller.show);

router.delete('/:id', controller.destroy);

router.post('/', controller.create);

router.put('/:id', controller.update);

// SNS login callback
router.get('/login/callback', controller.callback)

module.exports = router;