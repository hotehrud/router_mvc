const router = require('express').Router();
const controller = require('./check.controller');

// Init create, targets in redis for a search
router.get('/search', controller.init);

// Store, target in redis for a search
router.get('/search/:sns', controller.search);

module.exports = router;