const roles = ['user', 'driver', 'admin'];

const roleRights = new Map();

const userRights = [];

const driverRights = [];

const adminRights = ['getUsers', 'manageUsers'];

roleRights.set(roles[0], userRights);
roleRights.set(roles[1], driverRights);
roleRights.set(roles[2], adminRights);

module.exports = {
  roles,
  roleRights,
};
