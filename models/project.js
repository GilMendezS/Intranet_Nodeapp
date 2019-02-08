'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('project', {
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    client: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    status_id: DataTypes.INTEGER,
    type_id: DataTypes.INTEGER,
    budget: DataTypes.DECIMAL,
    money_spent: DataTypes.DECIMAL,
    money_refunded: DataTypes.DECIMAL,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
 
  return Project;
};