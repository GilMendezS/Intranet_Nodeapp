'use strict';
const User = require('../api/models/models').User;
const Status = require('../api/models/models').Status;
const Type = require('../api/models/models').Type;
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('project', {
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    client: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    StatusId: DataTypes.INTEGER,
    TypeId: DataTypes.INTEGER,
    budget: DataTypes.DECIMAL,
    money_spent: DataTypes.DECIMAL,
    money_refunded: DataTypes.DECIMAL
  }, {
    
  });
  Project.associate = function(models) {
    // associations can be defined here
  };
  Project.belongsTo(User, {as: 'User'});
  Project.belongsTo(Status, {as : 'Status'});
  
  return Project;
};