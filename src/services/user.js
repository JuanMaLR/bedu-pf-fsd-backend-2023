const User = require('../models/user');
const { hash } = require('./security');

exports.findAll = function () {
  return User.findAll();
};

exports.findById = function (id) {
  return User.findByPk(id);
};

exports.findByEmail = function (email) {
  return User.findOne({
    where: {
      email,
    },
  });
};

exports.findByPhoneNumber = function (phoneNumber) {
  return User.findOne({
    where: {
      phoneNumber,
    },
  });
};

exports.insert = async function (data) {
  data.password = await hash(data.password);
  const user = await User.create(data);
  delete user.dataValues.password;
  return user;
};

exports.update = async function (id, data) {
  if (data.password) {
    data.password = await hash(data.password);
  }
  await User.update(data, {
    where: {
      id,
    },
  });
};

exports.deleteById = async function (id) {
  await User.destroy({
    where: {
      id: id,
    },
    force: true,
  });
};
