const path = require('path');
const sequelize = require('../utils/database');
const rootDir = require('../utils/path');

exports.User = sequelize.import(path.join(rootDir,'models','user'));
exports.Area = sequelize.import(path.join(rootDir,'models','area'));
exports.Department = sequelize.import(path.join(rootDir,'models','department'));
exports.Position = sequelize.import(path.join(rootDir,'models','position'));
exports.Status = sequelize.import(path.join(rootDir,'models','status'));
exports.Project = sequelize.import(path.join(rootDir,'models','project'));
exports.Type = sequelize.import(path.join(rootDir,'models','type'));
exports.Comment = sequelize.import(path.join(rootDir,'models','comment'));
exports.Permissions = sequelize.import(path.join(rootDir,'models','project_user'));
exports.Hour = sequelize.import(path.join(rootDir,'models','hour'));
exports.Viatic = sequelize.import(path.join(rootDir ,'models', 'viatic'));
exports.ViaticComment = sequelize.import(path.join(rootDir ,'models', 'viatic_comment'));
exports.Role = sequelize.import(path.join(rootDir ,'models', 'role'));
exports.Concept = sequelize.import(path.join(rootDir ,'models', 'concept'));