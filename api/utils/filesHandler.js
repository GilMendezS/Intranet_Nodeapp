const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'./storage/invoices');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname)
    }
})
const fileFilter = (req, file, cb) => {
    if(file.fieldname == 'pdf'){
        if (file.mimetype === 'application/pdf'){
            cb(null, true)
        }
        else {
            return cb(null, false)
        }
    }
    else if(file.fieldname == 'xml'){
        if (file.mimetype === 'application/xml' || file.mimetype == 'text/xml'){
            cb(null, true)
        }
        else {
            return cb(null, false)
        }
    }
    
}
const upload = multer({
    storage,
    limits: {
        fileSize : 1024 * 1024 * 5
    },
    fileFilter
})
module.exports = upload;