const {Sequelize, sequelize, Op, DataTypes, Model} = require('../config/db');
const {Van, Order} = require('../models');

class Timeslot extends Model {
  toString() {
    return JSON.stringify(this);
  }
}

Timeslot.init({
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  location: {
    type: DataTypes.GEOMETRY('POINT'),
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: true,
    },
  },
  sold: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 20,
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
    allowNull: false,
  },
  endTime: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  vanId: {
    type: DataTypes.BIGINT,
    references: {
      model: Van,
      key: 'id',
    },
  },
}, {
  tableName: 'timeslots', // explicit table name
  timestamps: true,
  sequelize, // We need to pass the connection instance
  modelName: 'Timeslot', // We need to choose the model name
});

Timeslot.associate = (models) => {
  Timeslot.belongsTo(Van);
  Timeslot.hasMany(Order);

  return Timeslot;
};

module.exports = Timeslot;
