'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('types', [
      {
        name: 'budget',
        title: 'Centro de costos',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'sale',
        title: 'Preventa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'project',
        title: 'Proyecto',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('types', null, {});
  }
};
