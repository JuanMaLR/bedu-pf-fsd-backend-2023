const { authenticate } = require('../services/auth');
const AuthException = require('../exceptions/auth');

exports.login = async function (request, response) {
  const { email, password } = request.body;

  try {
    const token = await authenticate({email, password});
    response.status(200).json({
      jwt: token,
    });
  } catch(e) {
    if(e instanceof AuthException){
      return response.status(400).json({
        message: 'Email o contraseña inválidos',
        messagedev: 'No se encontro el usuario en la base de datos',
        code: 'ERR_AUTH',
      });
    }
    throw e;
  }
};
