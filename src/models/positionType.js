const { DataTypes } = require("sequelize");
const { sequelize } = require("./sequelize");

module.exports = sequelize.define("positionType", {
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    }, 
});
