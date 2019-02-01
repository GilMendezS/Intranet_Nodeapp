const router = require('express').Router();

const StatusController = require('../controllers/status');

router.get('/projects', StatusController.getStatusProjects);

router.get('/viatics', StatusController.getStatusViatics);

module.exports = router;