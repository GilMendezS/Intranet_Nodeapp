const router = require('express').Router();

const ProjectController = require('../controllers/project');

router.get('/:id', ProjectController.getProject);

router.post('/', ProjectController.addProject);

router.get('/actives/datatable', ProjectController.getActiveProjects);

router.get('/sales/datatable', ProjectController.getActiveSales);

router.get('/budgets/datatable', ProjectController.getActiveBudgets);

router.get('/types', ProjectController.getTypes);

module.exports = router;