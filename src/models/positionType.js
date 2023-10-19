const { DataTypes } = require("sequelize");
const { sequelize } = require("./sequelize");

module.exports = sequelize.define("positionType", {
    name: {
        type: DataTypes.ENUM('Tiempo completo', 'Medio tiempo', 'Prácticas', 'Servicio Social'),
        allowNull: false,
    }, 
});
