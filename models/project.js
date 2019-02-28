'use strict';
const moment = require('moment');
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
  Project.prototype.enoughBudget = function(money= 0.0){
    if (money > 0){
      const sum = parseFloat(this.money_spent) + parseFloat(money);
      return sum <= this.budget ? true : false;
    }
    return true;
  }
  Project.prototype.reduceBudget = function(money_spent= 0.0){
    this.money_spent =parseFloat(this.money_spent) +  parseFloat(money_spent);
    this.save();
  }
  Project.prototype.invalidDateForInvoice = function(date){
    return moment(date).isBefore(this.valid_date_for_invoices);
  }
  return Project;
};