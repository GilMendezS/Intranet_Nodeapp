'use strict';
module.exports = (sequelize, DataTypes) => {
  const BUDGET = 2;
  const SALE = 3;
  const PROJECT = 4;
  const Type = sequelize.define('type', {
    name: DataTypes.STRING,
    title: DataTypes.STRING
  }, {});
  Type.associate = function(models) {
    // associations can be defined here
  };
  return Type;
};