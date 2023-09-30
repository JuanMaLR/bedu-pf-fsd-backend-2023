const { create, update, deleteById } = require("../services/user");

exports.createUser = async function (request, response) {
	const userData = request.body;
	const user = await create(userData);
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