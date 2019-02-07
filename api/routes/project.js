const router = require('express').Router();

const ProjectController = require('../controllers/project');

router.post('/', ProjectController.addProject);

router.get('/:id', ProjectController.getProject);

router.get('/types', ProjectController.getTypes);

router.post('/adduser/:id', ProjectController.addUserToProject);

router.get('/sales/datatable', ProjectController.getActiveSales);

router.get('/actives/datatable', ProjectController.getActiveProjects);

router.get('/budgets/datatable', ProjectController.getActiveBudgets);

router.get('/finished/datatable', ProjectController.getFinishedProjects);


module.exports = router;