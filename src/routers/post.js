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

router.get('/post', getPosts);
router.get('/post/total-items', totalItems);
router.get('/post/:id', validator.params(paramsSchema), getPost);
router.post('/post', jwtValidator, validator.body(createPostSchema), createPost);
router.put(
  '/post/:id',
  jwtValidator,
  validator.params(paramsSchema),
  validator.body(updatePostSchema),
  updatePost,
);
router.delete('/post/:id', validator.params(paramsSchema), jwtValidator, deletePost);

module.exports = router;
