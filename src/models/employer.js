const { DataTypes } = require("sequelize");
const { sequelize } = require("./sequelize");

module.exports = sequelize.define("employer", {
	name: {
        type: DataTypes.STRING(50),
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
    description: {
		type: DataTypes.TEXT,
		allowNull: false,
		validate: {
			len: [5, 2500],
		},
	},
    website: {
		type: DataTypes.STRING(50),
		allowNull: false,
        unique: true,
	},
    logo: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    location: {
		type: DataTypes.STRING(150),
		allowNull: false,
	},
}, { timestamps: true });
