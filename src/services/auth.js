const { findByEmail } = require('./user');
const { compare, sign } = require('./security');
const AuthException = require('../exceptions/auth');

exports.authenticate = async function (credentials) {
  const { email, password } = credentials;

  const user = await findByEmail(email);

  if (!user) {
    throw new AuthException();
  }

  const isSame = await compare(password, user.password);

  if (!isSame) {
    throw new AuthException();
  }

  return sign(user);
};
