const {roles} = require('../config/roles');
const {Sequelize, sequelize, Op, DataTypes, Model} = require('../config/db');
const bcrypt = require('bcrypt');

const {Car, Token} = require('../models');

class User extends Model {
  static isEmailTaken(email, userId = null) {
    return User.findOne({
      where: {
        email: email,
        id: {
          [Op.ne]: userId,
        },
      },
    });
  }

  toString() {
    return JSON.stringify(this);
  }

  toJSON() {
    let values = Object.assign({}, this.get());

    delete values.password;
    return values;
  }

  getFullname() {
    return [this.firstname, this.lastname].join(' ');
  }

  isPasswordMatch(password) {
    return bcrypt.compare(password, this.password);
  }

  async newPasswordHash(newPassword) {
    const newPasswordHash = await bcrypt.hash(newPassword, 8);
    return newPasswordHash;
  }
}

User.init({
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  paymentCustomerId: {
    type: DataTypes.STRING
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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    values: roles,
    defaultValue: 'user',
    allowNull: false,
  },
  isEmailVerified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  emailVerifiedAt: {
    type: DataTypes.DATE,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'active',
  },
}, {
  tableName: 'users', // explicit table name
  timestamps: true,
  sequelize, // We need to pass the connection instance
  modelName: 'User', // We need to choose the model name
});

User.addHook('beforeValidate', (user, _options) => {
  user.email = user.email.toLowerCase();
});

User.addHook('beforeCreate', async (user, _options) => {
  user.password = await bcrypt.hash(user.password, 8);
});

User.associate = function(models) {
  User.hasMany(Car, {foreignKey: 'userId'});
  User.hasMany(Token, {foreignKey: 'userId'});

  return User;
};

module.exports = User;
