'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('invoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      viatic_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'viatics',
          key: 'id'
        }
      },
      project_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'projects',
          key: 'id'
        }
      },
      rfc_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'rfcs',
          key: 'id'
        }
      },
      concept_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'concepts',
          key: 'id'
        }
      },
      path_xml: {
        type: Sequelize.STRING,
        allowNull: true
      },
      path_pdf: {
        type: Sequelize.STRING,
        allowNull: true,

      },
      uuid: {
        type: Sequelize.STRING,
        allowNull: true,

      },
      folio: {
        type: Sequelize.STRING,
        allowNull: true,

      },
      date: {
        type: Sequelize.DATE,
        allowNull: true,

      },
      deductible: {
        type: Sequelize.INTEGER
      },
      company_rfc: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      company_name: {
        type: Sequelize.STRING,
        allowNull: true,

      },
      subtotal: {
        type: Sequelize.DECIMAL,
        allowNull: true,

      },
      iva: {
        type: Sequelize.DECIMAL,
        allowNull: true,

      },
      total: {
        type: Sequelize.DECIMAL,
        allowNull: true,

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
    return queryInterface.dropTable('invoices');
  }
};