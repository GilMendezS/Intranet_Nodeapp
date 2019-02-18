'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('viatics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      project_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'projects',
          key: 'id'
        }
      },
      auth_user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      status_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'statuses',
          key: 'id'
        }
      },
      origin: {
        type: Sequelize.STRING,
        allowNull: false
      },
      destiny: {
        type: Sequelize.STRING,
        allowNull: false
      },
      departure: {
        type: Sequelize.DATE,
        allowNull: false
      },
      arrive: {
        type: Sequelize.DATE,
        allowNull: false
      },
      money_requested: {
        type: Sequelize.DECIMAL,
        default: 0.0
      },
      money_deposited: {
        type: Sequelize.DECIMAL,
        default: 0.0
      },
      money_checked: {
        type: Sequelize.DECIMAL,
        default: 0.0
      },
      money_refunded: {
        type: Sequelize.DECIMAL,
        default: 0.0
      },
      comments: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('viatics');
  }
};