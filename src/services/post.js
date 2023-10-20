const Post = require('../models/post');
const { Op } = require('sequelize');
const { querysPreprocesor } = require('../hooks/queryHandler.js');
const { paginate } = require('../hooks/paginate.js');
const columnsPost = ['id', 'positionName', 'description', 'requirements', 'responsibilities', 'location', 'isActive'];

exports.findAll = async function (querys) {
  try {
    const { columns, pagination } = querysPreprocesor(querys, columnsPost);
    const data = await paginate(Post, pagination.page, pagination.perPage, {
      attributes: columnsPost,
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
    const post = await Post.findByPk(id);
    return post;
  } catch (error) {
    return error;
  }
};

exports.totalItems = async function (querys) {
  const { columns } = querysPreprocesor(querys, columnsPost);
  try {
    const totalItems = await Post.count({
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
    const { dataValues } = await Post.create(data);
    return dataValues;
  } catch (error) {
    console.log(error);
  }
};
exports.update = async function (id, data) {
  try {
    const modifiedId = await Post.update(data, {
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
  const modifiedId = await Post.destroy({
    where: {
      id: id,
    },
    force: true,
  });
  return modifiedId;
};
