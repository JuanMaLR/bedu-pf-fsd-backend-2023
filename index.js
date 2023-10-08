//To use env variables
require("dotenv").config();

//Imports
const userRouter = require('./src/routers/user');
const validationError = require("./src/middlewares/validation-error");
const unknownError = require("./src/middlewares/unknown-error");

//DB configuration
const { initDatabase } = require("./db");
initDatabase();

const express = require("express");
const app = express();

app.use(express.json());

//Routes
app.use(userRouter);

//Manejo de errores
app.use(validationError);
app.use(unknownError);

app.listen(process.env.SERVER_PORT, function () {
	console.log("Escuchando puerto " + process.env.SERVER_PORT);
});
