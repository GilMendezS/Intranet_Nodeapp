'use strict';
module.exports = (sequelize, DataTypes) => {
  const PROJECTS = 'projects';
  const VIATICS = 'viatics';
  const Status = sequelize.define('Status', {
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
    }
  });
  Status.associate = function(models) {
    // associations can be defined here
  };
  

  return Status;
};