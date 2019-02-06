const router = require('express').Router();

const ProjectController = require('../controllers/project');

router.get('/', ProjectController.getProjects);

router.get('/types', ProjectController.getTypes);

module.exports = router;