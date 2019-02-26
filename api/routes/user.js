const router = require('express').Router();

const CheckAuth = require('../middlewares/auth');

const RolesMiddleware = require('../middlewares/role');

const UserController = require('../controllers/user');

router.get('/', [CheckAuth, RolesMiddleware(['admin'])],UserController.getUsers);

router.post('/', [CheckAuth, RolesMiddleware(['admin'])],UserController.addUser);

router.get('/profile', [CheckAuth],UserController.getUser);

router.get('/:id(\\d+)/', [CheckAuth],UserController.getUserById);

router.put('/:id(\\d+)/', [CheckAuth],UserController.updateUser);

router.put('/:id(\\d+)/changestatus', [CheckAuth], UserController.changeStatusUser);

router.put('/:id(\\d+)/modifyroles', [CheckAuth], UserController.modifyRoles);

module.exports = router;