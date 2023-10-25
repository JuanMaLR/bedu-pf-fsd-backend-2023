const User = require('../models/user');
const { hash } = require('./security');
const { Op } = require('sequelize');
const { paginate } = require('../hooks/paginate.js');
const { Query } = require('../hooks/queryHandler.js');
const userQuery = new Query(['id', 'firstName', 'lastName', 'fullName', 'email', 'phoneNumber']);

exports.findByEmail = function (email) {
  return User.findOne({
    attributes: ['id', 'firstName', 'lastName', 'fullName', 'email', 'phoneNumber', 'password'],
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

exports.findAll = async function ({ page, perPage, ...querys }) {
  try {
    const likeOperation = userQuery.setQueryOperations(querys, Op.like);
    const data = await paginate(User, page, perPage, {
      attributes: ['id', 'firstName', 'lastName', 'fullName', 'email', 'phoneNumber'],
      where: likeOperation,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

exports.findById = async function (id) {
  try {
    const user = await User.findByPk(id);
    return user;
  } catch (error) {
    return error;
  }
};

exports.totalItems = async function (querys) {
  const likeOperation = userQuery.setQueryOperations(querys, Op.like);

  try {
    const totalItems = await User.count({
      where: likeOperation,
    });

    return totalItems;
  } catch (error) {
    return error;
  }
};

exports.insert = async function (data) {
  try {
    data.password = await hash(data.password);
    const { dataValues } = await User.create(data);
    delete dataValues.password;
    return dataValues;
  } catch (error) {
    console.log(error);
  }
};
exports.update = async function (id, data) {
  try {
    if (data.password) {
      data.password = await hash(data.password);
    }

    const modifiedId = await User.update(data, {
      where: {
        id,
      },
    });
    return modifiedId[0];
  } catch (error) {
    return error;
  }
};

exports.deleteById = async function (id) {
  const modifiedId = await User.destroy({
    where: {
      id: id,
    },
    force: true,
  });
  return modifiedId;
};
