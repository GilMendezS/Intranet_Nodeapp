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
const Role = sequelize.import(path.join(rootDir,'models','role'));
const RoleUser = sequelize.import(path.join(rootDir,'models','role_user'));
const Viatic = sequelize.import(path.join(rootDir, 'models', 'viatic'));
const ViaticComment = sequelize.import(path.join(rootDir, 'models', 'viatic_comment'));
module.exports = class RelationShips {
    static createAssociations(){
        //users
        User.hasMany(Hour, {as: 'hours', foreignKey:'user_id'})
        User.hasMany(Project, {as: 'assigned_projects', foreignKey:'user_id'});
        User.belongsToMany(Project, {as: 'projects',through: Permissions, foreignKey: 'user_id', otherKey: 'project_id'})
        User.belongsToMany(Role, {as: 'roles',through: RoleUser, foreignKey: 'user_id', otherKey: 'role_id'});
        User.belongsTo(Area, {foreignKey:'area_id', as: 'area'});
        User.belongsTo(Department, {foreignKey:'department_id', as: 'department'});
        User.belongsTo(Position, {foreignKey: 'position_id', as: 'position'});
        //areas
        Area.belongsTo(User, {as: 'user',foreignKey:'user_id'});
        //comments
        Comment.belongsTo(User, {as: 'user', foreignKey:'user_id'});
        //department 
        Department.belongsTo(User, {foreignKey: 'user_id'});
        Department.belongsTo(Area, {foreignKey: 'area_id'});
        //positions
        Position.belongsTo(Area, {foreignKey: 'area_id'});
        Position.belongsTo(Department, {foreignKey: 'department_id'});
        //projects
        Project.Comments = Project.hasMany(Comment, {foreignKey:'project_id', as: 'comments'});
        Project.belongsTo(User, {foreignKey: 'user_id'});
        Project.belongsTo(Status, {foreignKey: 'status_id', as:'status'});
        Project.belongsTo(TypeProject, {foreignKey:'type_id', as: 'type'});
        Project.belongsToMany(User, { 
            as: 'users',
            through: Permissions, 
            foreignKey: 'project_id', otherKey: 'user_id'
          }
        )
        //hours
        Hour.belongsTo(User, {as: 'user', foreignKey:'user_id'});
        Hour.belongsTo(Project, {as: 'project', foreignKey:'project_id'});
        Hour.belongsTo(User, {as: 'project_manager', foreignKey: 'reg_user_id'});
        //viatics
        Viatic.belongsTo(Project, {foreignKey:'project_id', as:'project'});
        Viatic.belongsTo(User, {foreignKey: 'user_id', ax: 'user'});
        Viatic.belongsTo(User, {foreignKey:'auth_user_id', as: 'authorizator'});
        Viatic.belongsTo(Status, {foreignKey: 'status_id', as: 'status'});
        Viatic.hasMany(ViaticComment, {foreignKey: 'viatic_id', 'as': 'allcomments'});
        ViaticComment.belongsTo(User, {foreignKey: 'user_id', as: 'user'});
    }
}