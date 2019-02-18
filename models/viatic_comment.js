'use strict';
module.exports = (sequelize, DataTypes) => {
  const viatic_comment = sequelize.define('viatic_comment', {
    user_id: DataTypes.INTEGER,
    viatic_id: DataTypes.INTEGER,
    comments: DataTypes.TEXT
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return viatic_comment;
};