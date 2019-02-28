'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'projects',
      'valid_date_for_invoices',
      {
        type: Sequelize.DATE,
        allowNull: true, 
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('projects', 'valid_date_for_invoices');  
  }
};
