'use strict';
const sequelize = require('../api/utils/database');
const User = sequelize.import(__dirname+"/user");
module.exports = (sequelize, DataTypes) => {
  const Area = sequelize.define('area', {
    title: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  
  Area.belongsTo(User, {foreignKey:'user_id'});
  return Area;
};