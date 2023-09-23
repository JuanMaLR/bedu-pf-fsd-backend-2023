require("dotenv").config();

//DB configuration

const express = require("express");
const app = express();

app.use(express.json());

//Routes

//Include routes in app

app.listen(process.env.SERVER_PORT, function () {
	console.log("Escuchando puerto " + process.env.SERVER_PORT);
});
