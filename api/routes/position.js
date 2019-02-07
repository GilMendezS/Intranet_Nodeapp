const router = require('express').Router();

const PositionController = require('../controllers/position');

router.get('/', PositionController.getPositions);

router.post('/', PositionController.addPosition);

router.get('/:id(\\d+)/', PositionController.getPosition);

router.put('/:id(\\d+)/', PositionController.updatePosition);

router.delete('/:id(\\d+)/', PositionController.removePosition);

module.exports = router;
