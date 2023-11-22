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
const path = require('path');
//Swagger
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerSpec = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'DevJobs API Documentation',
      description: 'This is job portal page for developers to apply to vacancies.',
      contact: {
        name: 'API Support',
        email: 'equipo4@bedu.org',
      },
      license: {
        name: 'MIT',
        url: 'https://github.com/JuanMaLR/bedu-pf-fsd-backend-2023/blob/main/LICENSE',
      },
      version: '1.0.0',
    },
    servers: [{ url: process.env.SWAGGER_SERVER, description: 'Any server where the app deploys' }],
  },
  apis: [`${path.join(__dirname, './routers/*.js')}`],
};

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

//Manejo de errores - Middlewares
app.use(validationError);
app.use(unknownError);
app.use('/api', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));

//TODO: Change all logic to service layer
app.listen(process.env.SERVER_PORT, function () {
  console.log('Escuchando puerto ' + process.env.SERVER_PORT);
});
