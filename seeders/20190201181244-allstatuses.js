'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('statuses', [
        //projects
        {
          name: 'inactive',
          title: 'Inactivo',
          for: 'projects',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'active',
          title: 'Activo',
          for: 'projects',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'terminated',
          title: 'Terminado',
          for: 'projects',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        //viatics
        {
          name: 'created',
          title: 'Creado',
          for: 'viatics',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'pending-deposit',
          title: 'Depósito pendiente',
          for: 'viatics',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'check-in-process',
          title: 'Comprobación en proceso',
          for: 'viatics',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'revision-pm',
          title: 'Revisión - PM',
          for: 'viatics',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'revision-reviewer',
          title: 'Revisión - Revisor',
          for: 'viatics',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'rejected',
          title: 'Rechazado',
          for: 'viatics',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'canceled',
          title: 'Cancelado',
          for: 'viatics',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'collection',
          title: 'Cobranza',
          for: 'viatics',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'pending-refund',
          title: 'Reembolso Pendiente',
          for: 'viatics',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'to-finalize',
          title: 'Por Finalizar',
          for: 'viatics',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'finished',
          title: 'Terminado',
          for: 'viatics',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'revision-refund',
          title: 'Revisión Reembolso',
          for: 'viatics',
          createdAt: new Date(),
          updatedAt: new Date()
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
    return queryInterface.bulkDelete('statuses', null, {});
  }
};
