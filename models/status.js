'use strict';
module.exports = (sequelize, DataTypes) => {
  const PROJECTS = 'projects';
  const VIATICS = 'viatics';

  const ACTIVE = 2;
  const INACTIVE = 1;
  const FINISHED = 3;
  const Status = sequelize.define('status', {
    name: DataTypes.STRING,
    title: DataTypes.STRING,
    for: DataTypes.STRING
  }, {
    scopes: {
      projects: {
        where: {
          for: PROJECTS
        }
      },
      viatics: {
        where: {
          for: VIATICS
        }
      }
    },
    timestamps: false,
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  Status.associate = function(models) {
    // associations can be defined here
  };
  

  return Status;
};