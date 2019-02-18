const router = require('express').Router();

const CheckAuth = require('../middlewares/auth');

const UserController = require('../controllers/user');

router.get('/', UserController.getUsers);

router.post('/', UserController.addUser);

router.get('/profile', [CheckAuth],UserController.getUser);


module.exports = router;