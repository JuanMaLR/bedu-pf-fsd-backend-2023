const User = require('../models/user');
const { hash } = require('./security');
const { Op } = require('sequelize');
const { querysPreprocesor } = require('../hooks/queryHandler.js');
const { paginate } = require('../hooks/paginate.js');
const columnsUser = ['id', 'firstName', 'lastName', 'fullName', 'email', 'phoneNumber'];

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

exports.findAll = async function (querys) {
  try {
    const { columns, pagination } = querysPreprocesor(querys, columnsUser);
    const data = await paginate(User, pagination.page, pagination.perPage, {
      attributes: ['id', 'firstName', 'lastName', 'fullName', 'email', 'phoneNumber'],
      where: columns.map(({ field, value }) => ({
        [field]: {
          [Op.like]: `%${value}%`,
        },
      })),
    });
    return data;
  } catch (error) {
    return error;
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
  const { columns } = querysPreprocesor(querys, columnsUser);
  try {
    const totalItems = await User.count({
      where: columns.map(({ field, value }) => ({
        [field]: {
          [Op.like]: `%${value}%`,
        },
      })),
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
