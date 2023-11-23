const Post = require('../models/post');
const { Op } = require('sequelize');
const { paginate } = require('../hooks/paginate.js');
const { Query } = require('../hooks/queryHandler.js');
const columnsPost = [
  'id',
  'positionName',
  'description',
  'requirements',
  'responsibilities',
  'location',
  'isActive',
  'createdAt',
  'positionRoll',
  'companyName',
];
const userPost = new Query(columnsPost);

exports.findAll = async function ({ page, perPage, ...querys }) {
  try {
    const likeOperation = userPost.setQueryOperations(querys, Op.like);
    const data = await paginate(Post, page, perPage, {
      attributes: columnsPost,
      where: likeOperation,
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
  const likeOperation = userPost.setQueryOperations(querys, Op.like);
  try {
    const totalItems = await Post.count({
      where: likeOperation,
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
