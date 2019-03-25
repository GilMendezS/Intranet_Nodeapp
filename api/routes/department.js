const router = require('express').Router();

const DepartmentController = require('../controllers/department');

const Authenticated = require('../middlewares/auth');

router.get('/', Authenticated, DepartmentController.getDepartments);

router.post('/', Authenticated,DepartmentController.addDepartment);

router.get('/:id(\\d+)/', Authenticated,DepartmentController.getDepartment);

router.put('/:id(\\d+)/', Authenticated, DepartmentController.updateDepartment);

router.delete('/:id(\\d+)/', Authenticated, DepartmentController.removeDepartment);

module.exports = router;