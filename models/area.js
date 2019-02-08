'use strict';
module.exports = (sequelize, DataTypes) => {
  const Area = sequelize.define('area', {
    title: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  return Area;
};