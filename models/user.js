'use strict';
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    employee_number: DataTypes.STRING
  }, {
    instanceMethods: {
      hashPassword: function(){
        bcrypt.hash(this.password, 12, (err, hashed) => {
          if (err){
            throw new Error('Error hashing password')
          }
          else {
            this.password = hashed;
          }
        })
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  
  
  return User;
};