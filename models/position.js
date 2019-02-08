'use strict';
module.exports = (sequelize, DataTypes) => {
  const Position = sequelize.define('position', {
    title: DataTypes.STRING,
    department_id: DataTypes.INTEGER,
    area_id: DataTypes.INTEGER,

  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });  
  return Position;
};