const {roles} = require('../config/roles');
const {Sequelize, sequelize, Op, DataTypes, Model} = require('../config/db');

const {Order} = require('../models');

class PromoCode extends Model {
  static isCodeTaken(code, promoCodeId = null) {
    return PromoCode.findOne({
      where: {
        code: code,
        id: {
          [Op.ne]: promoCodeId,
        },
      },
    });
  }

  toString() {
    return JSON.stringify(this);
  }
}

PromoCode.init({
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  discountAmount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  used: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expires: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  invalid: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  tableName: 'promo_codes', // explicit table name
  timestamps: true,
  sequelize, // We need to pass the connection instance
  modelName: 'PromoCode', // We need to choose the model name
});

PromoCode.addHook('beforeValidate', (promoCode, _options) => {
  promoCode.email = promoCode.code.toUpperCase();
});

PromoCode.associate = function(models) {
//  PromoCode.hasMany(Car, {foreignKey: 'promoCodeId'});

  return PromoCode;
};

module.exports = PromoCode;
