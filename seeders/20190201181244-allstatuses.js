'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('statuses', [
        //projects
        {
          name: 'inactive',
          title: 'Inactivo',
          for: 'projects',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'active',
          title: 'Activo',
          for: 'projects',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'terminated',
          title: 'Terminado',
          for: 'projects',
          created_at: new Date(),
          updated_at: new Date()
        },
        //viatics
        {
          name: 'created',
          title: 'Creado',
          for: 'viatics',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'pending-deposit',
          title: 'Depósito pendiente',
          for: 'viatics',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'check-in-process',
          title: 'Comprobación en proceso',
          for: 'viatics',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'revision-pm',
          title: 'Revisión - PM',
          for: 'viatics',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'revision-reviewer',
          title: 'Revisión - Revisor',
          for: 'viatics',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'rejected',
          title: 'Rechazado',
          for: 'viatics',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'canceled',
          title: 'Cancelado',
          for: 'viatics',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'collection',
          title: 'Cobranza',
          for: 'viatics',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'pending-refund',
          title: 'Reembolso Pendiente',
          for: 'viatics',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'to-finalize',
          title: 'Por Finalizar',
          for: 'viatics',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'finished',
          title: 'Terminado',
          for: 'viatics',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'revision-refund',
          title: 'Revisión Reembolso',
          for: 'viatics',
          created_at: new Date(),
          updated_at: new Date()
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
