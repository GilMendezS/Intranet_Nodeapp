const router = require('express').Router();

const AuthMiddleware = require('../middlewares/auth');

const ViaticController = require('../controllers/viatic');

router.post('/', [AuthMiddleware], ViaticController.addViatic);

router.get('/byuser', [AuthMiddleware], ViaticController.getViaticsByUser);

module.exports = router;