'use strict';
const sequelize = require('../api/utils/database');
const Department = sequelize.import(`${__dirname}/department`);
const Area = sequelize.import(`${__dirname}/area`);
module.exports = (sequelize, DataTypes) => {
  const Position = sequelize.define('Position', {
    title: DataTypes.STRING,
    AreaId: DataTypes.INTEGER,
    DepartmentId: DataTypes.INTEGER
  }, {});
  Position.associate = function(models) {
    // associations can be defined here
  };
  Position.belongsTo(Area, { as :'Area'});
  Position.belongsTo(Department, {as: 'Department'});
  return Position;
};