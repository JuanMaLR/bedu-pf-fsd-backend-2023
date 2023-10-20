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

router.get('/employer', getEmployers); 
router.get('/employer/:id', validator.params(paramsSchema), getEmployer);
router.post('/employer', validator.body(createEmployerSchema), createEmployer);
router.put(
  '/employer/:id',
  validator.params(paramsSchema),
  validator.body(updateEmployerSchema),
  updateEmployer,
);
router.delete('/employer/:id', validator.params(paramsSchema), deleteEmployer);

module.exports = router;
