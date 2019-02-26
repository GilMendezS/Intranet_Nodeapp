const router = require('express').Router();

const RfcController = require('../controllers/rfc');

const AuthMiddleware = require('../middlewares/auth');

router.get(`/`, AuthMiddleware, RfcController.getRfcs);

router.post('/', AuthMiddleware, RfcController.addRfc);

router.put('/:id(\\+d)/', AuthMiddleware, RfcController.updateRfc);

router.put(`/:id(\\+d)/disable`, AuthMiddleware, RfcController.disableRfc);

