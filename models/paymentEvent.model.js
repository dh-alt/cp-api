const {Sequelize, sequelize, Op, DataTypes, Model} = require('../config/db');
const {Van, Order} = require('../models');

class PaymentEvent extends Model {
  toString() {
    return JSON.stringify(this);
  }
}

PaymentEvent.init({
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  eventType: {
    type: DataTypes.STRING,
  },
  paymentIntentId: {
    type: DataTypes.STRING,
  },
  objectId: {
    type: DataTypes.STRING,
  },
  objectType: {
    type: DataTypes.STRING,
  },
  amount: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.STRING,
  },
  raw: {
    type: DataTypes.JSONB,
  },
}, {
  tableName: 'payment_events', // explicit table name
  timestamps: true,
  sequelize, // We need to pass the connection instance
  modelName: 'PaymentEvent', // We need to choose the model name
});

PaymentEvent.associate = (models) => {
  PaymentEvent.belongsTo(Van);
  PaymentEvent.hasMany(Order);

  return PaymentEvent;
};

module.exports = PaymentEvent;
