const Employer = require("../models/employer");
const { hash } = require('./security');

exports.findAll = function () {
	return Employer.findAll();
};

exports.findById = function (id) {
	return Employer.findByPk(id);
};

exports.insert = async function (data) {
	data.password = await hash(data.password);
	const employer = await Employer.create(data);
	delete employer.dataValues.password;
	return employer;
};

exports.update = async function (id, data) {
	if(data.password){
		data.password = await hash(data.password);
	}
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

exports.findByEmail = function (email) {
	return Employer.findOne({
		where: {
			email,
		},
	});
};

exports.findByWebsite = function (website) {
	return Employer.findOne({
		where: {
			website,
		},
	});
};