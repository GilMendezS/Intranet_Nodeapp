const path = require('path');
const sequelize = require('../utils/database');
const rootDir = require('../utils/path');

exports.User = sequelize.import(path.join(rootDir,'models','user'));
exports.Area = sequelize.import(path.join(rootDir,'models','area'));


