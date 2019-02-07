'use strict';
const Project = require('../api/models/models').Project;
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
  
  return comment;
};