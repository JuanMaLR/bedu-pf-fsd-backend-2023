// Manejo de errores
module.exports = function (err, request, response, next) {
  // Si sucede la siguiente condición, entonces el error
  // fue provocado por express-joi-validation
  if (err && err.error && err.error.isJoi) {
    console.error(err);
    response.status(400).json({
      message: 'Los datos de entrada son inválidos',
      messagedev: 'El middleware de validación arrojó el siguiente error',
      code: 'ERR_VALIDATION',
      details: err.error.details,
    });
  } else {
    // Si no es un error de validación avanzo
    next(err);
  }
};
