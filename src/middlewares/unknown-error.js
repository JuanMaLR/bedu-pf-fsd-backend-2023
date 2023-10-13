const { handleResponse } = require('../responses');
const { ERR_UNKNOWN } = require('../hooks/codeStatus');
// eslint-disable-next-line no-unused-vars
module.exports = function (err, request, response, next) {
  const _response = new handleResponse().getByErrorType(ERR_UNKNOWN, { details: err });
  response.status(500).json(_response);
};
