const router = require('express').Router();

const CheckRoles = require('../middlewares/role');

const RfcController = require('../controllers/rfc');

const Authenticated = require('../middlewares/auth');


router.get(`/`, Authenticated, CheckRoles('admin'), RfcController.getRfcs);

router.post('/', Authenticated, CheckRoles('admin'), RfcController.addRfc);

router.put('/:id(\\d+)/', Authenticated, CheckRoles('admin'), RfcController.updateRfc);

router.put(`/:id(\\d+)/disable`, Authenticated, CheckRoles('admin'), RfcController.disableRfc);

module.exports = router;