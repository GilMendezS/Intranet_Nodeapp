const router = require('express').Router();

const CheckRoles = require('../middlewares/role');

const Authenticated = require('../middlewares/auth');

const PositionController = require('../controllers/position');

router.get('/', Authenticated,  PositionController.getPositions);

router.post('/', Authenticated, CheckRoles('admin'), PositionController.addPosition);

router.get('/:id(\\d+)/', Authenticated, PositionController.getPosition);

router.put('/:id(\\d+)/', Authenticated, CheckRoles('admin'), PositionController.updatePosition);

router.delete('/:id(\\d+)/', Authenticated, CheckRoles('admin') ,PositionController.removePosition);

module.exports = router;
