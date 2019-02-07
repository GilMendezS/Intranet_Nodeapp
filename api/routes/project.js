const router = require('express').Router();

const ProjectController = require('../controllers/project');

router.get('/:id', ProjectController.getProject);

router.post('/', ProjectController.addProject);

router.get('/actives', ProjectController.getActiveProjects);

router.get('/sales', ProjectController.getActiveSales);

router.get('/budgets', ProjectController.getActiveBudgets);

router.get('/types', ProjectController.getTypes);

module.exports = router;