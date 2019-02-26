'use strict';
const path = require('path');
const rootDir = require('../api/utils/path');
const sequelize = require('../api/utils/database');
const User = sequelize.import(path.join(rootDir,'models','user'));
const Role = sequelize.import(path.join(rootDir,'models','role'));
module.exports = (sequelize, DataTypes) => {
  const viatic = sequelize.define('viatic', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull:false,
      references: {
        model: 'projects',
        key: 'id'
      }
    },
    auth_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'statuses',
        key: 'id'
      }
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    destiny: {
      type: DataTypes.STRING,
      allowNull: false
    },
    departure: {
      type: DataTypes.DATE,
      allowNull: false
    },
    arrive: {
      type: DataTypes.DATE,
      allowNull: false
    },
    money_requested: {
      type: DataTypes.DECIMAL,
      default: 0.0
    },
    money_deposited: {
      type: DataTypes.DECIMAL,
      default: 0.0
    },
    money_checked: {
      type: DataTypes.DECIMAL,
      default: 0.0
    },
    money_refunded: {
      type: DataTypes.DECIMAL,
      default: 0.0
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: true
    },
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  viatic.prototype.isCanceled = function(){
    return this.status_id == 10 ? true : false;
  }
  viatic.prototype.canBeEdited = function(){
    return this.status_id == 9 ? true : false;
  }
  viatic.prototype.approve = async function(req){
    const project = await this.getProject();
    
    const admin = await User.findOne({
        include: [{
            model: Role,
            as: 'roles',
            where: {
                name: 'admin'
            }
        }]
    })
    const revisor = await User.findOne({
        include: [{
            model: Role,
            as: 'roles',
            where: {
                name: 'revisor'
            }
        }]
    })
    const data = {
      message: 'Viatic authorized.',
      success: false
    }
    switch(this.status_id){
      case 4:
        this.status_id = 5;
        this.auth_user_id = admin.id;
        await this.save();
        data.success = true;
        return data;
        break;
      case 5:
        let money = 0.0;
        if(req.body.money_requested){
          money = req.body.money_requested;
        }
        this.status_id = 6;
        this.auth_user_id = null;
        this.money_deposited = money;
        data.success = true;
        await this.save();
        return data;
        break;
      case 6:
        let authorizator = 0;
        if (!req.user.roles.map(r => r.name).includes('supervisor')){
          let authorizator = project.user_id;
          if(req.user.id == project.user_id){
            if(req.user.area != null){
              authorizator = req.user.area.user_id;
            }
            else {
              authorizator = admin.id;
            }
          }
          this.status_id = 7;    
        }
        else {
          this.status_id = 8;
          this.auth_user_id = revisor.id;
        }
        data.message = 'Comprobation finished';
        data.success = true;
        await this.save();
        return data;
        break;
      case 7:
        this.status_id = 8;
        this.auth_user_id = revisor.id;
        data.message = 'Accepted Comprobation';
        data.success = true;
        await this.save();
        return data;
        break;
      case 8: 
        if(this.money_checked > this.money_deposited){
          this.status_id = 12;
          this.auth_user_id = admin.id;
        }
        else if(this.money_checked < this.money_deposited){
          this.status_id = 11;
          this.auth_user_id = null;
        }
        else {
          this.status_id = 14;
          this.auth_user_id = null;
        }
        data.message = 'Revision finished';
        data.success = true;
        await this.save();
        return data;
        break;
      case 12:
        data.message = 'Request Finished';
        money = parseFloat(this.money_checked) - parseFloat(this.money_deposited);
        if(money != req.body.money_requested){
          data.message = 'Incorrect ammount, Please put in the correct ammout. Thanks';
          data.success = false;
          return data;
        }
        this.auth_user_id  = 0;
        this.status_id = 14;
        this.money_refunded = req.body.money_requested;
        data.success = true;
        await this.save();
        return data;
        break;
      case 13:
        this.auth_user_id = 0;
        this.status_id = 14;
        data.message = 'Request finished';
        project.money_spent = project.money_spent + this.money_checked;
        await project.save();
        data.success = true;
        break;
      case 15:
        this.auth_user_id = 0;
        this.status_id = 14;
        project.money_spent = project.money_spent + this.money_checked;
        data.message = 'Request finished';
        await this.save();
        break;
    }
    return data;
  }
  viatic.prototype.deny = async function(){
    const data = {
      message: 'Rejected Request',
      success: false
    }
    switch(this.status_id){
      case 4:
        this.status_id = 9;
        this.auth_user_id = null;
        break;
      case 5: 
        this.status_id = 9;
        this.auth_user_id = null;
        break;
      case 7:
        this.status_id = 6;
        this.auth_user_id = null;
        data.message = 'Rejected comprobation';
        break;
      case 8:
        this.status_id = 6;
        this.auth_user_id = null;
        data.message = 'Rejected revision';
        break;
      case 15:
        this.status_id = 11;
        this.auth_user_id = null;
        data.message = 'Rejected revision';
        break;
    }
    try {
      await this.save();
      data.success = true;
      return data;
    } catch (error) {
      data.message = "Error updating the status";
      data.success = false;
      return data;
    }
  }
  return viatic;
};