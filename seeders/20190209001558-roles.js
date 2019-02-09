'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('roles', [
      {
        name: 'admin',
        title: 'Adminisrador',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'supervisor',
        title: 'Supervisor',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'revisor',
        title: 'Revisor',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'engineer',
        title: 'Ingeniero',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'super-pm',
        title: 'Jefe de Project Managers',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'pm',
        title: 'Project Manager',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'commercial',
        title: 'Comercial',
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
