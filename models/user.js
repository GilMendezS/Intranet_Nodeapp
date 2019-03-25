'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    employee_number: DataTypes.STRING,
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    area_id: {
      type: DataTypes.INTEGER
    },
    department_id: {
      type: DataTypes.INTEGER
    },
    position_id: {
      type: DataTypes.INTEGER
    }
  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    hooks: {

    }
  });
  User.prototype.checkPassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  }
  User.prototype.hasRole = function(role){
    return this.roles.map( r => r.name).includes(role);
  }
  User.prototype.hasAnyRole= function(roles){
    return roles.map(r => r.name).some( r => this.roles.includes(r));
  }
  User.prototype.getToken = async function(){
    return jwt.sign({
      id: this.id,
      name: this.name,
      email: this.email,
      lastname: this.lastname,
      employee_number: this.employee_number,
      active: this.active,
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
  User.beforeUpdate((user, options) => {
      
      if (options.fields.includes('password')) {
        
        return bcrypt.hash(user.password, 12).then(hashedPw => {
          user.password = hashedPw;
        })
        .catch(err => {
          return new Error(err)
        });
      }

  });
  
  return User;
};