const router = require('express').Router();
const AreaController = require('../controllers/area');

router.get('/', AreaController.getAreas);

router.post('/', AreaController.addArea);

router.get('/:id', AreaController.getArea);

router.put('/:id', AreaController.updateArea);

router.delete('/:id', AreaController.removeArea);

module.exports = router;