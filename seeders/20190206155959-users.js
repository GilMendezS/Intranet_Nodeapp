'use strict';
const bcrypt = require('bcrypt')
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
    return queryInterface.bulkInsert('users', [{
        name: 'Admin ',
        lastname: "Viatics",
        email: "admin@mail.com",
        password: 'adminviatics',
        created_at: new Date(),
        updated_at: new Date()
    }], {});
  
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
