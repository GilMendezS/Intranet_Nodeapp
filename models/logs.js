'use strict';
module.exports = (sequelize, DataTypes) => {
  const logs = sequelize.define('logs', {
    user_id: {
      type:DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    description: DataTypes.STRING,
    resource: DataTypes.STRING,
    resource_id: DataTypes.INTEGER,
    ip: DataTypes.STRING
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return logs;
};