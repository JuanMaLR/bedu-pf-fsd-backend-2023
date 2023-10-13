module.exports = function (err, request, response, next) {
  if (err && err.error && err.error.isJoi) {
    response.status(400).json({
      status: 'Bad request',
      http_status_code: 400,
      message: 'Los datos de entrada son inválidos',
      messagedev: 'El middleware de validación arrojó el siguiente error',
      text: 'ERR_VALIDATION',
      data: err.error.details,
    });
  } else {
    next(err);
  }
};
