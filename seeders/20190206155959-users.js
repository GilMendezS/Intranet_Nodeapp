'use strict';
const bcrypt = require('bcrypt')
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
   return new Promise((solved, rejected) => {
      solved(true);
    });
    return queryInterface.bulkInsert('users', [
    //   {
    //     name: 'Admin ',
    //     lastname: "Viatics",
    //     email: "admin@mail.com",
    //     password: '$2b$12$NwBZM94YE0SKtNtOPdyvyert17QAF38QZYilmCt5rqxn4RHQ5uHy2',
    //     created_at: new Date(),
    //     updated_at: new Date()
    // }
  ], {});
  
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('users', null, {});
  }
};
