const { findByEmail } = require('../services/user');
const jwt = require('jsonwebtoken');

exports.login = async function (request, response) {
  const { email, password } = request.body;

  const user = await findByEmail(email);

  if (!user) {
    return response.status(400).json({
      message: 'Email o contraseña inválidos',
      messagedev: 'No se encontro el usuario en la base de datos',
      code: 'ERR_AUTH',
    });
  }

  if (user.password !== password) {
    return response.status(400).json({
      message: 'Email o contraseña inválidos',
      messagedev: 'No se encontro el usuario en la base de datos',
      code: 'ERR_AUTH',
    });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);

  response.status(200).json({
    jwt: token,
  });
};
