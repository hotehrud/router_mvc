const router = require('express').Router();
const controller = require('./bookmark.controller');

router.get('/', controller.index);

// bookmark search for specific keyword
router.get('/spec/:id', controller.show);

// All bookmark search
router.get('/list', controller.show);

// bookmark delete
router.delete('/:id', controller.destroy);

// bookmark create
router.post('/:id', controller.create);

module.exports = router;