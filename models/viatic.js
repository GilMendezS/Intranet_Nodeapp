'use strict';
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
      allowNull: false,
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
      allowNull: false
    },
    money_deposited: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    money_checked: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    money_refunded: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: true
    },
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  viatic.prototype.enoughBudget = function(money= 0.0){
    if (money > 0){
      const sum = this.budget + money;
      return sum <= this.budget ? true : false;
    }
    return true;
  }
  return viatic;
};