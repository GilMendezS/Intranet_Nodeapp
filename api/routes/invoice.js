const router = require('express').Router();

const AuthMiddleware = require('../middlewares/auth');

const InvoiceController = require('../controllers/invoice');

router.get('/concepts', AuthMiddleware, InvoiceController.getConcepts);

module.exports = router;