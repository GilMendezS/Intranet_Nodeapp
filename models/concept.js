'use strict';
module.exports = (sequelize, DataTypes) => {
  const concept = sequelize.define('concept', {
    title: DataTypes.STRING
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return concept;
};