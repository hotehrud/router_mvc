const router = require('express').Router();
const controller = require('./check.controller');

// Init create, targets in redis for a search
router.post('/create', controller.init);

// Store, target in redis for a search
router.get('/search/:provider', controller.findAndUpdate);

module.exports = router;