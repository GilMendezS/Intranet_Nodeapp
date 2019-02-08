const router = require('express').Router();

const UserController = require('../controllers/user');

router.get('/', UserController.getUsers);

router.post('/', UserController.addUser);

router.get('/:id(\\d+)/', UserController.getUser);


module.exports = router;