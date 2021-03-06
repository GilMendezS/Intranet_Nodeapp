const router = require('express').Router();

const AuthMiddleware = require('../middlewares/auth');

const ViaticController = require('../controllers/viatic');

router.post('/', [AuthMiddleware], ViaticController.addViatic);

router.get('/byuser', [AuthMiddleware], ViaticController.getViaticsByUser);

router.get('/authorize', [AuthMiddleware], ViaticController.getViaticsToAuthorize);

router.get('/history', [AuthMiddleware], ViaticController.getHistoryViatics);

router.get('/inprocess', [AuthMiddleware], ViaticController.getViaticsInProcess);

router.get('/:id(\\d+)/',[],ViaticController.getViatic);

router.put('/:id(\\d+)/', [AuthMiddleware], ViaticController.updateViatic);

router.put('/:id(\\d+)/changestatus', [AuthMiddleware], ViaticController.changeStatusViatic);

router.put('/:id(\\d+)/approve', [AuthMiddleware], ViaticController.approveViatic);

router.put('/:id(\\d+)/deny', [AuthMiddleware], ViaticController.denyViatic);

router.put('/:id(\\d+)/cancel', [AuthMiddleware], ViaticController.cancelViatic);

router.put('/:id(\\d+)/finalize', [AuthMiddleware], ViaticController.finalizeViatic);

module.exports = router;