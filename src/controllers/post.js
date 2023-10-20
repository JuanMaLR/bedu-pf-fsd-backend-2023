const { ERR_RESOURCE_NOT_FOUND } = require('../hooks/codeStatus');
const { findAll, insert, findById, update, deleteById, totalItems } = require('../services/post');
const { handleResponse } = require('../responses');

exports.getPosts = async function (request, response) {
  const { data, pagination } = await findAll(request.query);
  const _response = new handleResponse(
    'Listado de publicaciones',
    data,
    200,
    'Posts records',
    pagination,
  );
  response.status(200).json(_response.get());
  return;
};

exports.getPost = async function (request, response) {
  const { id } = request.params;
  const post = await findById(id);

  let _response = new handleResponse();
  if (post) {
    _response.setProperties(`Publicación ${id}`, post.dataValues, 200, 'Post record');
  } else {
    response.status(400).json(_response.getByErrorType(ERR_RESOURCE_NOT_FOUND, { data: { id } }));
    return;
  }
  response.status(200).json(_response.get());
  return;
};

exports.createPost = async function (request, response) {
  const postData = request.body;
  const _response = new handleResponse('Publicación creada exitosamente', {}, 201, 'Created post');

  const dataValues = await insert(postData);

  _response.data = { ...dataValues };

  response.status(201).json(_response.get());
  return;
};

exports.updatePost = async function (request, response) {
  const { id } = request.params;
  const { body } = request;
  const _response = new handleResponse(
    'Publicación actualizada',
    {},
    201,
    `Publicación con el id: ${id} actualizado`,
  );

  const isSuccess = await update(id, { ...body });
  if (isSuccess) _response.data = { id, ...body };

  response
    .status(201)
    .json(
      isSuccess
        ? _response.get()
        : _response.getByErrorType(ERR_RESOURCE_NOT_FOUND, { data: { id } }),
    );
  return;
};

exports.totalItems = async function (request, response) {
  const _response = new handleResponse('Total de elementos', {}, 200, 'Total items');
  const totalOfPosts = await totalItems(request.query);
  _response.data.totalItems = totalOfPosts;
  response.status(200).json(_response.get());
  return;
};

exports.deletePost = async function (request, response) {
  const { id } = request.params;
  const isSuccess = await deleteById(id);
  const _response = new handleResponse(
    'Publicación eliminada',
    { id },
    201,
    `Publicación con el id: ${id} eliminada`,
  );

  response
    .status(200)
    .json(
      isSuccess
        ? _response.get()
        : _response.getByErrorType(ERR_RESOURCE_NOT_FOUND, { data: { id } }),
    );
  return;
};
