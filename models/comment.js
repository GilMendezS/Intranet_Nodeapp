'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    comment: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    project_id: DataTypes.INTEGER
  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  
  return comment;
};