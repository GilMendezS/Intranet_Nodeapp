'use strict';
const path = require('path');
const rootDir = require('../api/utils/path');
const sequelize = require('../api/utils/database');
const User = sequelize.import(path.join(rootDir,'models','user'));
const Status = require('../api/models/models').Status;
const Comment  = sequelize.import('./comment');
const Permissions = sequelize.import('./project_user');
const TypeProject = sequelize.import(path.join(rootDir,'models','type'));
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('project', {
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    client: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    status_id: DataTypes.INTEGER,
    type_id: DataTypes.INTEGER,
    budget: DataTypes.DECIMAL,
    money_spent: DataTypes.DECIMAL,
    money_refunded: DataTypes.DECIMAL,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
  Project.associate = function(models) {
    // associations can be defined here
  };
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
  return Project;
};