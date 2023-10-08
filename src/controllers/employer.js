const { findAll, findById, insert, update, deleteById } = require("../services/employer");

exports.getEmployers = async function (request, response) {
	const employers = await findAll();
	response.status(201).json(employers);
};

exports.getEmployer = async function (request, response) {
	const { id } = request.params;
	const employers = await findById(id);
	response.status(201).json(employers);
};

exports.createEmployer = async function (request, response) {
	const employerData = request.body;
	const employer = await insert(employerData);
	response.status(201).json(employer);
};

exports.updateEmployer = async function (request, response) {
    const { name, email, password, decription, website, logo, location } = request.body;
	const { id } = request.params;

	await update(id, { name, email, password, decription, website, logo, location });
	response.status(204).end();
}

exports.deleteEmployer = async function (request, response) {
	const { id } = request.params;
	await deleteById(id);
	response.status(204).end();
};