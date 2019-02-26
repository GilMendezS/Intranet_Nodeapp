'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return new Promise((solved, rejected) => {
      solved(true);
    });
    return queryInterface.bulkInsert('role_users', [
      {
        user_id: 1,
        role_id: 1,
        created_at: new Date(),
        updated_at : new Date()
      },
      {
        user_id: 1,
        role_id: 2,
        created_at: new Date(),
        updated_at : new Date()
      },
      {
        user_id: 1,
        role_id: 3,
        created_at: new Date(),
        updated_at : new Date()
      },
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
