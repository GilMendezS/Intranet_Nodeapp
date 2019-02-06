'use strict';
const User = require('../api/models/models').User;
const Status = require('../api/models/models').Status;
const Type = require('../api/models/models').Type;
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
  });
  Project.associate = function(models) {
    // associations can be defined here
  };
  Project.belongsTo(User, {foreignKey: 'user_id'});
  Project.belongsTo(Status, {foreignKey: 'status_id'});
  
  return Project;
};