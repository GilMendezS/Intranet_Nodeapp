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
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  
  User.beforeCreate((user, options) => {
    return bcrypt.hash(user.password, 12).then(hashedPw => {
      user.password = hashedPw;
    })
    .catch(err => {
      return new Error(err)
    });
  });
  
  
  return User;
};