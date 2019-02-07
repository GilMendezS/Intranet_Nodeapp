const router = require('express').Router();

const ProjectController = require('../controllers/project');

router.post('/', ProjectController.addProject);

router.get('/:id(\\d+)/', ProjectController.getProject);

router.get('/types', ProjectController.getTypes);

router.post('/adduser/:id(\\d+)/', ProjectController.addUserToProject);

router.get('/sales/datatable', ProjectController.getActiveSales);

router.put('/:id(\\d+)//permissions', ProjectController.modifyPermissions);

router.post('/removeuser/:id(\\d+)/', ProjectController.removeUserFromProject);

router.get('/actives/datatable', ProjectController.getActiveProjects);

router.get('/budgets/datatable', ProjectController.getActiveBudgets);

router.get('/finished/datatable', ProjectController.getFinishedProjects);


module.exports = router;