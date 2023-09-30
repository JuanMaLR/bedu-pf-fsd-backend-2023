//To use env variables
require("dotenv").config();

//DB configuration
const { initDatabase } = require("./db");
initDatabase();

const express = require("express");
const app = express();

app.use(express.json());

//Routes

//Include routes in app

//Manejo de errores

app.listen(process.env.SERVER_PORT, function () {
	console.log("Escuchando puerto " + process.env.SERVER_PORT);
});
