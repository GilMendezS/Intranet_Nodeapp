const router = require('express').Router();

const AuthMiddleware = require('../middlewares/auth');

const FilesHandler = require('../utils/filesHandler');

const InvoiceController = require('../controllers/invoice');

router.get('/concepts', AuthMiddleware, InvoiceController.getConcepts);

router.get('/viatic/:id(\\d+)/', AuthMiddleware, InvoiceController.getInvoicesByViatic);

router.post('/adddeductible',AuthMiddleware ,
    FilesHandler.fields([
        {
            name: 'pdf', maxCount: 1
        },
        {
            name: 'xml', maxCount: 1
        }
    ]),
    InvoiceController.addDeductible);

router.post('/addnodeductible',AuthMiddleware, FilesHandler.fields([{
    name:'pdf', maxCount: 1
}]), InvoiceController.addNoDeductible);
router.get('/:id(\\d+)/download/pdf',AuthMiddleware ,InvoiceController.getInvoicePdfFile);
router.get('/:id(\\d+)/download/xml',AuthMiddleware ,InvoiceController.getInvoiceXmlFile);
module.exports = router;