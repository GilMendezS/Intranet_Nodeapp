const router = require('express').Router();

const AuthController = require('../controllers/auth');

router.post('/login', AuthController.postLogin);

module.exports = router;