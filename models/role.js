'use strict';
module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define('role', {
    name: DataTypes.STRING,
    title: DataTypes.STRING
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return role;
};