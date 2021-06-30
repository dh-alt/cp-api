const {roles} = require('../config/roles');
const {Sequelize, sequelize, Op, DataTypes, Model} = require('../config/db');

const { User, Van, PromoCode, Timeslot } = require('../models');

class Order extends Model {
  toString() {
    return JSON.stringify(this);
  }
}

Order.init({
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  vanId: {
    type: DataTypes.BIGINT,
    references: {
      model: Van,
      key: 'id',
    },
    onDelete: 'SET NULL',
  },
  timeslotId: {
    type: DataTypes.BIGINT,
    references: {
      model: Timeslot,
      key: 'id',
    },
    onDelete: 'SET NULL',
  },
  userId: {
    type: DataTypes.BIGINT,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'SET NULL',
  },
  promoCodeId: {
    type: DataTypes.BIGINT,
    references: {
      model: PromoCode,
      key: 'id',
    },
    onDelete: 'SET NULL',
  },
  location: {
    type: DataTypes.GEOMETRY,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isAlpha: true,
    },
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isAlpha: true,
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'active'
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 20,
  },
  promoDiscount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  promoCode: {
    type: DataTypes.STRING,
  },
  discount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  surcharge: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  startTime: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  endTime: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  paymentStatus: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'unpaid'
  },
  paymentIntentId: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  paymentAmount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  tableName: 'orders', // explicit table name
  timestamps: true,
  sequelize, // We need to pass the connection instance
  modelName: 'Order', // We need to choose the model name
});

Order.associate = function(models) {
    Order.belongsTo(PromoCode, {foreignKey: 'promoCodeId'});
    Order.belongsTo(Timeslot, {foreignKey: 'timeslotId'});
    Order.belongsTo(User, {foreignKey: 'userId'});
    Order.belongsTo(Van, {foreignKey: 'vanId'});

  return Order;
}

Order.addHook('beforeCreate', async (order, _options) => {
  const { amount, discount, surcharge, promoDiscount } = order;
  order.paymentAmount = amount + surcharge - discount - promoDiscount;
  if(order.paymentAmount < 0){
    order.paymentAmount = 0;
  }
});

module.exports = Order;
