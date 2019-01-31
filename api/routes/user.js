const router = require('express').Router();

const UserController = require('../controllers/user');

router.get('/', UserController.getUsers);

router.post('/', UserController.addUser);

module.exports = router;