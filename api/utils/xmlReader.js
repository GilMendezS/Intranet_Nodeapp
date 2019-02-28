const fs = require('fs');
const path = require('path');
const moment = require('moment');
const rootDir = require('./path');
const xmlToJson = require('xml2json');
const Rfc = require('../models/models').Rfc;
const Invoice = require('../models/models').Invoice;
exports.readFile = (filename) => {
    const xmlFile = path.join(rootDir,filename);
    return new Promise((solved, rejected) => {
        fs.readFile(xmlFile,{ encoding: 'utf-8' }, (err, data) => {
            if(err){
                rejected(err)
            }
            const jsonData = xmlToJson.toJson(data, { object : true, coerce: true});
            solved(jsonData)
        })
    })
}
exports.getJsonData = data => {
    return new Promise(async (solved,rejected) => {
        try {
            const info = {};
            if(data['cfdi:Comprobante'] || data['cfdi:comprobante']){
                if(data['cfdi:Comprobante']['cfdi:Receptor']){
                    if(data['cfdi:Comprobante']['cfdi:Receptor']['Rfc']){
                        info.rfc = data['cfdi:Comprobante']['cfdi:Receptor']['Rfc'];
                    }
                    else if(data['cfdi:Comprobante']['cfdi:Receptor']['rfc']){
                        info.rfc = data['cfdi:Comprobante']['cfdi:Receptor']['rfc']
                    }
                    else {
                        rejected('RFc not found');
                    }
                    const rfc = await Rfc.findOne({where: {rfc: info.rfc}});
                    if(!rfc){
                        rejected(`Rfc '${info.rfc}' no es válido para la empresa`)
                    }
                    info.rfc_validated = rfc;
                    
                }
                if(data['cfdi:Comprobante']['cfdi:Complemento']  
                    && data['cfdi:Comprobante']['cfdi:Complemento']['tfd:TimbreFiscalDigital']
                    && data['cfdi:Comprobante']['cfdi:Complemento']['tfd:TimbreFiscalDigital']['UUID']){
                        info.uuid = data['cfdi:Comprobante']['cfdi:Complemento']['tfd:TimbreFiscalDigital']['UUID'];
                    }
                else {
                    rejected('UUUID de factura no fue encontrada.')
                }
                const existsInvoice = await Invoice.findOne({where: {uuid: info.uuid}});
                if(existsInvoice){
                    rejected('Esta factura ya fue dada de alta en el sistema.');
                }
                if(data['cfdi:Comprobante']['Folio']){
                    info.folio = data['cfdi:Comprobante']['Folio'];
                }
                else if(data['cfdi:Comprobante']['folio']){
                    info.folio = data['cfdi:Comprobante']['folio'];
                }
                else {
                    info.folio = 0;
                }
                if(data['cfdi:Comprobante']['Fecha']){
                    info.date = data['cfdi:Comprobante']['Fecha']
                }
                else if (data['cfdi:Comprobante']['fecha']){
                    info.date = data['cfdi:Comprobante']['fecha']
                }
                else {
                    rejected('Fecha de la factura no encontrada');
                }
                info.date = moment(info.date).format('YYYY-MM-DD');
    
                //pending to validate since what date user can add invoices : TODO
                if(data['cfdi:Comprobante']['cfdi:Receptor']){
                    if(data['cfdi:Comprobante']['cfdi:Receptor']['Rfc']){
                        info.company_rfc = data['cfdi:Comprobante']['cfdi:Receptor']['Rfc'];
                    }
                    else if(data['cfdi:Comprobante']['cfdi:Receptor']['rfc']){
                        info.company_rfc = data['cfdi:Comprobante']['cfdi:Receptor']['rfc']
                    }
                    else {
                        rejected('RFc not found');
                    }
                    const rfc = await Rfc.findOne({where: {rfc: info.rfc}});
                    if(!rfc){
                        rejected(`Rfc '${info.rfc}' no es válido para la empresa`)
                    }
                    if(data['cfdi:Comprobante']['cfdi:Emisor']['Nombre']){
                        info.company_name = data['cfdi:Comprobante']['cfdi:Emisor']['Nombre'];
                    }
                    else if(data['cfdi:Comprobante']['cfdi:Emisor']['nombre']){
                        info.company_name = data['cfdi:Comprobante']['cfdi:Emisor']['nombre']
                    }
                    else {
                        info.company_name = 'Emisor desconocido';
                    }

                    
                }
                if(data['cfdi:Comprobante']['SubTotal']){
                    info.subtotal = data['cfdi:Comprobante']['SubTotal'];
                }
                else if(data['cfdi:Comprobante']['subTotal']){
                    info.subtotal = data['cfdi:Comprobante']['subTotal'];
                }
                else {
                    rejected('Subtotal no encontrado en el archivo xml');
                }
                if(data['cfdi:Comprobante']['cfdi:Impuestos']['TotalImpuestosTrasladados']){
                    info.iva = data['cfdi:Comprobante']['cfdi:Impuestos']['TotalImpuestosTrasladados'];
                }
                else if(data['cfdi:Comprobante']['cfdi:Impuestos']['totalImpuestosTrasladados']){
                    info.iva = data['cfdi:Comprobante']['cfdi:Impuestos']['totalImpuestosTrasladados'];
                }
                else if(data['cfdi:Comprobante']['cfdi:Impuestos']['cfdi:Traslados']){
                    if(data['cfdi:Comprobante']['cfdi:Impuestos']['cfdi:Traslados']['cfdi:Traslado']){
                        info.iva = data['cfdi:Comprobante']['cfdi:Impuestos']['cfdi:Traslados']['cfdi:Traslado']
                    }
                    else if(data['cfdi:Comprobante']['cfdi:Impuestos']['cfdi:Traslados']['cfdi:traslado']){
                        info.iva = data['cfdi:Comprobante']['cfdi:Impuestos']['cfdi:Traslados']['cfdi:traslado'];
                    }
                }
                else {
                    info.iva = 0.0;
                }
                if(data['cfdi:Comprobante']['Total']){
                    info.total = data['cfdi:Comprobante']['Total'];
                }
                else if(['cfdi:Comprobante']['total']){
                    info.tota =data['cfdi:Comprobante']['total'];
                }
                else {
                    rejected('Total de la facturar no fue encontrada');
                }
            }
            else {
                rejected('No se pudo procesar los datos de archivo xml');
            }

            solved(info);
        } catch (error) {
            console.log(error)
            rejected(error)
        }
    })
    
}   

