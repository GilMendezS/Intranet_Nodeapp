const router = require('express').Router();

const PositionController = require('../controllers/position');

router.get('/', PositionController.getPositions);

router.post('/', PositionController.addPosition);

router.get('/:id', PositionController.getPosition);

router.put('/:id', PositionController.updatePosition);

router.delete('/:id', PositionController.removePosition);

module.exports = router;
