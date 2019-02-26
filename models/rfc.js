'use strict';
module.exports = (sequelize, DataTypes) => {
  const rfc = sequelize.define('rfc', {
    rfc: DataTypes.STRING,
    title: DataTypes.STRING,
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return rfc;
};