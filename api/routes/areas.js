const router = require('express').Router();
const AreaController = require('../controllers/area');
const Authenticated = require('../middlewares/auth');
router.get('/', [Authenticated],AreaController.getAreas);

router.post('/', AreaController.addArea);

router.get('/:id(\\d+)/', AreaController.getArea);

router.put('/:id(\\d+)/', AreaController.updateArea);

router.delete('/:id(\\d+)/', AreaController.removeArea);

module.exports = router;