const router = require('express').Router();
const Authenticated = require('../middlewares/auth');
const ProjectController = require('../controllers/project');

router.post('/', ProjectController.addProject);

router.get('/types', ProjectController.getTypes);

router.get('/:id(\\d+)/', ProjectController.getProject);

router.get('/byuser',[Authenticated], ProjectController.getProjectByUser);

router.put('/:id(\\d+)/', ProjectController.updateProject);

router.post('/adduser/:id(\\d+)/', ProjectController.addUserToProject);

router.get('/sales/datatable', ProjectController.getActiveSales);

router.put('/:id(\\d+)//permissions', ProjectController.modifyPermissions);

router.post('/removeuser/:id(\\d+)/', ProjectController.removeUserFromProject);

router.get('/actives/datatable', ProjectController.getActiveProjects);

router.get('/budgets/datatable', ProjectController.getActiveBudgets);

router.get('/finished/datatable', ProjectController.getFinishedProjects);


module.exports = router;