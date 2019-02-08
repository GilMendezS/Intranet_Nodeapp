'use strict';
const User = require('../api/models/models').User;
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    comment: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    project_id: DataTypes.INTEGER
  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  comment.associate = function(models) {
    // associations can be defined here
  };
  comment.belongsTo(User, {as: 'user', foreignKey:'user_id'});
  return comment;
};