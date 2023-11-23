const express = require('express');
const router = express.Router();
const {
  getEmployers,
  getEmployer,
  createEmployer,
  updateEmployer,
  deleteEmployer,
} = require('../controllers/employer');
const validator = require('../middlewares/validator');
const {
  createEmployerSchema,
  updateEmployerSchema,
  paramsSchema,
} = require('../validations/employer');

// Schemas definition
// Get employer
/**
 * @swagger
 * components:
 *  schemas:
 *    getEmployer:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: Employer id
 *        name:
 *          type: string
 *          description: Name of the employer
 *        email:
 *          type: string
 *          description: Email of the employer
 *        description:
 *          type: string
 *          description: Description of the employer
 *        website:
 *          type: string
 *          description: Website of the employer
 *        logo:
 *          type: string
 *          description: Logo of the employer
 *        location:
 *          type: string
 *          description: Location of the employer
 *      example:
 *        id: 2
 *        name: Google
 *        email: google@gmail.com
 *        description: Tech company ...
 *        website: www.google.com
 *        logo: https://www.google.com
 *        location: Silicon Valley
 */

// Create employer
/**
 * @swagger
 * components:
 *  schemas:
 *    createEmployer:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: Name of the employer
 *        email:
 *          type: string
 *          description: Email of the employer
 *        password:
 *          type: string
 *          description: Password of the employer
 *        description:
 *          type: string
 *          description: Description of the employer
 *        website:
 *          type: string
 *          description: Website of the employer
 *        logo:
 *          type: string
 *          description: Logo of the employer
 *        location:
 *          type: string
 *          description: Location of the employer
 *      required:
 *        - name
 *        - email
 *        - password
 *        - description
 *        - website
 *        - logo
 *        - location
 *      example:
 *        id: 2
 *        name: Google
 *        email: google@gmail.com
 *        password: Muy*s3guro
 *        description: Tech company ...
 *        website: www.google.com
 *        logo: https://www.google.com
 *        location: Silicon Valley
 */

// Delete employer
/**
 * @swagger
 * components:
 *  schemas:
 *    successEmployerOperation:
 *      type: object
 *      properties:
 *        status:
 *          type: string
 *          description: String operation identifier
 *        http_status_code:
 *          type: integer
 *          description: Status code of the operation
 *        text:
 *          type: string
 *          description: Operation details
 *        data:
 *          type: string
 *          description: Id of the deleted employer
 *      example:
 *        status: Employer deleted
 *        http_status_code: 201
 *        text: Employer with id 5 deleted
 *        data: 5
 */

/**
 * @swagger
 * /employer:
 *  get:
 *    summary: Returns all employers
 *    tags: [Employer]
 *    responses:
 *      200:
 *        description: All employers obtained
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/getEmployer'
 */
router.get('/employer', getEmployers); 

/**
 * @swagger
 * /employer/{id}:
 *  get:
 *    summary: Return an employer
 *    tags: [Employer]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The employer id
 *    responses:
 *      200:
 *        description: An employer obtained
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/getEmployer'
 *      400:
 *        description: Employer not found
 */
router.get('/employer/:id', validator.params(paramsSchema), getEmployer);

/**
 * @swagger
 * /employer:
 *  post:
 *    summary: Creates a new employer
 *    tags: [Employer]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/createEmployer'
 *    responses:
 *      201:
 *        description: New employer created
 */
router.post('/employer', validator.body(createEmployerSchema), createEmployer);

/**
 * @swagger
 * /employer/{id}:
 *  put:
 *    summary: Updates an employer
 *    tags: [Employer]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The employer id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/createEmployer'
 *    responses:
 *      201:
 *        description: An employer obtained
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/getEmployer'
 *      400:
 *        description: Employer not found
 */
router.put(
  '/employer/:id',
  validator.params(paramsSchema),
  validator.body(updateEmployerSchema),
  updateEmployer,
);

/**
 * @swagger
 * /employer/{id}:
 *  delete:
 *    summary: Deletes an employer
 *    tags: [Employer]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The employer id
 *    responses:
 *      201:
 *        description: Deletion confirmation
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/successEmployerOperation'
 *      400:
 *        description: Employer couldn't be deleted
 */
router.delete('/employer/:id', validator.params(paramsSchema), deleteEmployer);

module.exports = router;
