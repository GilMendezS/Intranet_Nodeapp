'use strict';
const sequelize = require('../api/utils/database');
const User = sequelize.import(`${__dirname}/user`);
const Area = sequelize.import(`${__dirname}/area`);
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    title: DataTypes.STRING
  }, {});
  Department.associate = function(models) {
    // associations can be defined here
  };
  Department.belongsTo(User, {as: 'Responsable'});
  Department.belongsTo(Area, {as: 'Area'});
  return Department;
};