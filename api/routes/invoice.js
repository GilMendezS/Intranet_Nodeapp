const router = require('express').Router();

const AuthMiddleware = require('../middlewares/auth');

const FilesHandler = require('../utils/filesHandler');

const InvoiceController = require('../controllers/invoice');

router.get('/concepts', AuthMiddleware, InvoiceController.getConcepts);

router.get('/viatic/:id(\\d+)/', InvoiceController.getInvoicesByViatic);

router.post('/adddeductible',
    FilesHandler.fields([
        {
            name: 'pdf', maxCount: 1
        },
        {
            name: 'xml', maxCount: 1
        }
    ]),
    InvoiceController.addDeductible);

router.post('/addnodeductible', FilesHandler.fields([{
    name:'pdf', maxCount: 1
}]), InvoiceController.addNoDeductible);

module.exports = router;