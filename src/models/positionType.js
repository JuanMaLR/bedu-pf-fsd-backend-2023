const { DataTypes } = require("sequelize");
const { sequelize } = require("./sequelize");

module.exports = sequelize.define("positionType", {
    name: {
        type: DataTypes.ENUM('Full time', 'Part time', 'Intern', 'Unpaid'),
        allowNull: false,
    }, 
});
