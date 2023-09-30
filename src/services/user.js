const User = require("../models/user");

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
	const user = await Post.findByPk(id);
	await user.destroy();
};
