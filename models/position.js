'use strict';
module.exports = (sequelize, DataTypes) => {
  const Position = sequelize.define('Position', {
    title: DataTypes.STRING,
    AreaId: DataTypes.INTEGER,
    DepartmentId: DataTypes.INTEGER
  }, {});
  Position.associate = function(models) {
    // associations can be defined here
  };

  return Position;
};