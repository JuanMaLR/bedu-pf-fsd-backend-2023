const { connect, sync } = require("./models/sequelize");
//Importar modelos
const User = require('./models/user');
const Post = require('./models/post');
const Employer = require('./models/employer');
const PositionType = require('./models/positionType');

//Definir las relaciónes de los usuarios
// "Un usuario aplica a muchas vacantes"
// "Una vacante puede ser aplicada por varios usuarios"
User.belongsToMany(Post, { through: "AppliedVacancies" });
Post.belongsToMany(User, { through: "AppliedVacancies" });

// "Un tipo de posición (part time, full time, etc) puede ser utilizada por varias publicaciones"
PositionType.hasMany(Post);
Post.belongsTo(PositionType);

// "Un empleador puede publicar muchas vacantes"
// "Una vacante solo puede ser publicada por un empleador"
Employer.hasMany(Post);
Post.belongsTo(Employer);

exports.initDatabase = async function () {
	await connect();
	await sync();
};
