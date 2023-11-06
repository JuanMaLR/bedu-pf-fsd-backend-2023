//To use env variables
require('dotenv').config();

//Imports
const { CORS_ORIGIN } = process.env;
const userRouter = require('./routers/user');
const authRouter = require('./routers/auth');
const employerRouter = require('./routers/employer');
const postRouter = require('./routers/post');
const validationError = require('./middlewares/validation-error');
const unknownError = require('./middlewares/unknown-error');

//DB configuration
const { initDatabase } = require('./db');
initDatabase();

const cors = require('cors');
const express = require('express');
const app = express();

app.use(express.json());
app.use(cors());

const corsOptions = {
  origin: CORS_ORIGIN,
};
app.options('*', cors(corsOptions));

//Routes
app.use(userRouter);
app.use(authRouter);
app.use(employerRouter);
app.use(postRouter);

//Manejo de errores
app.use(validationError);
app.use(unknownError);
//TODO: Change all logic to service layer
app.listen(process.env.SERVER_PORT, function () {
  console.log('Escuchando puerto ' + process.env.SERVER_PORT);
});
