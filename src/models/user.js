const { DataTypes } = require("sequelize");
const { sequelize } = require("./sequelize");

module.exports = sequelize.define("user", {
	firstName: {
        type: DataTypes.STRING(30),
        allowNull: false,
    }, 
    lastName: {
        type: DataTypes.STRING(30),
        allowNull: false,
    }, 
    email: {
		type: DataTypes.STRING(50),
		allowNull: false,
		unique: true,
	},
    password: {
		type: DataTypes.STRING(60),
		allowNull: false,
		validate: {
			len: [10, 60],
		},
	},
    phoneNumber: {
		type: DataTypes.STRING(10),
		allowNull: false,
		unique: true,
	},
}, { timestamps: true });
