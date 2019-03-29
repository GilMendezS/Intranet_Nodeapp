const router = require('express').Router();

const CheckRoles = require('../middlewares/role');

const Authenticated = require('../middlewares/auth');

const DepartmentController = require('../controllers/department');

router.get('/', Authenticated, DepartmentController.getDepartments);

router.post('/', Authenticated, CheckRoles('admin'), DepartmentController.addDepartment);

router.get('/:id(\\d+)/', Authenticated, DepartmentController.getDepartment);

router.put('/:id(\\d+)/', Authenticated, CheckRoles('admin'), DepartmentController.updateDepartment);

router.delete('/:id(\\d+)/', Authenticated, CheckRoles('admin'), DepartmentController.removeDepartment);

module.exports = router;