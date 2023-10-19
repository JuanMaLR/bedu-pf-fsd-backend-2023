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

router.get('/user', getUsers);
router.get('/user/total-items', totalItems);
router.get('/user/:id', validator.params(paramsSchema), getUser);
router.post('/user', validator.body(createUserSchema), createUser);
router.put(
  '/user/:id',
  validator.params(paramsSchema),
  validator.body(updateUserSchema),
  updateUser,
);
router.delete('/user/:id', validator.params(paramsSchema), deleteUser);

module.exports = router;
