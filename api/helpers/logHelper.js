const Log = require('../models/models').Log;
class LogHelper {
    static write(user_id='',description='',resource='', resource_id=''){
        return Log.create({
            user_id: user_id,
            description: description,
            resource: resource,
            resource_id: resource_id,
        })
    }
}
module.exports = LogHelper;