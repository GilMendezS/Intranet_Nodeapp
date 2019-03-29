const router = require('express').Router();

const CheckRoles = require('../middlewares//role');

const Authenticated = require('../middlewares/auth');

const AreaController = require('../controllers/area');

router.get('/', Authenticated ,AreaController.getAreas);

router.get('/:id(\\d+)/', Authenticated,AreaController.getArea);

router.post('/', Authenticated, CheckRoles('admin'), AreaController.addArea);

router.put('/:id(\\d+)/', Authenticated, CheckRoles('admin'), AreaController.updateArea);

router.delete('/:id(\\d+)/', Authenticated, CheckRoles('admin'), AreaController.removeArea);

module.exports = router;