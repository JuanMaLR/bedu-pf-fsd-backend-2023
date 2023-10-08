//To use env variables
require("dotenv").config();

//Imports
const userRouter = require('./src/routers/user');
const authRouter = require("./src/routers/auth");

//DB configuration
const { initDatabase } = require("./db");
initDatabase();

const express = require("express");
const app = express();

app.use(express.json());

//Routes
app.use(userRouter);
app.use(authRouter);

//Manejo de errores

app.listen(process.env.SERVER_PORT, function () {
	console.log("Escuchando puerto " + process.env.SERVER_PORT);
});
