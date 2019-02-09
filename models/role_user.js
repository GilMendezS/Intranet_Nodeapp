'use strict';
module.exports = (sequelize, DataTypes) => {
  const role_user = sequelize.define('role_user', {
    role_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return role_user;
};