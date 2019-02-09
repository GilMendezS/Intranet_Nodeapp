'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return new Promise((solved, rejected) => {
      solved(true);
    });
    return queryInterface.bulkInsert('types', [
      // {
      //   name: 'budget',
      //   title: 'Centro de costos',
      //   created_at: new Date(),
      //   updated_at: new Date()
      // },
      // {
      //   name: 'sale',
      //   title: 'Preventa',
      //   created_at: new Date(),
      //   updated_at: new Date()
      // },
      // {
      //   name: 'project',
      //   title: 'Proyecto',
      //   created_at: new Date(),
      //   updated_at: new Date()
      // }
    
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('types', null, {});
  }
};
