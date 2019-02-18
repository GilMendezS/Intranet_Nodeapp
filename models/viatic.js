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
  
  return viatic;
};