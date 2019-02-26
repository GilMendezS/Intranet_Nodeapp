const router = require('express').Router();
const Authenticated = require('../middlewares/auth');
const ProjectController = require('../controllers/project');

router.post('/', [Authenticated],ProjectController.addProject);

router.get('/types', [Authenticated], ProjectController.getTypes);

router.get('/:id(\\d+)/', [Authenticated], ProjectController.getProject);

router.get('/byuser',[Authenticated], ProjectController.getProjectByUser);

router.put('/:id(\\d+)/', [Authenticated], ProjectController.updateProject);

router.post('/adduser/:id(\\d+)/', [Authenticated], ProjectController.addUserToProject);

router.get('/sales/datatable', [Authenticated], ProjectController.getActiveSales);

router.put('/:id(\\d+)/permissions', [Authenticated], ProjectController.modifyPermissions);

router.post('/removeuser/:id(\\d+)/', [Authenticated], ProjectController.removeUserFromProject);

router.get('/actives/datatable', [Authenticated], ProjectController.getActiveProjects);

router.get('/budgets/datatable', [Authenticated], ProjectController.getActiveBudgets);

router.get('/finished/datatable', [Authenticated], ProjectController.getFinishedProjects);


module.exports = router;