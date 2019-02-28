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
        const newInvoice = await Invoice.create({
            viatic_id : req.body.viatic_id,
            uuid: xmlInfo.uuid,
            concept_id: req.body.concept_id,
            path_xml: req.files.xml[0].path,
            path_pdf: req.files.pdf[0].path,
            rfc_id : xmlInfo.rfc_validated.id,
            deductible: 1,
            folio: xmlInfo.folio,
            date: xmlInfo.date,
            company_rfc: xmlInfo.company_rfc,
            company_name: xmlInfo.company_name,
            subtotal: xmlInfo.subtotal,
            total: xmlInfo.total,
            iva: xmlInfo.iva,
            comments: req.body.comments
        })
        const viatic = await Viatic.findByPk(req.body.viatic_id);
        if(!viatic){
            return res.status(500).json({
                message: 'Ha surgido un error vuelve a intentarlo'
            })
        }
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
        const newInvoice = await Invoice.create({
            viatic_id: req.body.viatic_id,
            concept_id: req.body.concept_id,
            path_pdf: req.files.pdf[0].path,
            date: moment(req.body.date).format('YYYY-MM-DD'),
            deductible: 0,
            company_name: req.body.name,
            total: req.body.total,
            comments: req.body.comments
        })
        const viatic = await Viatic.findByPk(req.body.viatic_id);
        if(!viatic){
            return res.status(500).json({
                message: 'Ha surgido un error vuelve a intentarlo'
            })
        }
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