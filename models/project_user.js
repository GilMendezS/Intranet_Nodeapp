'use strict';
module.exports = (sequelize, DataTypes) => {
  const project_user = sequelize.define('project_user', {
    project_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    can_add_viatics: DataTypes.BOOLEAN,
    can_add_hours: DataTypes.BOOLEAN
  }, {});
  project_user.associate = function(models) {
    // associations can be defined here
  };
  return project_user;
};