const express = require('express');
const router = express.Router();
const {
  getPosts,
  totalItems,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/post');
const { createPostSchema, updatePostSchema, paramsSchema } = require('../validations/post');
const validator = require('../middlewares/validator');
const jwtValidator = require('../middlewares/jwt');

// Schemas definition
// Get post
/**
 * @swagger
 * components:
 *  schemas:
 *    getPost:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: Post id
 *        positionName:
 *          type: string
 *          description: Job title or position name
 *        description:
 *          type: string
 *          description: Job description
 *        requirements:
 *          type: string
 *          description: List of requirements to apply to the vacancy
 *        responsabilities:
 *          type: string
 *          description: List of responsabilities for the job, if hired what would you be doing
 *        location:
 *          type: string
 *          description: Where is this oportunity for
 *        isActive:
 *          type: boolean
 *          description: Is this offer open or closed
 *      example:
 *        id: 5
 *        positionName: Full-Stack JavaScript developer
 *        description: Are you looking for a company where you can grow professionally ...
 *        requirements: - +3 years of JS/TS - +2 years of SQL - Testing experience is desirable ...
 *        responsabilities: As a FullStack developer you will ...
 *        isActive: true
 */

// Create post
/**
 * @swagger
 * components:
 *  schemas:
 *    createPost:
 *      type: object
 *      properties:
 *        positionName:
 *          type: string
 *          description: Job title or position name
 *        description:
 *          type: string
 *          description: Job description
 *        requirements:
 *          type: string
 *          description: List of requirements to apply to the vacancy
 *        responsabilities:
 *          type: string
 *          description: List of responsabilities for the job, if hired what would you be doing
 *        location:
 *          type: string
 *          description: Where is this oportunity for
 *        isActive:
 *          type: boolean
 *          description: Is this offer open or closed
 *      required:
 *        - positionName
 *        - description
 *        - requirements
 *        - responsabilities
 *        - location
 *        - isActive
 *      example:
 *        positionName: Full-Stack JavaScript developer
 *        description: Are you looking for a company where you can grow professionally ...
 *        requirements: - +3 years of JS/TS - +2 years of SQL - Testing experience is desirable ...
 *        responsabilities: As a FullStack developer you will ...
 *        isActive: true
 */

// Delete post
/**
 * @swagger
 * components:
 *  schemas:
 *    successPostOperation:
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
 *          description: Id of the post user
 *      example:
 *        status: Post deleted
 *        http_status_code: 201
 *        text: Post with id 5 eliminated
 *        data: 5
 */

/**
 * @swagger
 * /post:
 *  get:
 *    summary: Returns all posts
 *    tags: [Post]
 *    responses:
 *      200:
 *        description: All posts obtained
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/getPost'
 */
router.get('/post', getPosts);

/**
 * @swagger
 * /post/total-items:
 *  get:
 *    summary: Returns total amount of posts in db
 *    tags: [Post]
 *    responses:
 *      200:
 *        description: Total number of posts in db obtained
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/successPostOperation'
 */
router.get('/post/total-items', totalItems);

/**
 * @swagger
 * /post/{id}:
 *  get:
 *    summary: Return a post
 *    tags: [Post]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The post id
 *    responses:
 *      200:
 *        description: A post obtained
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/getPost'
 *      400:
 *        description: Post not found
 */
router.get('/post/:id', validator.params(paramsSchema), getPost);

/**
 * @swagger
 * /post:
 *  post:
 *    summary: Creates a new post
 *    tags: [Post]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/createPost'
 *    responses:
 *      201:
 *        description: New post created
 */
router.post('/post', jwtValidator, validator.body(createPostSchema), createPost);

/**
 * @swagger
 * /post/{id}:
 *  put:
 *    summary: Updates a post
 *    tags: [Post]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The post id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/createPost'
 *    responses:
 *      201:
 *        description: A post obtained
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/getPost'
 *      400:
 *        description: Post not found
 */
router.put(
  '/post/:id',
  jwtValidator,
  validator.params(paramsSchema),
  validator.body(updatePostSchema),
  updatePost,
);

/**
 * @swagger
 * /post/{id}:
 *  delete:
 *    summary: Deletes a post
 *    tags: [Post]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The post id
 *    responses:
 *      201:
 *        description: Deletion confirmation
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/successPostOperation'
 *      400:
 *        description: Post couldn't be deleted
 */
router.delete('/post/:id', validator.params(paramsSchema), jwtValidator, deletePost);

module.exports = router;
