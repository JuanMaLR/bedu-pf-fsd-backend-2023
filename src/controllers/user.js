const {
  findAll,
  findById,
  insert,
  update,
  deleteById,
  findByEmail,
  findByPhoneNumber,
} = require('../services/user');

exports.getUsers = async function (request, response) {
  const users = await findAll();
  response.status(200).json(users);
};

exports.getUser = async function (request, response) {
  const { id } = request.params;
  const users = await findById(id);
  response.status(200).json(users);
};

exports.createUser = async function (request, response) {
  const userData = request.body;
  const { email, phoneNumber } = userData;
  const userWithEmail = await findByEmail(email);
  //Check email is unique
  if (userWithEmail) {
    response.status(400).json({
		message: 'El email proporcionado ya se encuentra registrado',
		messagedev: 'Se encontro el usuario en la base de datos por email',
		code: 'ERR_EMAIL',
	  });;
  }
  //Check phone number is unique
  const userWithPhoneNumber = await findByPhoneNumber(phoneNumber);
  if (userWithPhoneNumber) {
    response.status(400).json({
		message: 'El número de teléfono ya se encuentra registrado',
		messagedev: 'Se encontro el usuario en la base de datos por número de teléfono',
		code: 'ERR_PHONE_NUMBER',
	  });;
  }

  const user = await insert(userData);
  response.status(201).json(user);
};

exports.updateUser = async function (request, response) {
  const { firstName, lastName, email, password, phoneNumber } = request.body;
  const { id } = request.params;
  const userWithEmail = await findByEmail(email);
  //Check email is unique
  if (userWithEmail) {
    response.status(400).json({
		message: 'El email proporcionado ya se encuentra registrado',
		messagedev: 'Se encontro el usuario en la base de datos por email',
		code: 'ERR_EMAIL',
	  });;
  }
  //Check phone number is unique
  const userWithPhoneNumber = await findByPhoneNumber(phoneNumber);
  if (userWithPhoneNumber) {
    response.status(400).json({
		message: 'El número de teléfono ya se encuentra registrado',
		messagedev: 'Se encontro el usuario en la base de datos por número de teléfono',
		code: 'ERR_PHONE_NUMBER',
	  });;
  }

  await update(id, { firstName, lastName, email, password, phoneNumber });
  response.status(204).end();
};

exports.deleteUser = async function (request, response) {
  const { id } = request.params;
  await deleteById(id);
  response.status(204).end();
};
