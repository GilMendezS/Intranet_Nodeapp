'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('concepts', [
      {
        title: 'Caseta',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Consumo',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Otros',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Consumibles equipo',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Estacionamiento',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Gasolina',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Hospedaje',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Propina',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Transporte',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Vuelo',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
