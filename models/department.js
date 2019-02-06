'use strict';
const sequelize = require('../api/utils/database');
const User = sequelize.import(`${__dirname}/user`);
const Area = sequelize.import(`${__dirname}/area`);
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('department', {
    title: DataTypes.STRING
  }, {
    timestamps: false,
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  
  Department.belongsTo(User, {foreignKey: 'user_id'});
  Department.belongsTo(Area, {foreignKey: 'area_id'});
  return Department;
};