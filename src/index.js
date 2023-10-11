//To use env variables
require("dotenv").config();

//Imports
const userRouter = require('./routers/user');
const authRouter = require("./routers/auth");
const validationError = require("./middlewares/validation-error");
const unknownError = require("./middlewares/unknown-error");
const employerRouter = require('./routers/employer');

//DB configuration
const { initDatabase } = require("./db");
initDatabase();

const express = require("express");
const app = express();

app.use(express.json());

//Routes
app.use(userRouter);
app.use(authRouter);
app.use(employerRouter);

//Manejo de errores
app.use(validationError);
app.use(unknownError);

app.listen(process.env.SERVER_PORT, function () {
	console.log("Escuchando puerto " + process.env.SERVER_PORT);
});
