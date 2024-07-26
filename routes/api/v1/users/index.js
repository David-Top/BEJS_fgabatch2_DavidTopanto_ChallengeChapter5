const express = require('express');
const router = express.Router();

const USERS_CONTROLLER = require('../../../../controllers/users.controller');

router.get('/', USERS_CONTROLLER.index);
router.get('/:id', USERS_CONTROLLER.userById);
router.post('/create', USERS_CONTROLLER.createUser);

module.exports = router;