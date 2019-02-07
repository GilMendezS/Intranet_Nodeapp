'use strict';
const sequelize = require('../api/utils/database');
const Department = sequelize.import(`${__dirname}/department`);
const Area = sequelize.import(`${__dirname}/area`);
module.exports = (sequelize, DataTypes) => {
  const Position = sequelize.define('position', {
    title: DataTypes.STRING,
    department_id: DataTypes.INTEGER,
    area_id: DataTypes.INTEGER,

  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  Position.associate = function(models) {
    // associations can be defined here
  };
  Position.belongsTo(Area, {foreignKey: 'area_id'});
  Position.belongsTo(Department, {foreignKey: 'department_id'});
  return Position;
};