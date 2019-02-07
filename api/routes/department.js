const router = require('express').Router();

const DepartmentController = require('../controllers/department');

router.get('/', DepartmentController.getDepartments);

router.post('/', DepartmentController.addDepartment);

router.get('/:id(\\d+)/', DepartmentController.getDepartment);

router.put('/:id(\\d+)/', DepartmentController.updateDepartment);

router.delete('/:id(\\d+)/', DepartmentController.removeDepartment);

module.exports = router;