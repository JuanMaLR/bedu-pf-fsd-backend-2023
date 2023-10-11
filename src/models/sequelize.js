const { Sequelize } = require('sequelize');

const { MYSQL_HOST, MYSQL_DATABASE, MYSQL_USERNAME, MYSQL_PASSWORD, FORCE_DB_UPDATE, MYSQL_PORT } =
  process.env;

const sequelize = new Sequelize({
        dialect: 'mysql',
        host: MYSQL_HOST,
        username: MYSQL_USERNAME,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE,
        port: MYSQL_PORT,
      });

exports.sequelize = sequelize;

exports.connect = async function () {
  try {
    await sequelize.authenticate();
    console.log('> Conectado a la base de datos');
  } catch (e) {
    console.error('> No se puede conectar a la base de datos');
    console.error(e);
  }
};

exports.sync = async function () {
  try {
    await sequelize.sync({ force: FORCE_DB_UPDATE === 'yes' });
    console.log('> Base de datos actualizada');
  } catch (e) {
    console.error('> no se puede actualizar la base de datos');
    console.error(e);
  }
};
