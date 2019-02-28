const moment = require('moment');
const Viatic = require('../models/models').Viatic;
const Concept = require('../models/models').Concept;
const Invoice = require('../models/models').Invoice;
const xmlReader = require('../utils/xmlReader');
exports.getConcepts = async (req, res, next ) => {
    try {
        const concepts = await Concept.findAll();
        return res.status(200).json({
            success:true,
            data: concepts
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching the concepts',
            success: false,
            error
        });
    }
}
exports.addDeductible = async (req, res, next) => {
    try {
        const dataXml = await xmlReader.readFile(req.files.xml[0].path);
        const xmlInfo  = await xmlReader.getJsonData(dataXml);

        const viatic = await Viatic.findByPk(req.body.viatic_id);
        const candidate_date = moment(xmlInfo.date).format('YYYY-MM-DD');
        if(!viatic){
            return res.status(500).json({
                message: 'Ha surgido un error vuelve a intentarlo'
            })
        }
        const project = viatic.getProject();
        if(project.invalidDateForInvoice(candidate_date)){
            return res.status(422).json({
                message: 'La fecha válida para comprobaciones no es válida',
                success: false
            })
        }
        const newInvoice = await Invoice.create({
            viatic_id : req.body.viatic_id,
            uuid: xmlInfo.uuid,
            concept_id: req.body.concept_id,
            path_xml: req.files.xml[0].path,
            path_pdf: req.files.pdf[0].path,
            rfc_id : xmlInfo.rfc_validated.id,
            deductible: 1,
            folio: xmlInfo.folio,
            date: candidate_date,
            company_rfc: xmlInfo.company_rfc,
            company_name: xmlInfo.company_name,
            subtotal: xmlInfo.subtotal,
            total: xmlInfo.total,
            iva: xmlInfo.iva,
            comments: req.body.comments
        })
        viatic.money_checked = parseFloat(viatic.money_checked) + parseFloat(xmlInfo.total);
        await viatic.save();
        return res.status(200).json({
            message: 'Invoice saved',
            success: true,
            data: newInvoice
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error guardando el comprobante',
            error,
            success: false
        })
        
    }
} 
exports.addNoDeductible = async (req, res, next) => {
    try {
        const viatic = await Viatic.findByPk(req.body.viatic_id);
        const candidate_date = moment(req.body.date).format('YYYY-MM-DD');
        if(!viatic){
            return res.status(500).json({
                message: 'Ha surgido un error vuelve a intentarlo'
            })
        }
        const project = viatic.getProject();
        if(project.invalidDateForInvoice(candidate_date)){
            return res.status(422).json({
                message: 'La fecha válida para comprobaciones no es válida',
                success: false
            })
        }
        const newInvoice = await Invoice.create({
            viatic_id: req.body.viatic_id,
            concept_id: req.body.concept_id,
            path_pdf: req.files.pdf[0].path,
            date: candidate_date,
            deductible: 0,
            company_name: req.body.name,
            total: req.body.total,
            comments: req.body.comments
        })
        viatic.money_checked = parseFloat(viatic.money_checked) + parseFloat(req.body.total);
        await viatic.save();
        return res.status(200).json({
            message: 'Comprobante agregado con éxito',
            success: true,
            data: newInvoice
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error guardando el comprobrante',
            success: false,
            error
        })
    }
}
exports.getInvoicesByViatic = async (req, res, next) => {
    try {
        const viaticId = req.params.id;
        const invoices = await Invoice.findAll({
            where: {
                viatic_id: viaticId
            }
        });
        return res.status(200).json({
            data: invoices,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error cargando las comprobraciones',
            success: false
        });
    }
}
exports.getInvoicePdfFile = async (req, res, next) => {
    try {
        const invoiceId = req.params.id;
        const invoice = await Invoice.findByPk(invoiceId);
        return res.download(invoice.path_pdf);
    } catch (error) {
        return res.status(404);
    }
}
exports.getInvoiceXmlFile = async (req, res, next) => {
    try {
        const invoiceId = req.params.id;
        const invoice = await Invoice.findByPk(invoiceId);
        return res.download(invoice.path_xml);
    } catch (error) {
        return res.status(404);
    }
}