const {Sequelize, sequelize, Op, DataTypes, Model} = require('../config/db');

const {Timeslot} = require('../models');

class Van extends Model {
  toString() {
    return JSON.stringify(this);
  }
}

Van.init({
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isAlphanumeric: true,
    },
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
    defaultValue: 'available',
  },
}, {
  tableName: 'vans', // explicit table name
  timestamps: true,
  sequelize, // We need to pass the connection instance
  modelName: 'Van', // We need to choose the model name
});

Van.associate = function(models) {
  Van.hasMany(Timeslot, {foreignKey: 'vanId'});

  return Van;
};

module.exports = Van;
