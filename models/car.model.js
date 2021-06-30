const {Sequelize, sequelize, Op, DataTypes, Model} = require('../config/db');
const {User} = require('../models');

class Car extends Model {
  toString() {
    return JSON.stringify(this);
  }
}

Car.init({
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  license: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: true,
      isAlphanumeric: true,
    },
  },
  make: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: true,
      isAlphanumeric: true,
    },
  },
  model: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: true,
      isAlphanumeric: true,
    },
  },
  year: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: true,
      isAlphanumeric: true,
    },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'primary',
  },
  userId: {
    type: DataTypes.BIGINT,
    references: {
      model: User,
      key: 'id',
    },
  },
}, {
  tableName: 'cars', // explicit table name
  timestamps: true,
  sequelize, // We need to pass the connection instance
  modelName: 'Car', // We need to choose the model name
});

Car.associate = function(models) {
  Car.belongsTo(User);

  return Car;
};
module.exports = Car;
