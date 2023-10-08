const { findAll, findById, insert, update, deleteById } = require("../services/user");

exports.getUsers = async function (request, response) {
	const users = await findAll();
	response.status(201).json(users);
};

exports.getUser = async function (request, response) {
	const { id } = request.params;
	const users = await findById(id);
	response.status(201).json(users);
};

exports.createUser = async function (request, response) {
	const userData = request.body;
	const user = await insert(userData);
	response.status(201).json(user);
};

exports.updateUser = async function (request, response) {
    const { firstName, lastName, email, password, phoneNumber } = request.body;
	const { id } = request.params;

	await update(id, { firstName, lastName, email, password, phoneNumber });
	response.status(204).end();
}

exports.deleteUser = async function (request, response) {
	const { id } = request.params;
	await deleteById(id);
	response.status(204).end();
};