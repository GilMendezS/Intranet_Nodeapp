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
        allowNull: false,
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
        allowNull: false
      },
      money_deposited: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      money_checked: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      money_refunded: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      comments: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('viatics');
  }
};