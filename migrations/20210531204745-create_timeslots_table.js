'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
        'timeslots',
        {
          id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
          },
          vanId: {
            type: Sequelize.BIGINT,
            references: {
              model: 'vans',
              key: 'id',
            },
            onDelete: 'SET NULL',
          },
          location: {
            type: Sequelize.GEOMETRY,
            allowNull: false,
          },
          address: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          sold: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false,
          },
          amount: {
            type: Sequelize.INTEGER,
            defaultValue: 20,
            allowNull: false,
          },
          discount: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            allowNull: false,
          },
          surcharge: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            allowNull: false,
          },
          startTime: {
            type: Sequelize.BIGINT,
            allowNull: false,
          },
          endTime: {
            type: Sequelize.BIGINT,
            allowNull: false,
          },
          createdAt: {
            type: Sequelize.DATE,
          },
          updatedAt: {
            type: Sequelize.DATE,
          },
        },
    );
    await queryInterface.addIndex('timeslots', ['vanId']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('timeslots');
  },
};
