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
    timestamps: false,
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    
  });
  User.prototype.checkPassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  }
  User.prototype.getToken = async function(){
    return jwt.sign({
      id: this.id,
      name: this.name,
      email: this.email,
      lastname: this.lastname,
      employee_number: this.employee_number,
      area_id: this.area_id,
      department_id: this.department_id,
      position_id: this.position_id,
      roles: await this.getRoles()
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