const router = require('express').Router();

const PositionController = require('../controllers/position');

router.get('/', PositionController.getPositions);

module.exports = router;
