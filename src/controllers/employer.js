const {
  findAll,
  findById,
  insert,
  update,
  deleteById,
  findByEmail,
  findByWebsite,
} = require('../services/employer');

exports.getEmployers = async function (request, response) {
  const employers = await findAll();
  response.status(200).json(employers);
};

exports.getEmployer = async function (request, response) {
  const { id } = request.params;
  const employers = await findById(id);
  response.status(200).json(employers);
};

exports.createEmployer = async function (request, response) {
  const employerData = request.body;
  const { email, website } = employerData;
  const employerWithEmail = await findByEmail(email);
  //Check email is unique
  if (employerWithEmail) {
    response.status(400).json({
      message: 'El email proporcionado ya se encuentra registrado',
      messagedev: 'Se encontro el empleador en la base de datos por email',
      code: 'ERR_EMAIL',
    });
  }
  //Check website is unique
  const employerWithWebsite = await findByWebsite(website);
  if (employerWithWebsite) {
    response.status(400).json({
      message: 'El número de teléfono ya se encuentra registrado',
      messagedev: 'Se encontro el empleador en la base de datos por website',
      code: 'ERR_WEBSITE',
    });
  }

  const employer = await insert(employerData);
  response.status(201).json(employer);
};

exports.updateEmployer = async function (request, response) {
  const { name, email, password, decription, website, logo, location } = request.body;
  const { id } = request.params;

  const employerWithEmail = await findByEmail(email);
  //Check email is unique
  if (employerWithEmail) {
    response.status(400).json({
      message: 'El email proporcionado ya se encuentra registrado',
      messagedev: 'Se encontro el empleador en la base de datos por email',
      code: 'ERR_EMAIL',
    });
  }
  //Check website is unique
  const employerWithWebsite = await findByWebsite(website);
  if (employerWithWebsite) {
    response.status(400).json({
      message: 'El número de teléfono ya se encuentra registrado',
      messagedev: 'Se encontro el empleador en la base de datos por website',
      code: 'ERR_WEBSITE',
    });
  }

  await update(id, { name, email, password, decription, website, logo, location });
  response.status(204).end();
};

exports.deleteEmployer = async function (request, response) {
  const { id } = request.params;
  await deleteById(id);
  response.status(204).end();
};
