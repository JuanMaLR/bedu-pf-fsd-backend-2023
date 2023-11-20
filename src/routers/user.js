const express = require('express');
const router = express.Router();
const {
  getUsers,
  totalItems,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user');
const { createUserSchema, updateUserSchema, paramsSchema } = require('../validations/user');
const validator = require('../middlewares/validator');

// Schemas definition
// Get user
/**
 * @swagger
 * components:
 *  schemas:
 *    getUser:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: User id
 *        firstName:
 *          type: string
 *          description: Given and middle names of the user
 *        lastName:
 *          type: string
 *          description: Last names of the user
 *        fullName:
 *          type: string
 *          description: Full name of the user
 *        email:
 *          type: string
 *          description: Email of the user
 *        phoneNumber:
 *          type: string
 *          description: Phone number of the user
 *      example:
 *        firstName: Pepito
 *        lastName: López
 *        fullName: Pepito López
 *        email: pepitoL@hotmail.com
 *        phoneNumber: 4596453125
 */

// Create user
/**
 * @swagger
 * components:
 *  schemas:
 *    createUser:
 *      type: object
 *      properties:
 *        firstName:
 *          type: string
 *          description: Given and middle names of the user
 *        lastName:
 *          type: string
 *          description: Last names of the user
 *        email:
 *          type: string
 *          description: Email of the user
 *        password:
 *          type: string
 *          description: Password of the user
 *        phoneNumber:
 *          type: string
 *          description: Phone number of the user
 *      required:
 *        - firstName
 *        - lastName
 *        - email
 *        - password
 *        - phoneNumber
 *      example:
 *        firstName: Pepito
 *        lastName: López
 *        email: pepitoL@hotmail.com
 *        password: Muy*segur4
 *        phoneNumber: 4596453125
 */

// Delete user
/**
 * @swagger
 * components:
 *  schemas:
 *    successUserOperation:
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
 *          description: Id of the deleted user
 *      example:
 *        status: Usuario eliminado
 *        http_status_code: 201
 *        text: Usuario con el id 5 eliminado
 *        data: 5
 */

/**
 * @swagger
 * /user:
 *  get:
 *    summary: Returns all users
 *    tags: [User]
 *    responses:
 *      200:
 *        description: All users obtained
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/getUser'
 */
router.get('/user', getUsers);

/**
 * @swagger
 * /user/total-items:
 *  get:
 *    summary: Returns total amount of users in db 
 *    tags: [User]
 *    responses:
 *      200:
 *        description: Total number of users in db obtained
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/successUserOperation'
 */
router.get('/user/total-items', totalItems);

/**
 * @swagger
 * /user/{id}:
 *  get:
 *    summary: Return an user
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    responses:
 *      200:
 *        description: An user obtained
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/getUser'
 *      400:
 *        description: User not found
 */
router.get('/user/:id', validator.params(paramsSchema), getUser);

/**
 * @swagger
 * /user:
 *  post:
 *    summary: Creates a new user
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/createUser'
 *    responses:
 *      201:
 *        description: New user created
 */
router.post('/user', validator.body(createUserSchema), createUser);

/**
 * @swagger
 * /user/{id}:
 *  put:
 *    summary: Updates an user
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/createUser'
 *    responses:
 *      201:
 *        description: An user obtained
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/getUser'
 *      400:
 *        description: User not found
 */
router.put(
  '/user/:id',
  validator.params(paramsSchema),
  validator.body(updateUserSchema),
  updateUser,
);

/**
 * @swagger
 * /user/{id}:
 *  delete:
 *    summary: Deletes an user
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    responses:
 *      201:
 *        description: Deletion confirmation
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/successUserOperation'
 *      400:
 *        description: User couldn't be deleted
 */
router.delete('/user/:id', validator.params(paramsSchema), deleteUser);

module.exports = router;
