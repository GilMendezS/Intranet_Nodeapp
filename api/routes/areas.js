const router = require('express').Router();
const AreaController = require('../controllers/area');
const Authenticated = require('../middlewares/auth');
router.get('/', [Authenticated],AreaController.getAreas);

router.post('/', Authenticated,AreaController.addArea);

router.get('/:id(\\d+)/', Authenticated,AreaController.getArea);

router.put('/:id(\\d+)/', Authenticated,AreaController.updateArea);

router.delete('/:id(\\d+)/', Authenticated,AreaController.removeArea);

module.exports = router;