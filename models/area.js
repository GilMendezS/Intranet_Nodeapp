'use strict';
const sequelize = require('../api/utils/database');
const User = sequelize.import(__dirname+"/user");
module.exports = (sequelize, DataTypes) => {
  const Area = sequelize.define('area', {
    title: DataTypes.STRING,
  }, {});
  Area.belongsTo(User, {as : 'User'})
  return Area;
};