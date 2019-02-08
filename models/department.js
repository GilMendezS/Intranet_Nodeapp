'use strict';
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('department', {
    title: DataTypes.STRING
  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  return Department;
};