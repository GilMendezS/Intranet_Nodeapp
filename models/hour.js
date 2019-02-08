'use strict';
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('hour', {
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
};