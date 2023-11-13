module.exports = function (err, request, response, next) {
  if (err && err.error && err.error.isJoi) {
    response.status(400).json({
      http_status_code: 400,
      message: 'Los datos de entrada son inválidos',
      messagedev: 'El middleware de validación arrojó el siguiente error',
      status: 'ERR_VALIDATION',
      data: err.error.details,
    });
  } else {
    next(err);
  }
};
