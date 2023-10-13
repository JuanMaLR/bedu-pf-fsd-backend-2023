const {
  ERR_EMAIL,
  ERR_PHONE_NUMBER,
  ERR_AUTH,
  ERR_UNKNOWN,
  ERR_RESOURCE_NOT_FOUND,
} = require('./hooks/codeStatus');

function handleResponse(
  status = 'success',
  data = [],
  http_status_code = 200,
  text = 'Example text',
  additional = {},
) {
  this.status = status;
  this.data = data;
  this.http_status_code = http_status_code;
  this.text = text;
  this.additional = additional;
}

handleResponse.prototype.get = function () {
  return {
    status: this.status,
    http_status_code: this.http_status_code,
    text: this.text,
    data: this.data,
    ...this.additional,
  };
};
handleResponse.prototype.setProperties = function (
  status = 'success',
  data = [],
  http_status_code = 200,
  text = 'Example text',
  additional = {},
) {
  this.status = status;
  this.data = data;
  this.http_status_code = http_status_code;
  this.text = text;
  this.additional = additional;
};
handleResponse.prototype.getByErrorType = function (codeStatusType, additional = {}) {
  this.http_status_code = 400;
  this.additional = { ...this.additional, ...additional };
  switch (codeStatusType) {
    case ERR_EMAIL:
      this.message = 'El email proporcionado ya se encuentra registrado';
      this.additional.messagedev = 'Se encontro el usuario en la base de datos por email';
      break;
    case ERR_PHONE_NUMBER:
      this.message = 'El número de teléfono ya se encuentra registrado';
      this.additional.messagedev =
        'Se encontro el usuario en la base de datos por número de teléfono';
      break;
    case ERR_AUTH:
      this.message = 'Email o contraseña inválidos';
      this.additional.messagedev = 'No se encontro el usuario en la base de datos';
      break;
    case ERR_UNKNOWN:
      this.message = 'Ocurrió un error inesperado';
      this.additional.messagedev = 'Hubo un error no manejado internamente en el código';
      break;
    case ERR_RESOURCE_NOT_FOUND:
      // Need additional data: {id: resourceID}
      this.additional.messagedev = `No se encontro un usuario con el id proporcionado`;
      this.message = `El usuario con el id: ${this.additional.data.id} no se encontro`;
      break;
  }
  return {
    status: codeStatusType.description,
    http_status_code: this.http_status_code,
    message: this.message,
    ...this.additional,
  };
};

exports.handleResponse = handleResponse;
