const { connect, sync } = require("./src/models/sequelize");
//Importar modelos

//Definir las relaciónes de los usuarios
// "Un usuario crea muchas publicaciones"
//User.hasMany(Post);
//Post.belongsTo(User);

exports.initDatabase = async function () {
	await connect();
	await sync();
};
