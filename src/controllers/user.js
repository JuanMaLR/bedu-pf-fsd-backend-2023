const { ERR_EMAIL, ERR_PHONE_NUMBER, ERR_RESOURCE_NOT_FOUND } = require('../hooks/codeStatus');
const {
  findAll,
  insert,
  findById,
  update,
  deleteById,
  findByEmail,
  totalItems,
  findByPhoneNumber,
} = require('../services/user');
const { handleResponse } = require('../responses');

exports.getUsers = async function (request, response) {
  const { data, pagination } = await findAll(request.query);
  const _response = new handleResponse(
    'Listado de clientes',
    data,
    200,
    'Users records',
    pagination,
  );
  response.status(200).json(_response.get());
  return;
};

exports.getUser = async function (request, response) {
  const { id } = request.params;
  const user = await findById(id);

  let _response = new handleResponse();
  if (user) {
    const dataValues = user.dataValues;
    delete dataValues.password;
    delete dataValues.createdAt;
    delete dataValues.updatedAt;
    _response.setProperties(`Usuario ${id}`, dataValues, 200, 'User record');
  } else {
    response.status(400).json(_response.getByErrorType(ERR_RESOURCE_NOT_FOUND, { data: { id } }));
    return;
  }
  response.status(200).json(_response.get());
  return;
};

exports.createUser = async function (request, response) {
  const userData = request.body;
  const { email, phoneNumber } = userData;
  const _response = new handleResponse('Usuario creado exitosamente', {}, 201, 'Created user');

  const userWithEmail = email ? await findByEmail(email) : false;
  const userWithPhoneNumber = phoneNumber ? await findByPhoneNumber(phoneNumber) : false;

  if (userWithEmail || userWithPhoneNumber) {
    response
      .status(400)
      .json(_response.getByErrorType(userWithEmail ? ERR_EMAIL : ERR_PHONE_NUMBER));
    return;
  } else {
    const dataValues = await insert(userData);

    delete dataValues.password;
    delete dataValues.createdAt;
    delete dataValues.updatedAt;

    _response.data = { ...dataValues };

    response.status(201).json(_response.get());
    return;
  }
};

exports.updateUser = async function (request, response) {
  const { id } = request.params;
  const { body } = request;
  const { email, phoneNumber } = request.body;
  const _response = new handleResponse(
    'Usuario actualizado',
    {},
    201,
    `Usuario con el id: ${id} actualizado`,
  );

  const userWithEmail = email ? await findByEmail(email) : false;
  const userWithPhoneNumber = phoneNumber ? await findByPhoneNumber(phoneNumber) : false;
  if (userWithEmail || userWithPhoneNumber) {
    response
      .status(400)
      .json(_response.getByErrorType(userWithEmail ? ERR_EMAIL : ERR_PHONE_NUMBER));
    return;
  }

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
  const totalOfUsers = await totalItems(request.query);
  _response.data.totalItems = totalOfUsers;
  response.status(200).json(_response.get());
  return;
};

exports.deleteUser = async function (request, response) {
  const { id } = request.params;
  const isSuccess = await deleteById(id);
  const _response = new handleResponse(
    'Usuario eliminado',
    { id },
    201,
    `Usuario con el id: ${id} eliminado`,
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
