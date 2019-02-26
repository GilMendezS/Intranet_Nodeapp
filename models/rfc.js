'use strict';
module.exports = (sequelize, DataTypes) => {
  const rfc = sequelize.define('rfc', {
    rfc: DataTypes.STRING,
    title: DataTypes.STRING
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return rfc;
};