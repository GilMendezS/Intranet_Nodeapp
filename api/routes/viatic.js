const router = require('express').Router();

const AuthMiddleware = require('../middlewares/auth');

const ViaticController = require('../controllers/viatic');

router.post('/', [AuthMiddleware], ViaticController.addViatic);

router.get('/byuser', [AuthMiddleware], ViaticController.getViaticsByUser);

router.get('/:id(\\d+)/',[AuthMiddleware],ViaticController.getViatic);

router.put('/:id(\\d+)/', [AuthMiddleware], ViaticController.updateViatic);

router.put('/:id(\\d+)/approve', [AuthMiddleware], ViaticController.approveViatic);

router.put('/:id(\\d+)/deny', [AuthMiddleware], ViaticController.denyViatic);

router.put('/:id(\\d+)/cancel', [AuthMiddleware], ViaticController.cancelViatic);

router.put('/:id(\\d+)/finalize', [AuthMiddleware], ViaticController.finalizeViatic);

module.exports = router;