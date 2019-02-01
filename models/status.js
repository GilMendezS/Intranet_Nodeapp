'use strict';
module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define('Status', {
    name: DataTypes.STRING,
    title: DataTypes.STRING,
    for: DataTypes.STRING
  }, {});
  Status.associate = function(models) {
    // associations can be defined here
  };
  return Status;
};