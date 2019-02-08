'use strict';
module.exports = (sequelize, DataTypes) => {
  const hour = sequelize.define('hour', {
    hours: DataTypes.INTEGER,
    in_time: DataTypes.BOOLEAN,
    date: DataTypes.DATE,
    activity: DataTypes.TEXT,
    comments: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    project_id: DataTypes.INTEGER,
    reg_user_id: DataTypes.INTEGER
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  hour.associate = function(models) {
    // associations can be defined here
  };
  return hour;
};