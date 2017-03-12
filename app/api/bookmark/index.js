const express = require('express');
const router = express.Router();
const controller = require('./bookmark.controller');

router.get('/', controller.index);

// bookmark search for specific keyword
router.get('/spec/:id', controller.show);

// All bookmark search
router.get('/list', controller.list);

// bookmark delete
router.delete('/:id', controller.destroy);

// bookmark create
router.post('/', controller.create);

module.exports = router;