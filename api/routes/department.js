const router = require('express').Router();

const DepartmentController = require('../controllers/department');

router.get('/', DepartmentController.getDepartments);

router.post('/', DepartmentController.addDepartment);

router.get('/:id', DepartmentController.getDepartment);

router.put('/:id', DepartmentController.updateDepartment);

router.delete('/:id', DepartmentController.removeDepartment);

module.exports = router;