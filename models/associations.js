const path = require('path');
const rootDir = require('../api/utils/path');
const sequelize = require('../api/utils/database');
const User = sequelize.import(path.join(rootDir,'models','user'));
const Hour = sequelize.import(path.join(rootDir,'models','hour'));
const Area = sequelize.import(path.join(rootDir,'models','area'));
const Comment = sequelize.import(path.join(rootDir,'models','comment'));
const Department = sequelize.import(path.join(rootDir,'models','department'));
const Position = sequelize.import(path.join(rootDir,'models','position'));
const Project = sequelize.import(path.join(rootDir,'models','project'));
const Status = sequelize.import(path.join(rootDir,'models','status'));
const TypeProject = sequelize.import(path.join(rootDir,'models','type'));
const Permissions = sequelize.import(path.join(rootDir,'models','project_user'));
module.exports = class RelationShips {
    static createAssociations(){
        User.hasMany(Hour, {as: 'hours', foreignKey:'user_id'})
        Area.belongsTo(User, {as: 'user',foreignKey:'user_id'});
        Comment.belongsTo(User, {as: 'user', foreignKey:'user_id'});
        Department.belongsTo(User, {foreignKey: 'user_id'});
        Department.belongsTo(Area, {foreignKey: 'area_id'});
        Position.belongsTo(Area, {foreignKey: 'area_id'});
        Position.belongsTo(Department, {foreignKey: 'department_id'});
        Project.Comments = Project.hasMany(Comment, {foreignKey:'project_id', as: 'comments'});
        Project.belongsTo(User, {foreignKey: 'user_id'});
        Project.belongsTo(Status, {foreignKey: 'status_id', as:'status'});
        Project.belongsTo(TypeProject, {foreignKey:'type_id', as: 'type'});
        Project.belongsToMany(User, { 
            as: 'users',
            through: Permissions, 
            foreignKey: 'user_id', otherKey: 'project_id'
          }
        )
        Hour.belongsTo(User, {as: 'user', foreignKey:'user_id'});
        Hour.belongsTo(Project, {as: 'project', foreignKey:'project_id'});
        Hour.belongsTo(User, {as: 'project_manager', foreignKey: 'reg_user_id'});
    }
}