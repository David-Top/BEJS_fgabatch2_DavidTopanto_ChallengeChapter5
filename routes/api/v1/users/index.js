const express = require('express');
const router = express.Router();

const USERS_CONTROLLER = require('../../../../controllers/users.controller');
const AUTH_MIDDLEWARE = require('../../../../middleware/auth.middleware');

router.get('/', AUTH_MIDDLEWARE, USERS_CONTROLLER.index);
router.get('/:id', AUTH_MIDDLEWARE, USERS_CONTROLLER.userById);
router.post('/create', USERS_CONTROLLER.createUser);

module.exports = router;