'use strict';
module.exports = (sequelize, DataTypes) => {
  const BUDGET = 2;
  const SALE = 3;
  const PROJECT = 4;
  const Type = sequelize.define('type', {
    name: DataTypes.STRING,
    title: DataTypes.STRING
  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  return Type;
};