const { authenticate } = require('../services/auth');
const AuthException = require('../exceptions/auth');
const { ERR_AUTH } = require('../hooks/codeStatus');
const { handleResponse } = require('../responses');
const { findByEmail } = require('../services/user');

exports.login = async function (request, response) {
  const { email, password } = request.body;
  const _response = new handleResponse('succes', {}, 200, 'inicio de sesion exitoso');

  const { fullName } = await findByEmail(email);

  try {
    const token = await authenticate({ email, password });
    _response.data = { jwt: token, email, fullName };
    response.status(200).json(_response.get());
  } catch (e) {
    if (e instanceof AuthException) {
      return response.status(400).json(_response.getByErrorType(ERR_AUTH));
    }
    throw e;
  }
};
