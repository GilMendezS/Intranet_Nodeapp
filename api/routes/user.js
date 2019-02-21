const router = require('express').Router();

const CheckAuth = require('../middlewares/auth');

const RolesMiddleware = require('../middlewares/role');

const UserController = require('../controllers/user');

router.get('/', [CheckAuth, RolesMiddleware(['admin'])],UserController.getUsers);

router.post('/', [CheckAuth, RolesMiddleware(['admin'])],UserController.addUser);

router.get('/profile', [CheckAuth],UserController.getUser);

router.put('/:id(\\d+)/changestatus', [CheckAuth], UserController.changeStatusUser);

module.exports = router;