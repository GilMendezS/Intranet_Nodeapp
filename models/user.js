'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
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
  User.prototype.checkPassword = function(candidatePassword) {
    console.log(this.password)
    return bcrypt.compare(candidatePassword, this.password);
  }
  User.prototype.getToken= function(){
    return jwt.sign({
      id: this.id,
      name: this.name,
      email: this.email,
      lastname: this.lastname,
      employee_number: this.employee_number
    },process.env.JWT_SECRET)
  }
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