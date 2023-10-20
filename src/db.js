const { connect, sync } = require("./models/sequelize");
//Importar modelos
const User = require('./models/user');
const Post = require('./models/post');
const Employer = require('./models/employer');
const PositionType = require('./models/positionType');
const { JOB_TYPES } = require("./constants");

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

/*
  Insertar registros iniciales
  al ejecutar el proyecto.
*/
async function seed() {
	// eslint-disable-next-line no-undef
	await Promise.allSettled([
		PositionType.create({ id: JOB_TYPES.FULL_TIME, name: "FULL_TIME" }),
		PositionType.create({ id: JOB_TYPES.PART_TIME, name: "PART_TIME" }),
		PositionType.create({ id: JOB_TYPES.INTERN, name: "INTERN" }),
		PositionType.create({ id: JOB_TYPES.UNPAID, name: "UNPAID" })
	]);
}

exports.initDatabase = async function () {
	await connect();
	await sync();
	await seed();
};
