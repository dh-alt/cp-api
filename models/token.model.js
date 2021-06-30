const {Sequelize, sequelize, Op, DataTypes, Model} = require('../config/db');
const {User} = require('../models');

class Token extends Model {
  toString() {
    return JSON.stringify(this);
  }
}

Token.init({
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  token: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  type: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: true,
      isAlphanumeric: true,
    },
  },
  expires: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  blacklisted: {
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
  tableName: 'tokens', // explicit table name
  timestamps: true,
  sequelize, // We need to pass the connection instance
  modelName: 'Token', // We need to choose the model name
});

Token.associate = function(models) {
  Token.belongsTo(User);

  return Token;
};

module.exports = Token;
