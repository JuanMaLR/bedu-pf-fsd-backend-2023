const User = require("../models/user");

exports.obtainUsers = function () {
	return User.findAll();
};

exports.obtainUserById = function (id) {
	return User.findByPk(id);
};

exports.insert = function (data) {
	return User.create(data);
};

exports.update = async function (id, data) {
	await User.update(data, {
		where: {
			id,
		},
	});
};

exports.deleteById = async function (id) {
	const user = await User.findByPk(id);
	await user.destroy();
};

exports.findByEmail = function (email) {
	return User.findOne({
		where: {
			email,
		},
	});
};
