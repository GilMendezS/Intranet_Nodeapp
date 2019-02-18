const router = require('express').Router();

const AuthMiddleware = require('../middlewares/auth');

const ViaticController = require('../controllers/viatic');

router.post('/', [AuthMiddleware], ViaticController.addViatic);

router.get('/byuser', [AuthMiddleware], ViaticController.getViaticsByUser);

router.get('/:id(\\d+)/',[AuthMiddleware],ViaticController.getViatic);

router.put('/:id(\\d+)/', [AuthMiddleware], ViaticController.updateViatic);

router.put('/:id(\\d+)/approve', [AuthMiddleware], ViaticController.approve);

router.put('/:id(\\d+)/deny', [AuthMiddleware], ViaticController.deny);

module.exports = router;