'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users',
      'area_id',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'areas',
          key: 'id'
        }
      }
    ).then(() => {
      return queryInterface.addColumn(
        'users',
        'department_id',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'departments',
            key: 'id'
          }
        }
      )
    })
    .then(() => {
      queryInterface.addColumn(
        'users',
        'position_id',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'positions',
            key: 'id'
          }
        }
      )
    })
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'area_id')
      .then(() => {
        return queryInterface.removeColumn('users', 'department_id');  
      })
      .then(() => {
        return queryInterface.removeColumn('users', 'position_id')
      })
      
      
  
  }
};
