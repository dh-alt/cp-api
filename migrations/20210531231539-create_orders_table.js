'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
        'orders',
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
          timeslotId: {
            type: Sequelize.BIGINT,
            references: {
              model: 'timeslots',
              key: 'id',
            },
            onDelete: 'SET NULL',
          },
          userId: {
            type: Sequelize.BIGINT,
            references: {
              model: 'users',
              key: 'id',
            },
            onDelete: 'SET NULL',
          },
          promoCodeId: {
            type: Sequelize.BIGINT,
            references: {
              model: 'promo_codes',
              key: 'id',
            },
            onDelete: 'SET NULL',
          },
          firstname: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          lastname: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          phone: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          location: {
            type: Sequelize.GEOMETRY,
            allowNull: false,
          },
          address: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          status: {
            type: Sequelize.STRING,
            defaultValue: 'active',
            allowNull: false,
          },
          amount: {
            type: Sequelize.INTEGER,
            defaultValue: 20,
            allowNull: false,
          },
          promo_code: {
            type: Sequelize.STRING,
          },
          promo_discount: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
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
          paymentStatus: {
            type: Sequelize.STRING,
            defaultValue: 'unpaid',
            allowNull: false,
          },
          paymentIntentId: {
            type: Sequelize.STRING,
            defaultValue: '',
          },
          paymentAmount: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
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

    await queryInterface.addIndex('orders', ['paymentIntentId']);
    await queryInterface.addIndex('orders', ['vanId']);
    await queryInterface.addIndex('orders', ['promoCodeId']);
    await queryInterface.addIndex('orders', ['timeslotId']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('orders');
  },
};
