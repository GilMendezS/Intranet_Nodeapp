'use strict';
module.exports = (sequelize, DataTypes) => {
  const Area = sequelize.define('Area', {
    title: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  Area.associate = function(models) {
    
  };
  return Area;
};