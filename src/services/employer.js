const Employer = require("../models/employer");

exports.findAll = function () {
	return Employer.findAll();
};

exports.findById = function (id) {
	return Employer.findByPk(id);
};

exports.insert = function (data) {
	return Employer.create(data);
};

exports.update = async function (id, data) {
	await Employer.update(data, {
		where: {
			id,
		},
	});
};

exports.deleteById = async function (id) {
	const user = await Employer.findByPk(id);
	await user.destroy();
};
